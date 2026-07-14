#!/usr/bin/env node
/* KURUKSHETRA V3.1 — URL health checker
   Usage: node tools/check-urls.js
   Good statuses: 200-399. Broken: 400+, ERR, timeout. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const http = require('http');
const https = require('https');

const root = path.resolve(__dirname, '..');

function loadBrowserData(relPath, globalName) {
  const filePath = path.join(root, relPath);
  const code = fs.readFileSync(filePath, 'utf8');
  const sandbox = { window: {} };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: relPath });
  return sandbox.window[globalName] || sandbox[globalName];
}

const bestVideos = loadBrowserData('js/data/best-videos.js', 'BEST_VIDEOS');
const bestResources = loadBrowserData('js/data/best-resources.js', 'BEST_RESOURCES');
const urls = new Set();

Object.values(bestVideos || {}).forEach(subject => {
  Object.values(subject || {}).forEach(video => {
    if (video?.videoId) {
      urls.add(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${video.videoId}&format=json`);
    }
  });
});

Object.values(bestResources || {}).forEach(subject => {
  Object.values(subject || {}).forEach(resources => {
    (resources || []).forEach(resource => {
      if (resource?.url) urls.add(resource.url);
    });
  });
});

function checkUrl(url) {
  return new Promise(resolve => {
    const isYoutubeOembed = url.includes('youtube.com/oembed');
    const lib = url.startsWith('http://') ? http : https;
    const req = lib.request(url, {
      method: isYoutubeOembed ? 'GET' : 'HEAD',
      timeout: 12000,
      headers: {
        'user-agent': 'Kurukshetra-LinkChecker/1.0 (+https://github.com/Exam-Mitra/kurukshetra)',
        'accept': '*/*'
      }
    }, res => {
      // Some sites reject HEAD. Retry as GET once.
      if (!isYoutubeOembed && [403, 405, 501].includes(res.statusCode)) {
        res.resume();
        return resolve(checkUrlGet(url));
      }
      res.resume();
      resolve({ url, code: res.statusCode });
    });
    req.on('timeout', () => {
      req.destroy(new Error('timeout'));
    });
    req.on('error', error => {
      resolve({ url, code: error.message === 'timeout' ? 'TIMEOUT' : 'ERR', error: error.message });
    });
    req.end();
  });
}

function checkUrlGet(url) {
  return new Promise(resolve => {
    const lib = url.startsWith('http://') ? http : https;
    const req = lib.request(url, {
      method: 'GET',
      timeout: 12000,
      headers: {
        'user-agent': 'Kurukshetra-LinkChecker/1.0 (+https://github.com/Exam-Mitra/kurukshetra)',
        'accept': 'text/html,application/json,*/*'
      }
    }, res => {
      res.resume();
      resolve({ url, code: res.statusCode });
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', error => resolve({ url, code: error.message === 'timeout' ? 'TIMEOUT' : 'ERR', error: error.message }));
    req.end();
  });
}

async function main() {
  const all = [...urls];
  const results = [];
  const concurrency = 8;
  let next = 0;
  async function worker() {
    while (next < all.length) {
      const url = all[next++];
      const result = await checkUrl(url);
      results.push(result);
      const ok = typeof result.code === 'number' && result.code >= 200 && result.code < 400;
      console.log(`${ok ? 'GOOD' : 'BAD '} ${result.code} ${url}`);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  results.sort((a, b) => String(a.url).localeCompare(String(b.url)));
  const broken = results.filter(r => !(typeof r.code === 'number' && r.code >= 200 && r.code < 400));
  console.log(`\nChecked ${results.length} URLs. ${broken.length} broken:`);
  broken.forEach(r => console.log(`${r.code} ${r.url}${r.error ? ` (${r.error})` : ''}`));
  process.exit(broken.length > 0 ? 1 : 0);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
