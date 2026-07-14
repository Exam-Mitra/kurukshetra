"""
Generate PWA icons (192x192 + 512x512) from the brand SVG.
Run: python3 tools/generate-icons.py
Requires: pip install Pillow
"""
from PIL import Image, ImageDraw, ImageFont
import os

def make_icon(size, output_path, maskable=False):
    img = Image.new('RGB', (size, size), (10, 10, 26))  # --bg-base dark
    draw = ImageDraw.Draw(img)
    # Gradient background (simulated with 2 stops)
    for y in range(size):
        # Linear gradient from #6366f1 to #a855f7
        t = y / size
        r = int(99 + (168 - 99) * t)
        g = int(102 + (85 - 102) * t)
        b = int(241 + (247 - 241) * t)
        draw.line([(0, y), (size, y)], fill=(r, g, b))

    # Inner safe area for maskable icons
    if maskable:
        # Add a colored circle/square in the safe zone (inner 80%)
        margin = int(size * 0.1)
        inner = Image.new('RGB', (size - 2*margin, size - 2*margin), (99, 102, 241))
        img.paste(inner, (margin, margin))

    # Draw "K" letter centered
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", int(size * 0.55))
    except Exception:
        font = ImageFont.load_default()
    text = "K"
    bbox = draw.textbbox((0, 0), text, font=font)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((size - w) / 2 - bbox[0], (size - h) / 2 - bbox[1] - size*0.05), text, fill=(255, 255, 255), font=font)
    img.save(output_path, 'PNG', optimize=True)
    print(f"Created {output_path} ({size}x{size})")

os.makedirs('assets/icons', exist_ok=True)
make_icon(192, 'assets/icons/icon-192.png', maskable=False)
make_icon(512, 'assets/icons/icon-512.png', maskable=False)
make_icon(192, 'assets/icons/icon-192-maskable.png', maskable=True)
make_icon(512, 'assets/icons/icon-512-maskable.png', maskable=True)

# Favicon
make_icon(32, 'assets/icons/favicon-32.png')
make_icon(16, 'assets/icons/favicon-16.png')

# Apple touch
make_icon(180, 'assets/icons/apple-touch-icon.png')
print("All icons generated!")
