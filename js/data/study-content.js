/* ============================================
   KURUKSHETRA V3 — Study Content (40 chapters)
   ============================================ */

const STUDY_CONTENT = {
  "physics": {
    "p1": {
      "name": "Units & Measurements",
      "central": "Units & Measurements",
      "notesHtml": "<h1>Physical Quantities and Units</h1>\n<p>A physical quantity is a property that can be quantified by measurement — a <b>numerical value</b> and a <b>unit</b>.</p>\n<h2>The International System of Units (SI)</h2>\n<p>SI has <b>7 base quantities</b>:</p>\n<table>\n<tr><th>Quantity</th><th>Symbol</th><th>SI Unit</th><th>Symbol</th></tr>\n<tr><td>Length</td><td>l</td><td>metre</td><td>m</td></tr>\n<tr><td>Mass</td><td>m</td><td>kilogram</td><td>kg</td></tr>\n<tr><td>Time</td><td>t</td><td>second</td><td>s</td></tr>\n<tr><td>Electric Current</td><td>I</td><td>ampere</td><td>A</td></tr>\n<tr><td>Temperature</td><td>T</td><td>kelvin</td><td>K</td></tr>\n<tr><td>Amount of Substance</td><td>n</td><td>mole</td><td>mol</td></tr>\n<tr><td>Luminous Intensity</td><td>Iv</td><td>candela</td><td>cd</td></tr>\n</table>\n<h2>Dimensional Analysis</h2>\n<div class=\"formula\">[Force] = [M L T^-2]</div>\n<div class=\"formula\">[Energy] = [M L^2 T^-2]</div>\n<div class=\"formula\">[Power] = [M L^2 T^-3]</div>\n<div class=\"formula\">[Pressure] = [M L^-1 T^-2]</div>\n<div class=\"formula\">[Planck h] = [M L^2 T^-1]</div>\n<div class=\"formula\">[G] = [M^-1 L^3 T^-2]</div>\n<div class=\"formula\">[eta viscosity] = [M L^-1 T^-1]</div>\n<h3>Principle of Homogeneity</h3>\n<p>Every term in a physical equation must have the same dimensions.</p>\n<div class=\"example\"><div class=\"example-title\">v = u + at</div>[LHS]=[LT^-1]; [at]=[LT^-2][T]=[LT^-1] OK</div>\n<h2>Significant Figures</h2>\n<ol><li>All non-zero digits significant</li><li>Zeros between non-zero digits significant</li><li>Leading zeros NOT significant</li><li>Trailing zeros after decimal ARE significant</li><li>Trailing zeros before decimal ambiguous</li></ol>\n<h2>Errors</h2>\n<ul><li><b>Systematic</b> — correctable</li><li><b>Random</b> — average out</li><li><b>Gross</b> — mistakes</li></ul>\n<div class=\"formula\">Z=A+/-B => dZ=dA+dB</div>\n<div class=\"formula\">Z=A*B => dZ/Z=dA/A+dB/B</div>\n<div class=\"formula\">Z=A^n => dZ/Z=n(dA/A)</div>\n<div class=\"note\"><b>JEE Tip:</b> Highest power dominates error (density rho=m/lbh).</div>\n<h2>Instruments</h2>\n<div class=\"formula\">Vernier LC = 1 MSD - 1 VSD</div>\n<div class=\"formula\">Screw gauge LC = pitch / n</div>",
      "cheatsheet": [
        {
          "name": "Force",
          "formula": "[M L T^-2]",
          "proof": "F=ma"
        },
        {
          "name": "Energy/Work/Torque",
          "formula": "[M L^2 T^-2]",
          "proof": "E=1/2 mv^2"
        },
        {
          "name": "Power",
          "formula": "[M L^2 T^-3]",
          "proof": "P=W/t"
        },
        {
          "name": "Pressure/Stress/Y",
          "formula": "[M L^-1 T^-2]",
          "proof": "P=F/A"
        },
        {
          "name": "Planck h / L",
          "formula": "[M L^2 T^-1]",
          "proof": "E=hv"
        },
        {
          "name": "G",
          "formula": "[M^-1 L^3 T^-2]",
          "proof": "F=Gm1m2/r^2"
        },
        {
          "name": "Viscosity eta",
          "formula": "[M L^-1 T^-1]",
          "proof": "F=eta A dv/dx"
        },
        {
          "name": "Surface tension",
          "formula": "[M T^-2]",
          "proof": "F/l"
        },
        {
          "name": "Vernier LC",
          "formula": "1 MSD-1 VSD",
          "proof": "10MSD=9VSD"
        },
        {
          "name": "Screw LC",
          "formula": "pitch/n",
          "proof": "n divisions"
        },
        {
          "name": "Error product",
          "formula": "dZ/Z=dA/A+dB/B",
          "proof": "rel add"
        },
        {
          "name": "Error power",
          "formula": "dZ/Z=n(dA/A)",
          "proof": "x n"
        },
        {
          "name": "Dimensionless",
          "formula": "angle, strain, RI",
          "proof": "no units"
        }
      ],
      "summary": [
        "SI has 7 base quantities: m, kg, s, A, K, mol, cd",
        "Force=[MLT^-2], Energy=[ML2T^-2], Power=[ML2T^-3]",
        "Planck h ~ angular momentum dims",
        "G=[M^-1 L^3 T^-2]",
        "Homogeneity: same dimensions every term",
        "Systematic vs random vs gross errors",
        "Product: relative errors add",
        "Power: multiply relative error by n",
        "Density error dominated by volume",
        "0.00230 has 3 sig figs",
        "Multiplication: least sig figs",
        "Addition: least decimal places",
        "Vernier LC=1MSD-1VSD",
        "Screw LC=pitch/n",
        "Dimensionless: angle, strain, RI"
      ],
      "mindmap": [
        {
          "id": "si",
          "label": "SI System",
          "children": [
            {
              "id": "b",
              "label": "7 Base"
            },
            {
              "id": "d",
              "label": "Derived"
            },
            {
              "id": "p",
              "label": "Prefixes"
            }
          ]
        },
        {
          "id": "dimensions",
          "label": "Dimensional Analysis",
          "children": [
            {
              "id": "f",
              "label": "Formulas"
            },
            {
              "id": "h",
              "label": "Homogeneity"
            },
            {
              "id": "c",
              "label": "Conversion"
            }
          ]
        },
        {
          "id": "errors",
          "label": "Errors",
          "children": [
            {
              "id": "t",
              "label": "Types"
            },
            {
              "id": "a",
              "label": "Abs/Rel/%"
            },
            {
              "id": "p",
              "label": "Propagation"
            }
          ]
        },
        {
          "id": "sig",
          "label": "Significant Figures",
          "children": [
            {
              "id": "r",
              "label": "Rules"
            },
            {
              "id": "o",
              "label": "Operations"
            }
          ]
        },
        {
          "id": "inst",
          "label": "Instruments",
          "children": [
            {
              "id": "v",
              "label": "Vernier"
            },
            {
              "id": "s",
              "label": "Screw Gauge"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Units & Measurements",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Units & Measurements",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "p2": {
      "name": "Motion in a Straight Line",
      "central": "1D Motion",
      "notesHtml": "<h1>Motion in a Straight Line</h1>\n<p>Kinematics: position, displacement, velocity, acceleration in 1D — no forces.</p>\n<h2>Distance vs Displacement</h2>\n<ul><li><b>Distance</b> — scalar path length</li><li><b>Displacement</b> — vector shortest path</li></ul>\n<div class=\"formula\">Average velocity = dx/dt_avg</div>\n<div class=\"formula\">v = dx/dt ; a = dv/dt</div>\n<h2>Equations of Motion (constant a)</h2>\n<div class=\"formula\">v = u + at</div>\n<div class=\"formula\">s = ut + (1/2)at^2</div>\n<div class=\"formula\">v^2 = u^2 + 2as</div>\n<div class=\"note\"><b>VUT mnemonic:</b> three equations cover all constant-a cases.</div>\n<h2>Graphs</h2>\n<ul><li>x-t: slope = velocity</li><li>v-t: slope = a; area = displacement</li><li>a-t: area = change in v</li></ul>\n<h2>Relative Motion and Free Fall</h2>\n<div class=\"formula\">v_AB = v_A - v_B</div>\n<div class=\"formula\">Stopping distance s = v^2/(2a)</div>\n<div class=\"example\"><div class=\"example-title\">Tip</div>Define +ve direction first; split multi-stage motion at boundaries.</div>",
      "cheatsheet": [
        {
          "name": "Avg velocity",
          "formula": "v_avg=dx/dt",
          "proof": "disp/time"
        },
        {
          "name": "Instant v",
          "formula": "v=dx/dt",
          "proof": "derivative"
        },
        {
          "name": "Acceleration",
          "formula": "a=dv/dt",
          "proof": "rate"
        },
        {
          "name": "v=u+at",
          "formula": "v=u+at",
          "proof": "const a"
        },
        {
          "name": "s=ut+1/2 at^2",
          "formula": "s=ut+1/2 at^2",
          "proof": "const a"
        },
        {
          "name": "v^2=u^2+2as",
          "formula": "v^2=u^2+2as",
          "proof": "no t"
        },
        {
          "name": "Relative v",
          "formula": "v_AB=v_A-v_B",
          "proof": "1D"
        },
        {
          "name": "Stopping",
          "formula": "s=v^2/(2a)",
          "proof": "decel a"
        }
      ],
      "summary": [
        "Distance scalar; displacement vector",
        "|v_avg| <= average speed",
        "v=dx/dt, a=dv/dt",
        "Three EOM for constant a",
        "v-t area=displacement",
        "x-t slope=velocity",
        "Relative: subtract velocities",
        "Free fall a=+/-g by convention",
        "Stopping distance ~ v^2",
        "Round trip avg velocity can be 0",
        "Uniform motion a=0",
        "Instantaneous speed=|v|",
        "Graphs high-yield in JEE",
        "Define +ve direction first",
        "Multi-stage: match boundary v"
      ],
      "mindmap": [
        {
          "id": "bas",
          "label": "Basics",
          "children": [
            {
              "id": "d",
              "label": "Dist/Disp"
            },
            {
              "id": "v",
              "label": "Speed/Vel"
            },
            {
              "id": "a",
              "label": "Accel"
            }
          ]
        },
        {
          "id": "eom",
          "label": "Equations",
          "children": [
            {
              "id": "e1",
              "label": "v=u+at"
            },
            {
              "id": "e2",
              "label": "s=ut+1/2at^2"
            },
            {
              "id": "e3",
              "label": "v^2=u^2+2as"
            }
          ]
        },
        {
          "id": "gr",
          "label": "Graphs",
          "children": [
            {
              "id": "xt",
              "label": "x-t"
            },
            {
              "id": "vt",
              "label": "v-t"
            }
          ]
        },
        {
          "id": "rel",
          "label": "Relative",
          "children": [
            {
              "id": "vab",
              "label": "v_AB"
            }
          ]
        },
        {
          "id": "ff",
          "label": "Free Fall",
          "children": [
            {
              "id": "g",
              "label": "+/-g"
            },
            {
              "id": "st",
              "label": "Stopping"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — 1D Motion",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — 1D Motion",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "p3": {
      "name": "Motion in a Plane",
      "central": "Projectile & Vectors",
      "notesHtml": "<h1>📘 Motion in a Plane</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Range</b>: R=u^2 sin2th/g</div><div class=\"formula\"><b>Max height</b>: H=u^2 sin^2 th/2g</div><div class=\"formula\"><b>TOF</b>: T=2u sinth/g</div><div class=\"formula\"><b>Dot</b>: A.B=|A||B|cos</div>",
      "cheatsheet": [
        {
          "name": "Range",
          "formula": "R=u^2 sin2th/g",
          "proof": "horiz"
        },
        {
          "name": "Max height",
          "formula": "H=u^2 sin^2 th/2g",
          "proof": "vert"
        },
        {
          "name": "TOF",
          "formula": "T=2u sinth/g",
          "proof": "flight"
        },
        {
          "name": "Dot",
          "formula": "A.B=|A||B|cos",
          "proof": "scalar"
        },
        {
          "name": "Cross",
          "formula": "|AxB|=|A||B|sin",
          "proof": "vector"
        },
        {
          "name": "Rmax",
          "formula": "u^2/g at 45",
          "proof": "opt"
        },
        {
          "name": "Complementary",
          "formula": "R(th)=R(90-th)",
          "proof": "same R"
        },
        {
          "name": "Relative 2D",
          "formula": "vAB=vA-vB",
          "proof": "vector"
        }
      ],
      "summary": [
        "Independent horiz/vert motion",
        "R max at 45 deg",
        "Complementary angles same range",
        "Dot scalar cross vector",
        "River-boat relative velocity",
        "Trajectory is parabola",
        "vx constant",
        "At top vy=0",
        "ac=v^2/r intro",
        "Unit vector A/|A|",
        "Position r=xi+yj",
        "Parametric projectile",
        "JEE loves relative 2D",
        "Path vs displacement",
        "Time of flight formula"
      ],
      "mindmap": [
        {
          "id": "vec",
          "label": "Vectors",
          "children": [
            {
              "id": "d",
              "label": "Dot"
            },
            {
              "id": "c",
              "label": "Cross"
            }
          ]
        },
        {
          "id": "proj",
          "label": "Projectile",
          "children": [
            {
              "id": "R",
              "label": "Range"
            },
            {
              "id": "H",
              "label": "H"
            },
            {
              "id": "T",
              "label": "TOF"
            }
          ]
        },
        {
          "id": "rel",
          "label": "Relative",
          "children": [
            {
              "id": "b",
              "label": "Boat"
            }
          ]
        },
        {
          "id": "tr",
          "label": "Trajectory",
          "children": [
            {
              "id": "p",
              "label": "Parabola"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Projectile & Vectors",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Projectile & Vectors",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "p4": {
      "name": "Laws of Motion",
      "central": "Newton Laws",
      "notesHtml": "<h1>📘 Laws of Motion</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>2nd law</b>: F=ma=dp/dt</div><div class=\"formula\"><b>Kinetic fric</b>: fk=uk N</div><div class=\"formula\"><b>Static max</b>: fs<=us N</div><div class=\"formula\"><b>Impulse</b>: J=F dt=dp</div>",
      "cheatsheet": [
        {
          "name": "2nd law",
          "formula": "F=ma=dp/dt",
          "proof": "net F"
        },
        {
          "name": "Kinetic fric",
          "formula": "fk=uk N",
          "proof": "oppose"
        },
        {
          "name": "Static max",
          "formula": "fs<=us N",
          "proof": "prevent"
        },
        {
          "name": "Impulse",
          "formula": "J=F dt=dp",
          "proof": "dp"
        },
        {
          "name": "Pseudo",
          "formula": "F=-ma0",
          "proof": "non-inertial"
        },
        {
          "name": "Constraint",
          "formula": "a1=a2 string",
          "proof": "inext"
        },
        {
          "name": "Incline",
          "formula": "a=g(sinth-u costh)",
          "proof": "down"
        },
        {
          "name": "Banking",
          "formula": "v=sqrt(rg tanth)",
          "proof": "ideal"
        }
      ],
      "summary": [
        "Three Newton laws",
        "Action-reaction different bodies",
        "Friction static/kinetic",
        "Impulse=dp",
        "Pseudo forces",
        "FBD essential",
        "Atwood formula",
        "Banking without friction",
        "N not always mg",
        "String tension same",
        "Lift N=m(g+/-a)",
        "Limiting friction uN",
        "Pulley ideal massless",
        "JEE blocks wedges",
        "Constraint relations"
      ],
      "mindmap": [
        {
          "id": "nl",
          "label": "Newton",
          "children": [
            {
              "id": "1",
              "label": "1st"
            },
            {
              "id": "2",
              "label": "2nd"
            },
            {
              "id": "3",
              "label": "3rd"
            }
          ]
        },
        {
          "id": "fr",
          "label": "Friction",
          "children": [
            {
              "id": "s",
              "label": "Static"
            },
            {
              "id": "k",
              "label": "Kinetic"
            }
          ]
        },
        {
          "id": "im",
          "label": "Impulse",
          "children": [
            {
              "id": "j",
              "label": "J=dp"
            }
          ]
        },
        {
          "id": "co",
          "label": "Constraints",
          "children": [
            {
              "id": "s",
              "label": "String"
            }
          ]
        },
        {
          "id": "ap",
          "label": "Apps",
          "children": [
            {
              "id": "i",
              "label": "Incline"
            },
            {
              "id": "b",
              "label": "Bank"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Newton Laws",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Newton Laws",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "p5": {
      "name": "Work, Energy & Power",
      "central": "Work-Energy",
      "notesHtml": "<h1>📘 Work, Energy & Power</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Work</b>: W=Fd cos th</div><div class=\"formula\"><b>KE</b>: K=1/2 mv^2</div><div class=\"formula\"><b>PE grav</b>: U=mgh</div><div class=\"formula\"><b>PE spring</b>: U=1/2 kx^2</div>",
      "cheatsheet": [
        {
          "name": "Work",
          "formula": "W=Fd cos th",
          "proof": "scalar"
        },
        {
          "name": "KE",
          "formula": "K=1/2 mv^2",
          "proof": "energy"
        },
        {
          "name": "PE grav",
          "formula": "U=mgh",
          "proof": "near earth"
        },
        {
          "name": "PE spring",
          "formula": "U=1/2 kx^2",
          "proof": "Hooke"
        },
        {
          "name": "Power",
          "formula": "P=F.v",
          "proof": "rate"
        },
        {
          "name": "W-E thm",
          "formula": "Wnet=dK",
          "proof": "theorem"
        },
        {
          "name": "Mech E",
          "formula": "E=K+U",
          "proof": "conserv"
        },
        {
          "name": "Vert circle",
          "formula": "vtop=sqrt(gR)",
          "proof": "min"
        }
      ],
      "summary": [
        "Work scalar",
        "KE always >=0",
        "Conservative path independent",
        "Wnet=dK",
        "Spring PE 1/2 kx^2",
        "Power F.v",
        "E conserved if only conservative",
        "Loop-the-loop min speeds",
        "Variable force int F dx",
        "Collisions e",
        "Non-cons work=dE",
        "Sign of work cos",
        "PE reference arbitrary",
        "JEE vertical circle",
        "Average power W/t"
      ],
      "mindmap": [
        {
          "id": "w",
          "label": "Work",
          "children": [
            {
              "id": "fd",
              "label": "F.d"
            }
          ]
        },
        {
          "id": "e",
          "label": "Energy",
          "children": [
            {
              "id": "k",
              "label": "KE"
            },
            {
              "id": "p",
              "label": "PE"
            }
          ]
        },
        {
          "id": "p",
          "label": "Power",
          "children": [
            {
              "id": "fv",
              "label": "F.v"
            }
          ]
        },
        {
          "id": "we",
          "label": "W-E",
          "children": [
            {
              "id": "dk",
              "label": "dK"
            }
          ]
        },
        {
          "id": "vc",
          "label": "Vert circle",
          "children": [
            {
              "id": "v",
              "label": "vmin"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Work-Energy",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Work-Energy",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "p6": {
      "name": "System of Particles & Rotational Motion",
      "central": "Rotation",
      "notesHtml": "<h1>📘 System of Particles & Rotational Motion</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>COM</b>: R=sum mr/M</div><div class=\"formula\"><b>I</b>: I=sum mr^2</div><div class=\"formula\"><b>Torque</b>: tau=r x F=I alpha</div><div class=\"formula\"><b>L</b>: L=I w=r x p</div>",
      "cheatsheet": [
        {
          "name": "COM",
          "formula": "R=sum mr/M",
          "proof": "weighted"
        },
        {
          "name": "I",
          "formula": "I=sum mr^2",
          "proof": "inertia"
        },
        {
          "name": "Torque",
          "formula": "tau=r x F=I alpha",
          "proof": "ang"
        },
        {
          "name": "L",
          "formula": "L=I w=r x p",
          "proof": "ang mom"
        },
        {
          "name": "Parallel",
          "formula": "I=Icm+Md^2",
          "proof": "Steiner"
        },
        {
          "name": "Perp",
          "formula": "Iz=Ix+Iy",
          "proof": "planar"
        },
        {
          "name": "Rolling",
          "formula": "v=wR",
          "proof": "pure"
        },
        {
          "name": "KE rot",
          "formula": "1/2 I w^2",
          "proof": "+1/2 Mv^2"
        }
      ],
      "summary": [
        "COM motion Fnet/M",
        "I=int r^2 dm",
        "Parallel and perp axis",
        "tau=I alpha",
        "L conserved if tau_ext=0",
        "Pure rolling v=wR",
        "KE=1/2 Mv^2+1/2 Iw^2",
        "Disc 1/2 MR^2 hoop MR^2",
        "Angular impulse dL",
        "Friction for rolling",
        "k radius of gyration",
        "Right-hand rule",
        "JEE heavy rotation",
        "Collision+rotation",
        "Precession advanced"
      ],
      "mindmap": [
        {
          "id": "com",
          "label": "COM",
          "children": [
            {
              "id": "r",
              "label": "Rcm"
            }
          ]
        },
        {
          "id": "i",
          "label": "MOI",
          "children": [
            {
              "id": "p",
              "label": "Parallel"
            },
            {
              "id": "q",
              "label": "Perp"
            }
          ]
        },
        {
          "id": "t",
          "label": "Torque",
          "children": [
            {
              "id": "a",
              "label": "I alpha"
            }
          ]
        },
        {
          "id": "r",
          "label": "Rolling",
          "children": [
            {
              "id": "v",
              "label": "v=wR"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Rotation",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Rotation",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "p7": {
      "name": "Gravitation",
      "central": "Gravitation",
      "notesHtml": "<h1>📘 Gravitation</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Newton</b>: F=Gm1m2/r^2</div><div class=\"formula\"><b>g</b>: g=GM/r^2</div><div class=\"formula\"><b>Orbital</b>: vo=sqrt(GM/r)</div><div class=\"formula\"><b>Escape</b>: ve=sqrt(2GM/R)</div>",
      "cheatsheet": [
        {
          "name": "Newton",
          "formula": "F=Gm1m2/r^2",
          "proof": "1/r^2"
        },
        {
          "name": "g",
          "formula": "g=GM/r^2",
          "proof": "field"
        },
        {
          "name": "Orbital",
          "formula": "vo=sqrt(GM/r)",
          "proof": "circ"
        },
        {
          "name": "Escape",
          "formula": "ve=sqrt(2GM/R)",
          "proof": "sqrt2 vo"
        },
        {
          "name": "Kepler3",
          "formula": "T^2 ~ r^3",
          "proof": "law"
        },
        {
          "name": "PE",
          "formula": "U=-GMm/r",
          "proof": "inf=0"
        },
        {
          "name": "g height",
          "formula": "gh=g(1-2h/R)",
          "proof": "approx"
        },
        {
          "name": "Geostat",
          "formula": "T=24h",
          "proof": "eq"
        }
      ],
      "summary": [
        "Inverse square",
        "g varies height/depth",
        "ve=sqrt2 vo",
        "Kepler laws",
        "PE negative",
        "Geostationary 24h",
        "Satellite energies",
        "Binding GMm/r",
        "Weightless free fall",
        "g_depth=g(1-d/R)",
        "T independent of m",
        "Potential -GM/r",
        "JEE satellite energy",
        "Escape caveats",
        "Intensity=g"
      ],
      "mindmap": [
        {
          "id": "law",
          "label": "Newton",
          "children": [
            {
              "id": "f",
              "label": "F"
            }
          ]
        },
        {
          "id": "orb",
          "label": "Orbits",
          "children": [
            {
              "id": "o",
              "label": "vo"
            },
            {
              "id": "e",
              "label": "ve"
            }
          ]
        },
        {
          "id": "k",
          "label": "Kepler",
          "children": [
            {
              "id": "t",
              "label": "T^2~r^3"
            }
          ]
        },
        {
          "id": "g",
          "label": "g var",
          "children": [
            {
              "id": "h",
              "label": "height"
            },
            {
              "id": "d",
              "label": "depth"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Gravitation",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Gravitation",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "p8": {
      "name": "Mechanical Properties of Solids",
      "central": "Elasticity",
      "notesHtml": "<h1>📘 Mechanical Properties of Solids</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Stress</b>: sigma=F/A</div><div class=\"formula\"><b>Strain</b>: eps=dL/L</div><div class=\"formula\"><b>Young</b>: Y=sigma/eps</div><div class=\"formula\"><b>Bulk</b>: B=-dP/(dV/V)</div>",
      "cheatsheet": [
        {
          "name": "Stress",
          "formula": "sigma=F/A",
          "proof": "F/A"
        },
        {
          "name": "Strain",
          "formula": "eps=dL/L",
          "proof": "frac"
        },
        {
          "name": "Young",
          "formula": "Y=sigma/eps",
          "proof": "long"
        },
        {
          "name": "Bulk",
          "formula": "B=-dP/(dV/V)",
          "proof": "vol"
        },
        {
          "name": "Shear",
          "formula": "G=(F/A)/th",
          "proof": "tan"
        },
        {
          "name": "Hooke",
          "formula": "F=-kx",
          "proof": "elastic"
        },
        {
          "name": "Poisson",
          "formula": "-lat/long",
          "proof": "ratio"
        },
        {
          "name": "Energy dens",
          "formula": "1/2 stress strain",
          "proof": "u"
        }
      ],
      "summary": [
        "Stress F/A strain dimensionless",
        "Y B G moduli",
        "Hooke within limit",
        "Poisson 0.2-0.4",
        "u=1/2 se",
        "Thermal stress Y a dT",
        "Series same F parallel same dL",
        "Compressibility 1/B",
        "Ductile vs brittle",
        "Breaking stress",
        "JEE wire combos",
        "Shear angle",
        "Hysteresis advanced",
        "Energy in wire",
        "Elastic limit"
      ],
      "mindmap": [
        {
          "id": "ss",
          "label": "Stress-Strain",
          "children": [
            {
              "id": "h",
              "label": "Hooke"
            }
          ]
        },
        {
          "id": "m",
          "label": "Moduli",
          "children": [
            {
              "id": "y",
              "label": "Y"
            },
            {
              "id": "b",
              "label": "B"
            },
            {
              "id": "g",
              "label": "G"
            }
          ]
        },
        {
          "id": "p",
          "label": "Poisson",
          "children": [
            {
              "id": "r",
              "label": "sp"
            }
          ]
        },
        {
          "id": "e",
          "label": "Energy",
          "children": [
            {
              "id": "u",
              "label": "1/2se"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Elasticity",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Elasticity",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "p9": {
      "name": "Mechanical Properties of Fluids",
      "central": "Fluids",
      "notesHtml": "<h1>📘 Mechanical Properties of Fluids</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Pressure</b>: P=rho g h</div><div class=\"formula\"><b>Pascal</b>: dP same</div><div class=\"formula\"><b>Buoyancy</b>: Fb=rho V g</div><div class=\"formula\"><b>Continuity</b>: A1v1=A2v2</div>",
      "cheatsheet": [
        {
          "name": "Pressure",
          "formula": "P=rho g h",
          "proof": "hydro"
        },
        {
          "name": "Pascal",
          "formula": "dP same",
          "proof": "hydraulics"
        },
        {
          "name": "Buoyancy",
          "formula": "Fb=rho V g",
          "proof": "Archimedes"
        },
        {
          "name": "Continuity",
          "formula": "A1v1=A2v2",
          "proof": "incomp"
        },
        {
          "name": "Bernoulli",
          "formula": "P+rho gh+1/2 rho v^2",
          "proof": "energy"
        },
        {
          "name": "Poiseuille",
          "formula": "Q=pi r^4 dP/8 eta L",
          "proof": "visc"
        },
        {
          "name": "Stokes",
          "formula": "F=6 pi eta r v",
          "proof": "sphere"
        },
        {
          "name": "ST",
          "formula": "S=F/l",
          "proof": "surf"
        }
      ],
      "summary": [
        "P increases with depth",
        "Pascal transmission",
        "Buoyancy displaced weight",
        "Av constant",
        "Bernoulli streamline",
        "Stokes terminal v",
        "Capillary 2S cos/rho g r",
        "Venturi Torricelli",
        "Drop 2S/r bubble 4S/r",
        "Reynolds number",
        "Gauge vs absolute",
        "JEE Bernoulli capillary",
        "Manometer",
        "Streamline flow",
        "Viscosity eta"
      ],
      "mindmap": [
        {
          "id": "p",
          "label": "Pressure",
          "children": [
            {
              "id": "r",
              "label": "rho gh"
            },
            {
              "id": "pa",
              "label": "Pascal"
            }
          ]
        },
        {
          "id": "b",
          "label": "Buoyancy",
          "children": [
            {
              "id": "a",
              "label": "Arch"
            }
          ]
        },
        {
          "id": "f",
          "label": "Flow",
          "children": [
            {
              "id": "c",
              "label": "Cont"
            },
            {
              "id": "be",
              "label": "Bern"
            }
          ]
        },
        {
          "id": "v",
          "label": "Visc",
          "children": [
            {
              "id": "s",
              "label": "Stokes"
            }
          ]
        },
        {
          "id": "s",
          "label": "ST",
          "children": [
            {
              "id": "c",
              "label": "Cap"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Fluids",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Fluids",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "p10": {
      "name": "Thermal Properties of Matter",
      "central": "Thermal",
      "notesHtml": "<h1>📘 Thermal Properties of Matter</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Linear</b>: dL=L a dT</div><div class=\"formula\"><b>Volume</b>: dV=V g dT</div><div class=\"formula\"><b>Heat</b>: Q=mc dT</div><div class=\"formula\"><b>Latent</b>: Q=mL</div>",
      "cheatsheet": [
        {
          "name": "Linear",
          "formula": "dL=L a dT",
          "proof": "a"
        },
        {
          "name": "Volume",
          "formula": "dV=V g dT",
          "proof": "g~3a"
        },
        {
          "name": "Heat",
          "formula": "Q=mc dT",
          "proof": "sensible"
        },
        {
          "name": "Latent",
          "formula": "Q=mL",
          "proof": "phase"
        },
        {
          "name": "Fourier",
          "formula": "dQ/dt=-KA dT/dx",
          "proof": "cond"
        },
        {
          "name": "Stefan",
          "formula": "E=sig T^4",
          "proof": "rad"
        },
        {
          "name": "Newton cool",
          "formula": "dT/dt~(T-T0)",
          "proof": "cool"
        },
        {
          "name": "Rth",
          "formula": "R=L/KA",
          "proof": "resist"
        }
      ],
      "summary": [
        "a area 2a volume 3a",
        "Calorimetry mc dT + mL",
        "Conduction Fourier",
        "Radiation sig T^4",
        "Newton cooling",
        "Thermal R series/parallel",
        "Wien lambda T=const",
        "Water anomalous 0-4C",
        "Black body e=1",
        "JEE slabs",
        "Emissivity",
        "Heat current same series",
        "dT same parallel",
        "Specific heat water",
        "Greenhouse qualitative"
      ],
      "mindmap": [
        {
          "id": "e",
          "label": "Expansion",
          "children": [
            {
              "id": "a",
              "label": "a"
            },
            {
              "id": "g",
              "label": "g"
            }
          ]
        },
        {
          "id": "c",
          "label": "Calorimetry",
          "children": [
            {
              "id": "q",
              "label": "mc dT"
            },
            {
              "id": "l",
              "label": "mL"
            }
          ]
        },
        {
          "id": "h",
          "label": "Heat transfer",
          "children": [
            {
              "id": "co",
              "label": "Cond"
            },
            {
              "id": "r",
              "label": "Rad"
            }
          ]
        },
        {
          "id": "n",
          "label": "Cooling",
          "children": [
            {
              "id": "nc",
              "label": "Newton"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Thermal",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Thermal",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "p11": {
      "name": "Thermodynamics",
      "central": "Thermo",
      "notesHtml": "<h1>📘 Thermodynamics</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>1st law</b>: dQ=dU+dW</div><div class=\"formula\"><b>Isothermal</b>: dU=0 W=nRT ln</div><div class=\"formula\"><b>Adiabatic</b>: PV^g Q=0</div><div class=\"formula\"><b>Isobaric</b>: W=P dV</div>",
      "cheatsheet": [
        {
          "name": "1st law",
          "formula": "dQ=dU+dW",
          "proof": "cons"
        },
        {
          "name": "Isothermal",
          "formula": "dU=0 W=nRT ln",
          "proof": "T const"
        },
        {
          "name": "Adiabatic",
          "formula": "PV^g Q=0",
          "proof": "no heat"
        },
        {
          "name": "Isobaric",
          "formula": "W=P dV",
          "proof": "P const"
        },
        {
          "name": "Isochoric",
          "formula": "W=0",
          "proof": "V const"
        },
        {
          "name": "Carnot",
          "formula": "eta=1-T2/T1",
          "proof": "rev"
        },
        {
          "name": "Entropy",
          "formula": "dS=dQrev/T",
          "proof": "2nd"
        },
        {
          "name": "Mayer",
          "formula": "Cp-Cv=R",
          "proof": "ideal"
        }
      ],
      "summary": [
        "1st law energy",
        "Isothermal dU=0",
        "Adiabatic Q=0",
        "Carnot only T",
        "Entropy universe up",
        "Cp-Cv=R",
        "gamma=Cp/Cv",
        "U state W path",
        "Heat engine W=Qh-Qc",
        "COP fridge",
        "PV diagrams",
        "Ideal U(T) only",
        "No 100% heat to work",
        "Reversible max W",
        "JEE processes"
      ],
      "mindmap": [
        {
          "id": "l",
          "label": "Laws",
          "children": [
            {
              "id": "1",
              "label": "1st"
            },
            {
              "id": "2",
              "label": "2nd"
            }
          ]
        },
        {
          "id": "p",
          "label": "Processes",
          "children": [
            {
              "id": "i",
              "label": "IsoT"
            },
            {
              "id": "a",
              "label": "Adiab"
            }
          ]
        },
        {
          "id": "c",
          "label": "Carnot",
          "children": [
            {
              "id": "e",
              "label": "eta"
            }
          ]
        },
        {
          "id": "s",
          "label": "Entropy",
          "children": [
            {
              "id": "d",
              "label": "dQ/T"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Thermo",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Thermo",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "p12": {
      "name": "Kinetic Theory of Gases",
      "central": "KTG",
      "notesHtml": "<h1>📘 Kinetic Theory of Gases</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Ideal</b>: PV=nRT</div><div class=\"formula\"><b>P KTG</b>: P=1/3 rho vrms^2</div><div class=\"formula\"><b>KE</b>: (3/2)kT</div><div class=\"formula\"><b>vrms</b>: sqrt(3RT/M)</div>",
      "cheatsheet": [
        {
          "name": "Ideal",
          "formula": "PV=nRT",
          "proof": "EOS"
        },
        {
          "name": "P KTG",
          "formula": "P=1/3 rho vrms^2",
          "proof": "coll"
        },
        {
          "name": "KE",
          "formula": "(3/2)kT",
          "proof": "mol"
        },
        {
          "name": "vrms",
          "formula": "sqrt(3RT/M)",
          "proof": "rms"
        },
        {
          "name": "mfp",
          "formula": "lambda=1/(sqrt2 pi d^2 N/V)",
          "proof": "path"
        },
        {
          "name": "Equipart",
          "formula": "1/2 kT per DOF",
          "proof": "eq"
        },
        {
          "name": "U",
          "formula": "(f/2)nRT",
          "proof": "int"
        },
        {
          "name": "vdW",
          "formula": "(P+a/Vm^2)(Vm-b)=RT",
          "proof": "real"
        }
      ],
      "summary": [
        "PV=nRT",
        "P from collisions",
        "KE ~ T",
        "vrms>vavg>vmp",
        "mfp vs density",
        "1/2 kT per DOF",
        "gamma=1+2/f",
        "vdW a b",
        "Mono f=3 di f=5",
        "T measures KE",
        "Maxwell dist",
        "Brownian",
        "Cp from f",
        "Dalton partial P",
        "Critical from a b"
      ],
      "mindmap": [
        {
          "id": "ig",
          "label": "Ideal",
          "children": [
            {
              "id": "p",
              "label": "PV=nRT"
            }
          ]
        },
        {
          "id": "ke",
          "label": "KE",
          "children": [
            {
              "id": "r",
              "label": "vrms"
            }
          ]
        },
        {
          "id": "eq",
          "label": "Equipart",
          "children": [
            {
              "id": "f",
              "label": "DOF"
            }
          ]
        },
        {
          "id": "re",
          "label": "Real",
          "children": [
            {
              "id": "v",
              "label": "vdW"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — KTG",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — KTG",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "p13": {
      "name": "Oscillations",
      "central": "SHM",
      "notesHtml": "<h1>📘 Oscillations</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>x</b>: x=A sin(wt+phi)</div><div class=\"formula\"><b>Spring T</b>: 2pi sqrt(m/k)</div><div class=\"formula\"><b>Pendulum</b>: 2pi sqrt(L/g)</div><div class=\"formula\"><b>w</b>: sqrt(k/m)</div>",
      "cheatsheet": [
        {
          "name": "x",
          "formula": "x=A sin(wt+phi)",
          "proof": "SHM"
        },
        {
          "name": "Spring T",
          "formula": "2pi sqrt(m/k)",
          "proof": "mass"
        },
        {
          "name": "Pendulum",
          "formula": "2pi sqrt(L/g)",
          "proof": "simple"
        },
        {
          "name": "w",
          "formula": "sqrt(k/m)",
          "proof": "ang"
        },
        {
          "name": "E",
          "formula": "1/2 k A^2",
          "proof": "const"
        },
        {
          "name": "vmax",
          "formula": "w A",
          "proof": "mean"
        },
        {
          "name": "amax",
          "formula": "w^2 A",
          "proof": "ext"
        },
        {
          "name": "Damped",
          "formula": "A e^(-bt/2m) sin",
          "proof": "decay"
        }
      ],
      "summary": [
        "a=-w^2 x",
        "T spring/pendulum",
        "Energy K<->U",
        "Phase phi",
        "vmax at mean",
        "amax at extreme",
        "Damped decay",
        "Resonance peak",
        "Physical pendulum",
        "Springs series/parallel",
        "g_eff lift",
        "T indep of A ideal",
        "w=2pi f",
        "Phase v and x pi/2",
        "Superposition SHM"
      ],
      "mindmap": [
        {
          "id": "s",
          "label": "SHM",
          "children": [
            {
              "id": "x",
              "label": "x(t)"
            }
          ]
        },
        {
          "id": "sy",
          "label": "Systems",
          "children": [
            {
              "id": "sp",
              "label": "Spring"
            },
            {
              "id": "pe",
              "label": "Pend"
            }
          ]
        },
        {
          "id": "e",
          "label": "Energy",
          "children": [
            {
              "id": "ea",
              "label": "1/2 kA^2"
            }
          ]
        },
        {
          "id": "d",
          "label": "Damped",
          "children": [
            {
              "id": "r",
              "label": "Resonance"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — SHM",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — SHM",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "p14": {
      "name": "Waves",
      "central": "Waves",
      "notesHtml": "<h1>📘 Waves</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>v=f lambda</b>: v=f lambda</div><div class=\"formula\"><b>Wave</b>: y=A sin(wt-kx)</div><div class=\"formula\"><b>String</b>: v=sqrt(T/mu)</div><div class=\"formula\"><b>Sound</b>: v=sqrt(gamma P/rho)</div>",
      "cheatsheet": [
        {
          "name": "v=f lambda",
          "formula": "v=f lambda",
          "proof": "basic"
        },
        {
          "name": "Wave",
          "formula": "y=A sin(wt-kx)",
          "proof": "prog"
        },
        {
          "name": "String",
          "formula": "v=sqrt(T/mu)",
          "proof": "trans"
        },
        {
          "name": "Sound",
          "formula": "v=sqrt(gamma P/rho)",
          "proof": "long"
        },
        {
          "name": "Standing",
          "formula": "nodes/antinodes",
          "proof": "interf"
        },
        {
          "name": "Beats",
          "formula": "|f1-f2|",
          "proof": "close"
        },
        {
          "name": "Doppler",
          "formula": "f'=f(v+/-vo)/(v+/-vs)",
          "proof": "rel"
        },
        {
          "name": "Pipes",
          "formula": "nv/2L open; odd/4L closed",
          "proof": "harm"
        }
      ],
      "summary": [
        "v=f lambda always",
        "Transverse vs long",
        "String sqrt(T/mu)",
        "Sound sqrt(gamma RT/M)",
        "Standing waves",
        "Beats |df|",
        "Doppler signs careful",
        "Open all harmonics closed odd",
        "I ~ A^2",
        "delta=2pi/lambda path",
        "Organ pipes JEE",
        "k=2pi/lambda",
        "Superposition",
        "Non-dispersive v indep f",
        "Echo 2d=vt"
      ],
      "mindmap": [
        {
          "id": "pr",
          "label": "Progressive",
          "children": [
            {
              "id": "v",
              "label": "v=fl"
            }
          ]
        },
        {
          "id": "m",
          "label": "Media",
          "children": [
            {
              "id": "s",
              "label": "String"
            },
            {
              "id": "so",
              "label": "Sound"
            }
          ]
        },
        {
          "id": "st",
          "label": "Standing",
          "children": [
            {
              "id": "n",
              "label": "Nodes"
            }
          ]
        },
        {
          "id": "d",
          "label": "Doppler/Beats",
          "children": [
            {
              "id": "b",
              "label": "Beats"
            },
            {
              "id": "d2",
              "label": "Doppler"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Waves",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Waves",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    }
  },
  "chemistry": {
    "c1": {
      "name": "Some Basic Concepts of Chemistry",
      "central": "Mole Concept",
      "notesHtml": "<h1>📘 Some Basic Concepts of Chemistry</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Mole</b>: n=N/NA=m/M</div><div class=\"formula\"><b>Molarity</b>: M=n/VL</div><div class=\"formula\"><b>Molality</b>: m=n/kg</div><div class=\"formula\"><b>Normality</b>: N=eq/VL</div>",
      "cheatsheet": [
        {
          "name": "Mole",
          "formula": "n=N/NA=m/M",
          "proof": "Avogadro"
        },
        {
          "name": "Molarity",
          "formula": "M=n/VL",
          "proof": "mol/L"
        },
        {
          "name": "Molality",
          "formula": "m=n/kg",
          "proof": "T-indep"
        },
        {
          "name": "Normality",
          "formula": "N=eq/VL",
          "proof": "eq"
        },
        {
          "name": "% mass",
          "formula": "(part/total)x100",
          "proof": "comp"
        },
        {
          "name": "EF",
          "formula": "simplest ratio",
          "proof": "%"
        },
        {
          "name": "Limiting",
          "formula": "least n/coeff",
          "proof": "yield"
        },
        {
          "name": "ppm",
          "formula": "mg/L approx",
          "proof": "trace"
        }
      ],
      "summary": [
        "1 mol = 6.022e23",
        "M vs m",
        "Limiting reagent",
        "EF vs MF",
        "n-factor",
        "22.4 L STP",
        "Mole fraction",
        "JEE stoich",
        "Normality = n-factor x M",
        "Sig figs",
        "Balance first",
        "Density link",
        "% purity",
        "Yield",
        "Mixture problems"
      ],
      "mindmap": [
        {
          "id": "m",
          "label": "Mole",
          "children": [
            {
              "id": "na",
              "label": "NA"
            }
          ]
        },
        {
          "id": "c",
          "label": "Conc",
          "children": [
            {
              "id": "M",
              "label": "Molarity"
            },
            {
              "id": "m2",
              "label": "Molality"
            }
          ]
        },
        {
          "id": "s",
          "label": "Stoich",
          "children": [
            {
              "id": "l",
              "label": "Limiting"
            }
          ]
        },
        {
          "id": "f",
          "label": "Formulas",
          "children": [
            {
              "id": "e",
              "label": "Empirical"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Mole Concept",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Mole Concept",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "c2": {
      "name": "Structure of Atom",
      "central": "Atomic Structure",
      "notesHtml": "<h1>📘 Structure of Atom</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Bohr r</b>: rn=0.529 n^2/Z A</div><div class=\"formula\"><b>Bohr E</b>: En=-13.6 Z^2/n^2 eV</div><div class=\"formula\"><b>de Broglie</b>: lambda=h/p</div><div class=\"formula\"><b>Heisenberg</b>: dx dp >= h/4pi</div>",
      "cheatsheet": [
        {
          "name": "Bohr r",
          "formula": "rn=0.529 n^2/Z A",
          "proof": "H-like"
        },
        {
          "name": "Bohr E",
          "formula": "En=-13.6 Z^2/n^2 eV",
          "proof": "levels"
        },
        {
          "name": "de Broglie",
          "formula": "lambda=h/p",
          "proof": "wave"
        },
        {
          "name": "Heisenberg",
          "formula": "dx dp >= h/4pi",
          "proof": "unc"
        },
        {
          "name": "Photoelectric",
          "formula": "hv=phi+KEmax",
          "proof": "Ein"
        },
        {
          "name": "QN",
          "formula": "n,l,ml,ms",
          "proof": "orb"
        },
        {
          "name": "Capacity",
          "formula": "s2 p6 d10 f14",
          "proof": "e-"
        },
        {
          "name": "Aufbau",
          "formula": "n+l rule",
          "proof": "fill"
        }
      ],
      "summary": [
        "Bohr H-like",
        "E ~ -Z^2/n^2",
        "Spectra series",
        "Dual nature",
        "Uncertainty",
        "4 quantum numbers",
        "Pauli Hund",
        "Photoelectric threshold",
        "Cr Cu exceptions",
        "Nodes n-l-1",
        "Rydberg",
        "Orbital shapes",
        "Zeeman qualitative",
        "Aufbau order",
        "JEE configs"
      ],
      "mindmap": [
        {
          "id": "b",
          "label": "Bohr",
          "children": [
            {
              "id": "e",
              "label": "En"
            },
            {
              "id": "r",
              "label": "rn"
            }
          ]
        },
        {
          "id": "q",
          "label": "QN",
          "children": [
            {
              "id": "n",
              "label": "n l m s"
            }
          ]
        },
        {
          "id": "w",
          "label": "Wave",
          "children": [
            {
              "id": "d",
              "label": "deB"
            },
            {
              "id": "u",
              "label": "Unc"
            }
          ]
        },
        {
          "id": "p",
          "label": "PE",
          "children": [
            {
              "id": "h",
              "label": "hv"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Atomic Structure",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Atomic Structure",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "c3": {
      "name": "Classification of Elements & Periodicity",
      "central": "Periodicity",
      "notesHtml": "<h1>📘 Classification of Elements & Periodicity</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Radius</b>: down across period</div><div class=\"formula\"><b>IE</b>: up across</div><div class=\"formula\"><b>EA</b>: up across</div><div class=\"formula\"><b>EN</b>: Pauling F max</div>",
      "cheatsheet": [
        {
          "name": "Radius",
          "formula": "down across period",
          "proof": "Zeff up"
        },
        {
          "name": "IE",
          "formula": "up across",
          "proof": "exc"
        },
        {
          "name": "EA",
          "formula": "up across",
          "proof": "exc"
        },
        {
          "name": "EN",
          "formula": "Pauling F max",
          "proof": "scale"
        },
        {
          "name": "Zeff",
          "formula": "Z-sigma",
          "proof": "Slater"
        },
        {
          "name": "Isoelec",
          "formula": "same e- size ~ 1/Z",
          "proof": "cmp"
        },
        {
          "name": "Metallic",
          "formula": "down across up down",
          "proof": "trend"
        },
        {
          "name": "Diagonal",
          "formula": "Li-Mg Be-Al",
          "proof": "rel"
        }
      ],
      "summary": [
        "Z-based table",
        "Trends by Zeff",
        "IE exceptions Be>B N>O",
        "EN F>O>Cl",
        "Isoelectronic size",
        "Diagonal rel",
        "Blocks s p d f",
        "Cations smaller",
        "Noble high IE",
        "JEE compare orders",
        "Ox states",
        "Metallic radius",
        "Valence e-",
        "Reactivity predict",
        "Periodicity core"
      ],
      "mindmap": [
        {
          "id": "t",
          "label": "Table",
          "children": [
            {
              "id": "b",
              "label": "blocks"
            }
          ]
        },
        {
          "id": "s",
          "label": "Size",
          "children": [
            {
              "id": "r",
              "label": "radius"
            }
          ]
        },
        {
          "id": "i",
          "label": "IE/EA/EN",
          "children": [
            {
              "id": "ie",
              "label": "IE"
            },
            {
              "id": "en",
              "label": "EN"
            }
          ]
        },
        {
          "id": "x",
          "label": "Special",
          "children": [
            {
              "id": "iso",
              "label": "Isoelec"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Periodicity",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Periodicity",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "c4": {
      "name": "Chemical Bonding & Molecular Structure",
      "central": "Bonding",
      "notesHtml": "<h1>📘 Chemical Bonding & Molecular Structure</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Ionic</b>: M+ X-</div><div class=\"formula\"><b>Covalent</b>: shared pair</div><div class=\"formula\"><b>VSEPR</b>: e- pair geom</div><div class=\"formula\"><b>Hybrid</b>: sp sp2 sp3 sp3d sp3d2</div>",
      "cheatsheet": [
        {
          "name": "Ionic",
          "formula": "M+ X-",
          "proof": "dEN"
        },
        {
          "name": "Covalent",
          "formula": "shared pair",
          "proof": "Lewis"
        },
        {
          "name": "VSEPR",
          "formula": "e- pair geom",
          "proof": "repel"
        },
        {
          "name": "Hybrid",
          "formula": "sp sp2 sp3 sp3d sp3d2",
          "proof": "mix"
        },
        {
          "name": "MOT",
          "formula": "sigma pi bond/anti",
          "proof": "MO"
        },
        {
          "name": "BO",
          "formula": "(Nb-Na)/2",
          "proof": "order"
        },
        {
          "name": "Dipole",
          "formula": "mu=q d",
          "proof": "polar"
        },
        {
          "name": "Resonance",
          "formula": "delocalized",
          "proof": "hybrid"
        }
      ],
      "summary": [
        "Ionic vs covalent Fajans",
        "Lewis FC",
        "VSEPR shapes",
        "Hybrid=geometry",
        "O2 MOT para",
        "BO vs length",
        "Resonance stabilize",
        "H-bond",
        "JEE shape hybrid angle",
        "mu vector sum",
        "Odd e-",
        "Expanded octet",
        "Born-Haber",
        "sigma pi count",
        "Polarization"
      ],
      "mindmap": [
        {
          "id": "t",
          "label": "Types",
          "children": [
            {
              "id": "i",
              "label": "Ionic"
            },
            {
              "id": "c",
              "label": "Cov"
            }
          ]
        },
        {
          "id": "v",
          "label": "VSEPR",
          "children": [
            {
              "id": "g",
              "label": "Geom"
            }
          ]
        },
        {
          "id": "h",
          "label": "Hybrid",
          "children": [
            {
              "id": "s",
              "label": "sp.."
            }
          ]
        },
        {
          "id": "m",
          "label": "MOT",
          "children": [
            {
              "id": "b",
              "label": "BO"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Bonding",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Bonding",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "c5": {
      "name": "Thermodynamics (Chemistry)",
      "central": "Thermo Chem",
      "notesHtml": "<h1>📘 Thermodynamics (Chemistry)</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>1st</b>: dU=q+w</div><div class=\"formula\"><b>H</b>: H=U+PV dH=qp</div><div class=\"formula\"><b>Hess</b>: path indep</div><div class=\"formula\"><b>S</b>: dSuniv>0</div>",
      "cheatsheet": [
        {
          "name": "1st",
          "formula": "dU=q+w",
          "proof": "chem"
        },
        {
          "name": "H",
          "formula": "H=U+PV dH=qp",
          "proof": "enthalpy"
        },
        {
          "name": "Hess",
          "formula": "path indep",
          "proof": "cycle"
        },
        {
          "name": "S",
          "formula": "dSuniv>0",
          "proof": "2nd"
        },
        {
          "name": "G",
          "formula": "dG=dH-T dS",
          "proof": "spont"
        },
        {
          "name": "dG0",
          "formula": "-RT lnK",
          "proof": "eq"
        },
        {
          "name": "dng",
          "formula": "dH=dU+dng RT",
          "proof": "gas"
        },
        {
          "name": "Bond H",
          "formula": "sum break - sum form",
          "proof": "est"
        }
      ],
      "summary": [
        "State U H S G",
        "q w path",
        "Hess cycles",
        "Exo dH<0",
        "dG<0 spont",
        "dG0-K link",
        "S gas moles",
        "dfH0 tables",
        "Born-Haber",
        "Sign oppose T-dep",
        "3rd law",
        "C=dq/dT",
        "Kirchhoff",
        "JEE thermo",
        "Reversible max w"
      ],
      "mindmap": [
        {
          "id": "uh",
          "label": "U&H",
          "children": [
            {
              "id": "dh",
              "label": "dH"
            }
          ]
        },
        {
          "id": "s",
          "label": "Entropy",
          "children": [
            {
              "id": "ds",
              "label": "dS"
            }
          ]
        },
        {
          "id": "g",
          "label": "Gibbs",
          "children": [
            {
              "id": "dg",
              "label": "dG"
            }
          ]
        },
        {
          "id": "he",
          "label": "Hess",
          "children": [
            {
              "id": "c",
              "label": "Cycles"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Thermo Chem",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Thermo Chem",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "c6": {
      "name": "Equilibrium",
      "central": "Equilibrium",
      "notesHtml": "<h1>📘 Equilibrium</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Kc</b>: [prod]/[react]</div><div class=\"formula\"><b>Kp</b>: Kc(RT)^dn</div><div class=\"formula\"><b>Le Chat</b>: opposes change</div><div class=\"formula\"><b>pH</b>: -log[H+]</div>",
      "cheatsheet": [
        {
          "name": "Kc",
          "formula": "[prod]/[react]",
          "proof": "conc"
        },
        {
          "name": "Kp",
          "formula": "Kc(RT)^dn",
          "proof": "P"
        },
        {
          "name": "Le Chat",
          "formula": "opposes change",
          "proof": "shift"
        },
        {
          "name": "pH",
          "formula": "-log[H+]",
          "proof": "acid"
        },
        {
          "name": "Kw",
          "formula": "1e-14 at 25C",
          "proof": "water"
        },
        {
          "name": "Buffer",
          "formula": "pH=pKa+log A/HA",
          "proof": "HH"
        },
        {
          "name": "Ksp",
          "formula": "ion product",
          "proof": "sol"
        },
        {
          "name": "alpha",
          "formula": "sqrt(Ka/C)",
          "proof": "weak"
        }
      ],
      "summary": [
        "Dynamic eq",
        "K only T",
        "Le Chatelier",
        "Kp-Kc",
        "pH scale",
        "Buffers",
        "Ksp common ion",
        "Ka Kb=Kw",
        "ICE tables",
        "alpha Ostwald",
        "Polyprotic",
        "Hydrolysis",
        "Q vs K",
        "Heterogeneous K",
        "Indicators"
      ],
      "mindmap": [
        {
          "id": "k",
          "label": "K",
          "children": [
            {
              "id": "c",
              "label": "Kc"
            },
            {
              "id": "p",
              "label": "Kp"
            }
          ]
        },
        {
          "id": "l",
          "label": "Le Chat",
          "children": [
            {
              "id": "s",
              "label": "Shift"
            }
          ]
        },
        {
          "id": "a",
          "label": "Acid-Base",
          "children": [
            {
              "id": "ph",
              "label": "pH"
            },
            {
              "id": "b",
              "label": "Buffer"
            }
          ]
        },
        {
          "id": "s",
          "label": "Solubility",
          "children": [
            {
              "id": "k",
              "label": "Ksp"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Equilibrium",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Equilibrium",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "c7": {
      "name": "Redox Reactions",
      "central": "Redox",
      "notesHtml": "<h1>📘 Redox Reactions</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Ox</b>: lose e- ON up</div><div class=\"formula\"><b>Red</b>: gain e- ON down</div><div class=\"formula\"><b>ON rules</b>: H+1 O-2</div><div class=\"formula\"><b>Balance</b>: ion-e / ON</div>",
      "cheatsheet": [
        {
          "name": "Ox",
          "formula": "lose e- ON up",
          "proof": "def"
        },
        {
          "name": "Red",
          "formula": "gain e- ON down",
          "proof": "def"
        },
        {
          "name": "ON rules",
          "formula": "H+1 O-2",
          "proof": "usual"
        },
        {
          "name": "Balance",
          "formula": "ion-e / ON",
          "proof": "methods"
        },
        {
          "name": "n-factor",
          "formula": "e- per formula",
          "proof": "eq"
        },
        {
          "name": "Eq mass",
          "formula": "M/n-f",
          "proof": "redox"
        },
        {
          "name": "Disprop",
          "formula": "same ox+red",
          "proof": "special"
        },
        {
          "name": "E0",
          "formula": "Ecat-Ean",
          "proof": "cell"
        }
      ],
      "summary": [
        "ON method",
        "Half reactions acid/base",
        "n-factor normality",
        "Disprop H2O2",
        "Agents by ON change",
        "MnO4 n-f 5/3/1",
        "Net ionic",
        "Titration KMnO4",
        "Stock notation",
        "ON free=0",
        "F always -1",
        "Peroxide O -1",
        "Hydride H -1",
        "Sum ON=charge",
        "JEE balance"
      ],
      "mindmap": [
        {
          "id": "d",
          "label": "Defs",
          "children": [
            {
              "id": "o",
              "label": "Ox"
            },
            {
              "id": "r",
              "label": "Red"
            }
          ]
        },
        {
          "id": "on",
          "label": "ON",
          "children": [
            {
              "id": "ru",
              "label": "Rules"
            }
          ]
        },
        {
          "id": "b",
          "label": "Balance",
          "children": [
            {
              "id": "h",
              "label": "Half"
            }
          ]
        },
        {
          "id": "n",
          "label": "n-factor",
          "children": [
            {
              "id": "e",
              "label": "Eq"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Redox",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Redox",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "c8": {
      "name": "Organic Chemistry — Basic Principles",
      "central": "GOC",
      "notesHtml": "<h1>📘 Organic Chemistry — Basic Principles</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>IUPAC</b>: prefix-parent-suffix</div><div class=\"formula\"><b>Isomer</b>: struct+stereo</div><div class=\"formula\"><b>Inductive</b>: +/-I</div><div class=\"formula\"><b>Resonance</b>: +/-R</div>",
      "cheatsheet": [
        {
          "name": "IUPAC",
          "formula": "prefix-parent-suffix",
          "proof": "name"
        },
        {
          "name": "Isomer",
          "formula": "struct+stereo",
          "proof": "types"
        },
        {
          "name": "Inductive",
          "formula": "+/-I",
          "proof": "sigma"
        },
        {
          "name": "Resonance",
          "formula": "+/-R",
          "proof": "pi"
        },
        {
          "name": "Hyperconj",
          "formula": "no-bond res",
          "proof": "stab"
        },
        {
          "name": "C+",
          "formula": "3>2>1",
          "proof": "stab"
        },
        {
          "name": "C-",
          "formula": "1>2>3",
          "proof": "stab"
        },
        {
          "name": "Acidity",
          "formula": "stable CB stronger",
          "proof": "trend"
        }
      ],
      "summary": [
        "IUPAC naming",
        "Isomerism types",
        "I R hyperconj",
        "Intermediates",
        "E+/Nu",
        "Homo/hetero cleavage",
        "Acidity orders",
        "R/S E/Z",
        "FG priority",
        "I falls with distance",
        "Conjugation for R",
        "Tautomerism",
        "Chirality",
        "Path by intermediate",
        "JEE GOC"
      ],
      "mindmap": [
        {
          "id": "i",
          "label": "IUPAC",
          "children": [
            {
              "id": "n",
              "label": "Name"
            }
          ]
        },
        {
          "id": "is",
          "label": "Isomer",
          "children": [
            {
              "id": "s",
              "label": "Struct"
            },
            {
              "id": "st",
              "label": "Stereo"
            }
          ]
        },
        {
          "id": "e",
          "label": "Effects",
          "children": [
            {
              "id": "i",
              "label": "+/-I"
            },
            {
              "id": "r",
              "label": "+/-R"
            }
          ]
        },
        {
          "id": "in",
          "label": "Intermed",
          "children": [
            {
              "id": "c",
              "label": "C+"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — GOC",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — GOC",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "c9": {
      "name": "Hydrocarbons",
      "central": "Hydrocarbons",
      "notesHtml": "<h1>📘 Hydrocarbons</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Alkane</b>: CnH2n+2</div><div class=\"formula\"><b>Alkene</b>: CnH2n</div><div class=\"formula\"><b>Alkyne</b>: CnH2n-2</div><div class=\"formula\"><b>Markovnikov</b>: H to more H</div>",
      "cheatsheet": [
        {
          "name": "Alkane",
          "formula": "CnH2n+2",
          "proof": "sat"
        },
        {
          "name": "Alkene",
          "formula": "CnH2n",
          "proof": "C=C"
        },
        {
          "name": "Alkyne",
          "formula": "CnH2n-2",
          "proof": "C#C"
        },
        {
          "name": "Markovnikov",
          "formula": "H to more H",
          "proof": "add"
        },
        {
          "name": "Anti-M",
          "formula": "peroxide HBr",
          "proof": "rad"
        },
        {
          "name": "Benzene",
          "formula": "C6H6 arom",
          "proof": "SEAr"
        },
        {
          "name": "Wurtz",
          "formula": "2RX+2Na->R-R",
          "proof": "coup"
        },
        {
          "name": "Ozonolysis",
          "formula": "cleave C=C",
          "proof": "struct"
        }
      ],
      "summary": [
        "FR halogenation alkanes",
        "EA alkenes",
        "Terminal alkyne acidic",
        "Markovnikov peroxide",
        "Benzene SEAr",
        "o/p vs m directors",
        "Named reactions",
        "Conformations",
        "Geo isomerism",
        "Baeyer test",
        "Polymers",
        "Aromaticity",
        "Friedel-Crafts",
        "Combustion analysis",
        "JEE ozonolysis"
      ],
      "mindmap": [
        {
          "id": "a",
          "label": "Alkanes",
          "children": [
            {
              "id": "fr",
              "label": "FR"
            }
          ]
        },
        {
          "id": "u",
          "label": "Unsat",
          "children": [
            {
              "id": "ad",
              "label": "Add"
            }
          ]
        },
        {
          "id": "ar",
          "label": "Aromatic",
          "children": [
            {
              "id": "se",
              "label": "SEAr"
            }
          ]
        },
        {
          "id": "n",
          "label": "Named",
          "children": [
            {
              "id": "w",
              "label": "Wurtz"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Hydrocarbons",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Hydrocarbons",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "c10": {
      "name": "s-Block Elements",
      "central": "s-Block",
      "notesHtml": "<h1>📘 s-Block Elements</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Alkali</b>: ns1 +1</div><div class=\"formula\"><b>AE</b>: ns2 +2</div><div class=\"formula\"><b>Flame</b>: Na yellow K violet</div><div class=\"formula\"><b>Diag Li-Mg</b>: similar</div>",
      "cheatsheet": [
        {
          "name": "Alkali",
          "formula": "ns1 +1",
          "proof": "G1"
        },
        {
          "name": "AE",
          "formula": "ns2 +2",
          "proof": "G2"
        },
        {
          "name": "Flame",
          "formula": "Na yellow K violet",
          "proof": "ID"
        },
        {
          "name": "Diag Li-Mg",
          "formula": "similar",
          "proof": "per"
        },
        {
          "name": "Li anom",
          "formula": "small high IE",
          "proof": "exc"
        },
        {
          "name": "Be anom",
          "formula": "covalent",
          "proof": "exc"
        },
        {
          "name": "Oxides",
          "formula": "basic per/super",
          "proof": "O"
        },
        {
          "name": "Solvay",
          "formula": "Na2CO3",
          "proof": "ind"
        }
      ],
      "summary": [
        "G1 very reactive",
        "Reactivity G2 vs G1",
        "Diagonal",
        "Anomalous first",
        "NaOH Na2CO3 CaO",
        "Hydration H down group",
        "Reducing char",
        "Bio Na K Ca Mg",
        "Gypsum cement",
        "Carbonate stab G2",
        "Solubility trends",
        "Flame tests",
        "Amphoteric Be",
        "JEE trends compounds",
        "Industrial"
      ],
      "mindmap": [
        {
          "id": "g1",
          "label": "G1",
          "children": [
            {
              "id": "a",
              "label": "Alkali"
            }
          ]
        },
        {
          "id": "g2",
          "label": "G2",
          "children": [
            {
              "id": "ae",
              "label": "AE"
            }
          ]
        },
        {
          "id": "an",
          "label": "Anom",
          "children": [
            {
              "id": "li",
              "label": "Li"
            },
            {
              "id": "be",
              "label": "Be"
            }
          ]
        },
        {
          "id": "c",
          "label": "Compounds",
          "children": [
            {
              "id": "i",
              "label": "Ind"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — s-Block",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — s-Block",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "c11": {
      "name": "p-Block Elements (Group 13 & 14)",
      "central": "p-Block",
      "notesHtml": "<h1>📘 p-Block Elements (Group 13 & 14)</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>G13</b>: ns2 np1</div><div class=\"formula\"><b>G14</b>: ns2 np2</div><div class=\"formula\"><b>Inert pair</b>: lower ON heavy</div><div class=\"formula\"><b>Borax</b>: bead test</div>",
      "cheatsheet": [
        {
          "name": "G13",
          "formula": "ns2 np1",
          "proof": "B Al"
        },
        {
          "name": "G14",
          "formula": "ns2 np2",
          "proof": "C Si"
        },
        {
          "name": "Inert pair",
          "formula": "lower ON heavy",
          "proof": "eff"
        },
        {
          "name": "Borax",
          "formula": "bead test",
          "proof": "anal"
        },
        {
          "name": "Diborane",
          "formula": "B2H6 3c2e",
          "proof": "str"
        },
        {
          "name": "C allotropes",
          "formula": "dia graf full",
          "proof": "forms"
        },
        {
          "name": "Silicones",
          "formula": "R2SiO",
          "proof": "poly"
        },
        {
          "name": "CO/CO2",
          "formula": "oxides",
          "proof": "chem"
        }
      ],
      "summary": [
        "Inert pair",
        "B electron deficient",
        "Banana bonds",
        "Al amphoteric",
        "C catenation max",
        "Silicates silicones",
        "ON +3/+1 +4/+2",
        "BX3 Lewis acid",
        "Allotropes",
        "CO toxic",
        "Sn Pb overview",
        "B-Si diagonal",
        "Hydrolysis",
        "JEE structures",
        "Industrial"
      ],
      "mindmap": [
        {
          "id": "13",
          "label": "G13",
          "children": [
            {
              "id": "b",
              "label": "B"
            },
            {
              "id": "al",
              "label": "Al"
            }
          ]
        },
        {
          "id": "14",
          "label": "G14",
          "children": [
            {
              "id": "c",
              "label": "C"
            },
            {
              "id": "si",
              "label": "Si"
            }
          ]
        },
        {
          "id": "s",
          "label": "Struct",
          "children": [
            {
              "id": "d",
              "label": "B2H6"
            }
          ]
        },
        {
          "id": "a",
          "label": "Allotropes",
          "children": [
            {
              "id": "c",
              "label": "C"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — p-Block",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — p-Block",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "c12": {
      "name": "Hydrogen",
      "central": "Hydrogen",
      "notesHtml": "<h1>📘 Hydrogen</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Isotopes</b>: H D T</div><div class=\"formula\"><b>Prep</b>: Zn+acid etc</div><div class=\"formula\"><b>Hydrides</b>: ionic cov inter</div><div class=\"formula\"><b>Water</b>: H-bond anom</div>",
      "cheatsheet": [
        {
          "name": "Isotopes",
          "formula": "H D T",
          "proof": "iso"
        },
        {
          "name": "Prep",
          "formula": "Zn+acid etc",
          "proof": "lab"
        },
        {
          "name": "Hydrides",
          "formula": "ionic cov inter",
          "proof": "types"
        },
        {
          "name": "Water",
          "formula": "H-bond anom",
          "proof": "prop"
        },
        {
          "name": "H2O2",
          "formula": "ox and red",
          "proof": "perox"
        },
        {
          "name": "Hard water",
          "formula": "Ca Mg",
          "proof": "types"
        },
        {
          "name": "D2O",
          "formula": "heavy water",
          "proof": "use"
        },
        {
          "name": "Fuel",
          "formula": "H2 energy",
          "proof": "fut"
        }
      ],
      "summary": [
        "3 isotopes",
        "Hydride types",
        "Water H-bonding",
        "H2O2 open book",
        "Temp vs perm hardness",
        "Softening",
        "JEE H2O2 hardness",
        "Industrial H2",
        "Amphoteric water",
        "Kw",
        "Nuclear moderator",
        "H economy",
        "Ionic s-block hydrides",
        "Interstitial non-stoich",
        "Isotope props"
      ],
      "mindmap": [
        {
          "id": "i",
          "label": "Isotopes",
          "children": [
            {
              "id": "h",
              "label": "HDT"
            }
          ]
        },
        {
          "id": "h",
          "label": "Hydrides",
          "children": [
            {
              "id": "t",
              "label": "Types"
            }
          ]
        },
        {
          "id": "w",
          "label": "Water",
          "children": [
            {
              "id": "ha",
              "label": "Hard"
            }
          ]
        },
        {
          "id": "p",
          "label": "H2O2",
          "children": [
            {
              "id": "r",
              "label": "Redox"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Hydrogen",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Hydrogen",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "c13": {
      "name": "Environmental Chemistry",
      "central": "Environment",
      "notesHtml": "<h1>📘 Environmental Chemistry</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Air pol</b>: CO NOx SOx SPM</div><div class=\"formula\"><b>GHG</b>: CO2 CH4 N2O O3</div><div class=\"formula\"><b>Ozone</b>: CFC depletion</div><div class=\"formula\"><b>Acid rain</b>: pH<5.6</div>",
      "cheatsheet": [
        {
          "name": "Air pol",
          "formula": "CO NOx SOx SPM",
          "proof": "pol"
        },
        {
          "name": "GHG",
          "formula": "CO2 CH4 N2O O3",
          "proof": "warm"
        },
        {
          "name": "Ozone",
          "formula": "CFC depletion",
          "proof": "strat"
        },
        {
          "name": "Acid rain",
          "formula": "pH<5.6",
          "proof": "SOx NOx"
        },
        {
          "name": "Smog",
          "formula": "class+photo",
          "proof": "types"
        },
        {
          "name": "BOD/COD",
          "formula": "O2 demand",
          "proof": "water"
        },
        {
          "name": "Eutroph",
          "formula": "nutrient overload",
          "proof": "lakes"
        },
        {
          "name": "Green chem",
          "formula": "prevent waste",
          "proof": "12"
        }
      ],
      "summary": [
        "Air pollutants sources",
        "GHG vs ozone good",
        "CFC Cl radicals",
        "Acid rain",
        "BOD biodegradable",
        "COD chemical",
        "Eutrophication N/P",
        "Green chem principles",
        "NCERT factual JEE",
        "PM2.5/10",
        "Catalytic converters",
        "Water treatment",
        "Soil pesticides",
        "Control strategies",
        "Montreal protocol"
      ],
      "mindmap": [
        {
          "id": "a",
          "label": "Air",
          "children": [
            {
              "id": "p",
              "label": "Pol"
            }
          ]
        },
        {
          "id": "o",
          "label": "Ozone",
          "children": [
            {
              "id": "d",
              "label": "Dep"
            }
          ]
        },
        {
          "id": "w",
          "label": "Water",
          "children": [
            {
              "id": "b",
              "label": "BOD"
            }
          ]
        },
        {
          "id": "g",
          "label": "Green",
          "children": [
            {
              "id": "p",
              "label": "Princ"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Environment",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Environment",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    }
  },
  "maths": {
    "m1": {
      "name": "Sets",
      "central": "Sets",
      "notesHtml": "<h1>📘 Sets</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Union</b>: A u B</div><div class=\"formula\"><b>Intersect</b>: A n B</div><div class=\"formula\"><b>Complement</b>: A'=U-A</div><div class=\"formula\"><b>De Morgan</b>: (AuB)'=A'nB'</div>",
      "cheatsheet": [
        {
          "name": "Union",
          "formula": "A u B",
          "proof": "or"
        },
        {
          "name": "Intersect",
          "formula": "A n B",
          "proof": "and"
        },
        {
          "name": "Complement",
          "formula": "A'=U-A",
          "proof": "not"
        },
        {
          "name": "De Morgan",
          "formula": "(AuB)'=A'nB'",
          "proof": "laws"
        },
        {
          "name": "n(AuB)",
          "formula": "nA+nB-nAB",
          "proof": "count"
        },
        {
          "name": "Power",
          "formula": "|P(A)|=2^n",
          "proof": "sub"
        },
        {
          "name": "Cartesian",
          "formula": "A x B pairs",
          "proof": "ord"
        },
        {
          "name": "Subset",
          "formula": "A subset B",
          "proof": "all in"
        }
      ],
      "summary": [
        "Roster set-builder",
        "Ops u n -",
        "Venn 2-3",
        "De Morgan",
        "Inclusion-exclusion",
        "2^n power set",
        "Cartesian",
        "JEE n(AuBuC)",
        "Disjoint",
        "Universal set",
        "Equal vs equiv",
        "Finite infinite",
        "Intervals",
        "Number systems",
        "Element proofs"
      ],
      "mindmap": [
        {
          "id": "o",
          "label": "Ops",
          "children": [
            {
              "id": "u",
              "label": "u"
            },
            {
              "id": "i",
              "label": "n"
            }
          ]
        },
        {
          "id": "l",
          "label": "Laws",
          "children": [
            {
              "id": "d",
              "label": "DeM"
            }
          ]
        },
        {
          "id": "c",
          "label": "Count",
          "children": [
            {
              "id": "n",
              "label": "nu"
            }
          ]
        },
        {
          "id": "p",
          "label": "Power",
          "children": [
            {
              "id": "p2",
              "label": "P(A)"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Sets",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Sets",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "m2": {
      "name": "Relations & Functions",
      "central": "Relations",
      "notesHtml": "<h1>📘 Relations & Functions</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Relation</b>: R subset AxB</div><div class=\"formula\"><b>Refl</b>: aRa</div><div class=\"formula\"><b>Sym</b>: aRb=>bRa</div><div class=\"formula\"><b>Trans</b>: aRb bRc=>aRc</div>",
      "cheatsheet": [
        {
          "name": "Relation",
          "formula": "R subset AxB",
          "proof": "pairs"
        },
        {
          "name": "Refl",
          "formula": "aRa",
          "proof": "prop"
        },
        {
          "name": "Sym",
          "formula": "aRb=>bRa",
          "proof": "prop"
        },
        {
          "name": "Trans",
          "formula": "aRb bRc=>aRc",
          "proof": "prop"
        },
        {
          "name": "Equiv",
          "formula": "R+S+T",
          "proof": "part"
        },
        {
          "name": "Function",
          "formula": "unique y",
          "proof": "map"
        },
        {
          "name": "1-1 onto",
          "formula": "inj surj",
          "proof": "types"
        },
        {
          "name": "Compose",
          "formula": "g o f",
          "proof": "comb"
        }
      ],
      "summary": [
        "R as subset AxB",
        "Equiv partitions",
        "Domain range",
        "Bijective inverse",
        "Composition",
        "2^(mn) relations",
        "#functions",
        "Even odd",
        "Piecewise",
        "JEE check equiv",
        "Identity const",
        "Real graphs",
        "Binary ops later",
        "Domain restrict",
        "Ordered pairs"
      ],
      "mindmap": [
        {
          "id": "r",
          "label": "Rel",
          "children": [
            {
              "id": "rst",
              "label": "RST"
            }
          ]
        },
        {
          "id": "e",
          "label": "Equiv",
          "children": [
            {
              "id": "p",
              "label": "Part"
            }
          ]
        },
        {
          "id": "f",
          "label": "Fn",
          "children": [
            {
              "id": "t",
              "label": "1-1 onto"
            }
          ]
        },
        {
          "id": "c",
          "label": "Compose",
          "children": [
            {
              "id": "i",
              "label": "Inv"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Relations",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Relations",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "m3": {
      "name": "Trigonometric Functions",
      "central": "Trigonometry",
      "notesHtml": "<h1>📘 Trigonometric Functions</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Pyth</b>: sin^2+cos^2=1</div><div class=\"formula\"><b>sin(A+/-B)</b>: sinA cosB +/- cosA sinB</div><div class=\"formula\"><b>cos(A+/-B)</b>: cosA cosB -/+ sinA sinB</div><div class=\"formula\"><b>tan(A+/-B)</b>: (tA+/-tB)/(1-/+tAtB)</div>",
      "cheatsheet": [
        {
          "name": "Pyth",
          "formula": "sin^2+cos^2=1",
          "proof": "id"
        },
        {
          "name": "sin(A+/-B)",
          "formula": "sinA cosB +/- cosA sinB",
          "proof": "comp"
        },
        {
          "name": "cos(A+/-B)",
          "formula": "cosA cosB -/+ sinA sinB",
          "proof": "comp"
        },
        {
          "name": "tan(A+/-B)",
          "formula": "(tA+/-tB)/(1-/+tAtB)",
          "proof": "comp"
        },
        {
          "name": "Product",
          "formula": "2sinA cosB=sin sum",
          "proof": "prod"
        },
        {
          "name": "sin2A",
          "formula": "2sin cos",
          "proof": "dbl"
        },
        {
          "name": "cos2A",
          "formula": "c^2-s^2=2c^2-1",
          "proof": "dbl"
        },
        {
          "name": "Gen sol",
          "formula": "sin th=sin a forms",
          "proof": "eq"
        }
      ],
      "summary": [
        "Fundamental id",
        "Compound angles",
        "Double half",
        "Product-sum",
        "General solutions",
        "Graphs periods",
        "a sin+b cos max",
        "Range expr",
        "ASTC signs",
        "Related angles",
        "sin/cos/tan gen sol",
        "R-method",
        "JEE equations",
        "Inverse intro",
        "Practice identities"
      ],
      "mindmap": [
        {
          "id": "i",
          "label": "Id",
          "children": [
            {
              "id": "p",
              "label": "Pyth"
            }
          ]
        },
        {
          "id": "c",
          "label": "Compound",
          "children": [
            {
              "id": "ab",
              "label": "A+/-B"
            }
          ]
        },
        {
          "id": "d",
          "label": "Double",
          "children": [
            {
              "id": "2",
              "label": "2A"
            }
          ]
        },
        {
          "id": "e",
          "label": "Eq",
          "children": [
            {
              "id": "g",
              "label": "Gen"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Trigonometry",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Trigonometry",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "m4": {
      "name": "Principle of Mathematical Induction",
      "central": "PMI",
      "notesHtml": "<h1>📘 Principle of Mathematical Induction</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>P(n)</b>: proposition</div><div class=\"formula\"><b>Base</b>: P(n0)</div><div class=\"formula\"><b>IH</b>: assume P(k)</div><div class=\"formula\"><b>Step</b>: prove P(k+1)</div>",
      "cheatsheet": [
        {
          "name": "P(n)",
          "formula": "proposition",
          "proof": "setup"
        },
        {
          "name": "Base",
          "formula": "P(n0)",
          "proof": "start"
        },
        {
          "name": "IH",
          "formula": "assume P(k)",
          "proof": "hyp"
        },
        {
          "name": "Step",
          "formula": "prove P(k+1)",
          "proof": "ind"
        },
        {
          "name": "Conc",
          "formula": "for all n>=n0",
          "proof": "done"
        },
        {
          "name": "sum k",
          "formula": "n(n+1)/2",
          "proof": "sum"
        },
        {
          "name": "Ineq PMI",
          "formula": "prove >=",
          "proof": "use"
        },
        {
          "name": "Divis",
          "formula": "n^3-n by 6",
          "proof": "use"
        }
      ],
      "summary": [
        "Base+step required",
        "Sums ineq divis",
        "Strong induction",
        "Careful algebra",
        "Write P(n) clear",
        "No circular",
        "Base may be 0/2",
        "Factor smart",
        "Equality vs ineq",
        "Geometric series",
        "Fibonacci",
        "Avoid assume result",
        "JEE PMI",
        "Pattern first",
        "Practice"
      ],
      "mindmap": [
        {
          "id": "s",
          "label": "Steps",
          "children": [
            {
              "id": "b",
              "label": "Base"
            },
            {
              "id": "i",
              "label": "Ind"
            }
          ]
        },
        {
          "id": "a",
          "label": "Apps",
          "children": [
            {
              "id": "su",
              "label": "Sums"
            },
            {
              "id": "d",
              "label": "Div"
            }
          ]
        },
        {
          "id": "in",
          "label": "Ineq",
          "children": [
            {
              "id": "p",
              "label": "Prove"
            }
          ]
        },
        {
          "id": "t",
          "label": "Tips",
          "children": [
            {
              "id": "al",
              "label": "Alg"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — PMI",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — PMI",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "m5": {
      "name": "Complex Numbers & Quadratic Equations",
      "central": "Complex",
      "notesHtml": "<h1>📘 Complex Numbers & Quadratic Equations</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>i</b>: i^2=-1</div><div class=\"formula\"><b>Mod</b>: |z|=sqrt(x^2+y^2)</div><div class=\"formula\"><b>Arg</b>: tan^-1(y/x)</div><div class=\"formula\"><b>Polar</b>: r(cos+isin)</div>",
      "cheatsheet": [
        {
          "name": "i",
          "formula": "i^2=-1",
          "proof": "def"
        },
        {
          "name": "Mod",
          "formula": "|z|=sqrt(x^2+y^2)",
          "proof": "mag"
        },
        {
          "name": "Arg",
          "formula": "tan^-1(y/x)",
          "proof": "ang"
        },
        {
          "name": "Polar",
          "formula": "r(cos+isin)",
          "proof": "form"
        },
        {
          "name": "Euler",
          "formula": "e^(i th)",
          "proof": "form"
        },
        {
          "name": "Conj",
          "formula": "z zbar=|z|^2",
          "proof": "conj"
        },
        {
          "name": "De Moivre",
          "formula": "(cis)^n=cis n",
          "proof": "pow"
        },
        {
          "name": "Quadratic",
          "formula": "(-b+/-sqrt d)/2a",
          "proof": "roots"
        }
      ],
      "summary": [
        "Argand plane",
        "|z| mult arg add",
        "De Moivre roots",
        "Roots of unity",
        "Quadratic d",
        "Locus |z-z1|",
        "Triangle ineq",
        "Conj roots real coeff",
        "1 w w^2",
        "Rotation e^(i th)",
        "Sum product roots",
        "JEE locus arg",
        "Section formula",
        "Cube roots",
        "Practice polar"
      ],
      "mindmap": [
        {
          "id": "a",
          "label": "Alg",
          "children": [
            {
              "id": "o",
              "label": "Ops"
            }
          ]
        },
        {
          "id": "p",
          "label": "Polar",
          "children": [
            {
              "id": "r",
              "label": "r th"
            }
          ]
        },
        {
          "id": "d",
          "label": "DeM",
          "children": [
            {
              "id": "n",
              "label": "nth"
            }
          ]
        },
        {
          "id": "q",
          "label": "Quad",
          "children": [
            {
              "id": "d",
              "label": "d"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Complex",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Complex",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "m6": {
      "name": "Linear Inequalities",
      "central": "Inequalities",
      "notesHtml": "<h1>📘 Linear Inequalities</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Add</b>: a>b=>a+c>b+c</div><div class=\"formula\"><b>Mul</b>: neg flips</div><div class=\"formula\"><b>Interval</b>: sol intervals</div><div class=\"formula\"><b>1D graph</b>: number line</div>",
      "cheatsheet": [
        {
          "name": "Add",
          "formula": "a>b=>a+c>b+c",
          "proof": "rule"
        },
        {
          "name": "Mul",
          "formula": "neg flips",
          "proof": "sign"
        },
        {
          "name": "Interval",
          "formula": "sol intervals",
          "proof": "not"
        },
        {
          "name": "1D graph",
          "formula": "number line",
          "proof": "vis"
        },
        {
          "name": "2 var",
          "formula": "half planes",
          "proof": "graph"
        },
        {
          "name": "System",
          "formula": "intersect regions",
          "proof": "feas"
        },
        {
          "name": "Abs",
          "formula": "|x|<a => -a<x<a",
          "proof": "mod"
        },
        {
          "name": "Quad ineq",
          "formula": "sign chart",
          "proof": "meth"
        }
      ],
      "summary": [
        "Neg multiply flips",
        "Interval notation",
        "Half-planes 2D",
        "Overlap systems",
        "Abs cases",
        "Sign scheme quad",
        "No divide var blind",
        "Strict dashed",
        "LPP vertices later",
        "Transitivity",
        "Same direction add",
        "Reciprocal care",
        "JEE word",
        "Number line practice",
        "Compound ineq"
      ],
      "mindmap": [
        {
          "id": "r",
          "label": "Rules",
          "children": [
            {
              "id": "f",
              "label": "Flip"
            }
          ]
        },
        {
          "id": "1",
          "label": "1D",
          "children": [
            {
              "id": "i",
              "label": "Int"
            }
          ]
        },
        {
          "id": "2",
          "label": "2D",
          "children": [
            {
              "id": "h",
              "label": "Half"
            }
          ]
        },
        {
          "id": "a",
          "label": "Abs",
          "children": [
            {
              "id": "m",
              "label": "|x|"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Inequalities",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Inequalities",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "m7": {
      "name": "Permutations & Combinations",
      "central": "PnC",
      "notesHtml": "<h1>📘 Permutations & Combinations</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>nPr</b>: n!/(n-r)!</div><div class=\"formula\"><b>nCr</b>: n!/(r!(n-r)!)</div><div class=\"formula\"><b>Link</b>: P=C*r!</div><div class=\"formula\"><b>Circular</b>: (n-1)!</div>",
      "cheatsheet": [
        {
          "name": "nPr",
          "formula": "n!/(n-r)!",
          "proof": "arr"
        },
        {
          "name": "nCr",
          "formula": "n!/(r!(n-r)!)",
          "proof": "sel"
        },
        {
          "name": "Link",
          "formula": "P=C*r!",
          "proof": "rel"
        },
        {
          "name": "Circular",
          "formula": "(n-1)!",
          "proof": "circ"
        },
        {
          "name": "Identical",
          "formula": "n!/n1!n2!",
          "proof": "rep"
        },
        {
          "name": "Binom",
          "formula": "C coeffs",
          "proof": "exp"
        },
        {
          "name": "Restrict",
          "formula": "cases",
          "proof": "count"
        },
        {
          "name": "Gap",
          "formula": "place restricted",
          "proof": "tech"
        }
      ],
      "summary": [
        "Order matters P not C",
        "Circular (n-1)!",
        "Identical objects",
        "Restrictions casework",
        "C(n,r)=C(n,n-r)",
        "Pascal id",
        "Multinomial",
        "Geometry combos",
        "Complement count",
        "Stars bars intro",
        "Labeled groups",
        "JEE word",
        "Handshakes",
        "Derange intro",
        "Practice cases"
      ],
      "mindmap": [
        {
          "id": "p",
          "label": "Perm",
          "children": [
            {
              "id": "npr",
              "label": "nPr"
            }
          ]
        },
        {
          "id": "c",
          "label": "Comb",
          "children": [
            {
              "id": "ncr",
              "label": "nCr"
            }
          ]
        },
        {
          "id": "ci",
          "label": "Circ",
          "children": [
            {
              "id": "n",
              "label": "(n-1)!"
            }
          ]
        },
        {
          "id": "t",
          "label": "Tech",
          "children": [
            {
              "id": "g",
              "label": "Gap"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — PnC",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — PnC",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "m8": {
      "name": "Binomial Theorem",
      "central": "Binomial",
      "notesHtml": "<h1>📘 Binomial Theorem</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Expand</b>: sum C a^(n-r)b^r</div><div class=\"formula\"><b>T(r+1)</b>: C(n,r)a^(n-r)b^r</div><div class=\"formula\"><b>Middle</b>: n even/odd</div><div class=\"formula\"><b>Indep</b>: power 0 term</div>",
      "cheatsheet": [
        {
          "name": "Expand",
          "formula": "sum C a^(n-r)b^r",
          "proof": "thm"
        },
        {
          "name": "T(r+1)",
          "formula": "C(n,r)a^(n-r)b^r",
          "proof": "gen"
        },
        {
          "name": "Middle",
          "formula": "n even/odd",
          "proof": "pos"
        },
        {
          "name": "Indep",
          "formula": "power 0 term",
          "proof": "find"
        },
        {
          "name": "(1+x)^n",
          "formula": "sum C x^r",
          "proof": "spec"
        },
        {
          "name": "Approx",
          "formula": "1+nx |x|<<1",
          "proof": "app"
        },
        {
          "name": "Sum C",
          "formula": "2^n",
          "proof": "prop"
        },
        {
          "name": "Multi",
          "formula": "(a+b+c)^n",
          "proof": "ext"
        }
      ],
      "summary": [
        "Integer n expand",
        "General term",
        "Middle terms",
        "Coeff of x^k",
        "Sum coeffs 2^n",
        "Indep of x",
        "Pascal",
        "Greatest term",
        "Approx",
        "(1-1)^n=0",
        "Replace a b",
        "JEE term hunt",
        "Induction proof opt",
        "Practice powers",
        "Rational n later"
      ],
      "mindmap": [
        {
          "id": "e",
          "label": "Exp",
          "children": [
            {
              "id": "g",
              "label": "Gen"
            }
          ]
        },
        {
          "id": "m",
          "label": "Middle",
          "children": [
            {
              "id": "t",
              "label": "T"
            }
          ]
        },
        {
          "id": "c",
          "label": "Coeff",
          "children": [
            {
              "id": "s",
              "label": "2^n"
            }
          ]
        },
        {
          "id": "a",
          "label": "App",
          "children": [
            {
              "id": "i",
              "label": "Indep"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Binomial",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Binomial",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "m9": {
      "name": "Sequences & Series",
      "central": "Sequences",
      "notesHtml": "<h1>📘 Sequences & Series</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>AP n</b>: a+(n-1)d</div><div class=\"formula\"><b>AP S</b>: n/2[2a+(n-1)d]</div><div class=\"formula\"><b>GP n</b>: ar^(n-1)</div><div class=\"formula\"><b>GP S</b>: a(r^n-1)/(r-1)</div>",
      "cheatsheet": [
        {
          "name": "AP n",
          "formula": "a+(n-1)d",
          "proof": "AP"
        },
        {
          "name": "AP S",
          "formula": "n/2[2a+(n-1)d]",
          "proof": "sum"
        },
        {
          "name": "GP n",
          "formula": "ar^(n-1)",
          "proof": "GP"
        },
        {
          "name": "GP S",
          "formula": "a(r^n-1)/(r-1)",
          "proof": "sum"
        },
        {
          "name": "Inf GP",
          "formula": "a/(1-r) |r|<1",
          "proof": "conv"
        },
        {
          "name": "AM-GM",
          "formula": "AM>=GM",
          "proof": "ineq"
        },
        {
          "name": "HP",
          "formula": "1/AP",
          "proof": "harm"
        },
        {
          "name": "sum n^2",
          "formula": "n(n+1)(2n+1)/6",
          "proof": "sum"
        }
      ],
      "summary": [
        "AP d GP r",
        "Sum formulas",
        "Inf |r|<1",
        "AM>=GM>=HM",
        "sum n n^2 n^3",
        "AG series",
        "Insert means",
        "Method differences",
        "Telescoping",
        "r=1 edge",
        "JEE mixed",
        "Growth models",
        "Convergence basic",
        "Word interest",
        "Practice"
      ],
      "mindmap": [
        {
          "id": "ap",
          "label": "AP",
          "children": [
            {
              "id": "a",
              "label": "an"
            },
            {
              "id": "s",
              "label": "Sn"
            }
          ]
        },
        {
          "id": "gp",
          "label": "GP",
          "children": [
            {
              "id": "i",
              "label": "Inf"
            }
          ]
        },
        {
          "id": "m",
          "label": "Means",
          "children": [
            {
              "id": "ag",
              "label": "AMGM"
            }
          ]
        },
        {
          "id": "sp",
          "label": "Special",
          "children": [
            {
              "id": "sk",
              "label": "sum k^p"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Sequences",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Sequences",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "m10": {
      "name": "Straight Lines",
      "central": "Straight Lines",
      "notesHtml": "<h1>📘 Straight Lines</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Slope</b>: m=tan th</div><div class=\"formula\"><b>Pt-slope</b>: y-y1=m(x-x1)</div><div class=\"formula\"><b>Two-pt</b>: ratio form</div><div class=\"formula\"><b>Slope-int</b>: y=mx+c</div>",
      "cheatsheet": [
        {
          "name": "Slope",
          "formula": "m=tan th",
          "proof": "sl"
        },
        {
          "name": "Pt-slope",
          "formula": "y-y1=m(x-x1)",
          "proof": "form"
        },
        {
          "name": "Two-pt",
          "formula": "ratio form",
          "proof": "form"
        },
        {
          "name": "Slope-int",
          "formula": "y=mx+c",
          "proof": "form"
        },
        {
          "name": "Intercept",
          "formula": "x/a+y/b=1",
          "proof": "form"
        },
        {
          "name": "Normal",
          "formula": "x cos w + y sin w = p",
          "proof": "form"
        },
        {
          "name": "Dist pt",
          "formula": "|ax+by+c|/sqrt(a^2+b^2)",
          "proof": "d"
        },
        {
          "name": "Angle",
          "formula": "tan th=|(m1-m2)/(1+m1m2)|",
          "proof": "ang"
        }
      ],
      "summary": [
        "Many line forms",
        "parallel m same perp product -1",
        "Point-line distance",
        "Parallel distance",
        "Angle between",
        "Family through intersect",
        "Section formula",
        "Image in line",
        "Area triangle",
        "ax+by+c=0",
        "JEE locus concurrent",
        "Shift origin",
        "Pair of lines intro",
        "Reflection",
        "Practice forms"
      ],
      "mindmap": [
        {
          "id": "f",
          "label": "Forms",
          "children": [
            {
              "id": "m",
              "label": "Slope"
            }
          ]
        },
        {
          "id": "d",
          "label": "Dist",
          "children": [
            {
              "id": "p",
              "label": "Pt-line"
            }
          ]
        },
        {
          "id": "a",
          "label": "Angles",
          "children": [
            {
              "id": "pp",
              "label": "par perp"
            }
          ]
        },
        {
          "id": "fa",
          "label": "Family",
          "children": [
            {
              "id": "i",
              "label": "Inter"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Straight Lines",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Straight Lines",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "m11": {
      "name": "Conic Sections",
      "central": "Conics",
      "notesHtml": "<h1>📘 Conic Sections</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Circle</b>: (x-h)^2+(y-k)^2=r^2</div><div class=\"formula\"><b>Parabola</b>: y^2=4ax</div><div class=\"formula\"><b>Ellipse</b>: x^2/a^2+y^2/b^2=1</div><div class=\"formula\"><b>Hyperbola</b>: x^2/a^2-y^2/b^2=1</div>",
      "cheatsheet": [
        {
          "name": "Circle",
          "formula": "(x-h)^2+(y-k)^2=r^2",
          "proof": "circ"
        },
        {
          "name": "Parabola",
          "formula": "y^2=4ax",
          "proof": "foc a"
        },
        {
          "name": "Ellipse",
          "formula": "x^2/a^2+y^2/b^2=1",
          "proof": "a>b"
        },
        {
          "name": "Hyperbola",
          "formula": "x^2/a^2-y^2/b^2=1",
          "proof": "br"
        },
        {
          "name": "e",
          "formula": "par1 ell<1 hyp>1",
          "proof": "ecc"
        },
        {
          "name": "Def",
          "formula": "PF=e PM",
          "proof": "fd"
        },
        {
          "name": "Param",
          "formula": "(r cos,r sin)",
          "proof": "par"
        },
        {
          "name": "Tang par",
          "formula": "yy1=2a(x+x1)",
          "proof": "tan"
        }
      ],
      "summary": [
        "Plane-cone conics",
        "Standard eqns",
        "Focus-directrix e",
        "e values",
        "Circle e=0",
        "Tangents normals",
        "Parametric high yield",
        "Director aux circles",
        "Asymptotes hyp",
        "xy=c^2",
        "Tangency condition",
        "Latus rectum",
        "Shift complete square",
        "Memorize e",
        "JEE conics heavy"
      ],
      "mindmap": [
        {
          "id": "c",
          "label": "Circle",
          "children": [
            {
              "id": "e",
              "label": "Eq"
            }
          ]
        },
        {
          "id": "p",
          "label": "Parabola",
          "children": [
            {
              "id": "f",
              "label": "Focus"
            }
          ]
        },
        {
          "id": "e",
          "label": "Ellipse",
          "children": [
            {
              "id": "ec",
              "label": "e<1"
            }
          ]
        },
        {
          "id": "h",
          "label": "Hyperbola",
          "children": [
            {
              "id": "a",
              "label": "Asy"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Conics",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Conics",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "m12": {
      "name": "Limits & Derivatives",
      "central": "Calculus Intro",
      "notesHtml": "<h1>📘 Limits & Derivatives</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Limit</b>: lim f=L</div><div class=\"formula\"><b>std</b>: sinx/x->1</div><div class=\"formula\"><b>Laws</b>: lim f+/-g</div><div class=\"formula\"><b>Deriv</b>: f'=lim [f(x+h)-f(x)]/h</div>",
      "cheatsheet": [
        {
          "name": "Limit",
          "formula": "lim f=L",
          "proof": "def"
        },
        {
          "name": "std",
          "formula": "sinx/x->1",
          "proof": "std"
        },
        {
          "name": "Laws",
          "formula": "lim f+/-g",
          "proof": "alg"
        },
        {
          "name": "Deriv",
          "formula": "f'=lim [f(x+h)-f(x)]/h",
          "proof": "def"
        },
        {
          "name": "Power",
          "formula": "n x^(n-1)",
          "proof": "rule"
        },
        {
          "name": "Product",
          "formula": "u'v+uv'",
          "proof": "rule"
        },
        {
          "name": "Quotient",
          "formula": "(u'v-uv')/v^2",
          "proof": "rule"
        },
        {
          "name": "Chain",
          "formula": "dy/du * du/dx",
          "proof": "rule"
        }
      ],
      "summary": [
        "Limits approach",
        "Standard limits",
        "L'Hopital intro",
        "Continuity lim=f(a)",
        "Derivative slope",
        "Diff rules",
        "First principle",
        "L/R limits",
        "inf limits",
        "Diff=>cont not converse",
        "Trig deriv",
        "Higher order",
        "Tangent normal",
        "Rates intro",
        "Simplify indeterminate"
      ],
      "mindmap": [
        {
          "id": "l",
          "label": "Limits",
          "children": [
            {
              "id": "s",
              "label": "Std"
            }
          ]
        },
        {
          "id": "c",
          "label": "Cont",
          "children": [
            {
              "id": "d",
              "label": "def"
            }
          ]
        },
        {
          "id": "d",
          "label": "Deriv",
          "children": [
            {
              "id": "r",
              "label": "Rules"
            }
          ]
        },
        {
          "id": "a",
          "label": "Apps",
          "children": [
            {
              "id": "t",
              "label": "Tan"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Calculus Intro",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Calculus Intro",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    },
    "m13": {
      "name": "Statistics & Probability",
      "central": "Stats & Prob",
      "notesHtml": "<h1>📘 Statistics & Probability</h1><p>📝 Detailed notes for this chapter. Use the Cheat Sheet, Summary, and Best Video tabs to study effectively.</p><h2>Quick Start</h2><ol><li>Watch the Best Video</li><li>Read NCERT (link in Resources)</li><li>Review Cheat Sheet</li><li>Read Summary</li><li>Practice PYQs</li><li>Check Topper Notes</li></ol><h2>Key Formulas</h2><div class=\"formula\"><b>Mean</b>: sum x/n</div><div class=\"formula\"><b>Median</b>: middle</div><div class=\"formula\"><b>Mode</b>: most freq</div><div class=\"formula\"><b>Var</b>: sum(x-mean)^2/n</div>",
      "cheatsheet": [
        {
          "name": "Mean",
          "formula": "sum x/n",
          "proof": "avg"
        },
        {
          "name": "Median",
          "formula": "middle",
          "proof": "cent"
        },
        {
          "name": "Mode",
          "formula": "most freq",
          "proof": "cent"
        },
        {
          "name": "Var",
          "formula": "sum(x-mean)^2/n",
          "proof": "spread"
        },
        {
          "name": "SD",
          "formula": "sqrt var",
          "proof": "spread"
        },
        {
          "name": "P(A)",
          "formula": "nA/nS",
          "proof": "class"
        },
        {
          "name": "Add",
          "formula": "P(u)=P+P-P(n)",
          "proof": "or"
        },
        {
          "name": "Cond",
          "formula": "P(A|B)=P(n)/P(B)",
          "proof": "given"
        }
      ],
      "summary": [
        "Central tendency",
        "Var SD",
        "Frequency dist",
        "Classical prob",
        "Add mult rules",
        "Independent product",
        "Conditional Bayes intro",
        "Cards dice balls",
        "Complement 1-P",
        "Mut excl vs indep",
        "Grouped mean",
        "CV",
        "Range",
        "Sample space",
        "Tree diagrams"
      ],
      "mindmap": [
        {
          "id": "s",
          "label": "Stats",
          "children": [
            {
              "id": "m",
              "label": "Mean"
            },
            {
              "id": "sd",
              "label": "SD"
            }
          ]
        },
        {
          "id": "p",
          "label": "Prob",
          "children": [
            {
              "id": "b",
              "label": "P(A)"
            }
          ]
        },
        {
          "id": "r",
          "label": "Rules",
          "children": [
            {
              "id": "a",
              "label": "Add"
            },
            {
              "id": "c",
              "label": "Cond"
            }
          ]
        },
        {
          "id": "i",
          "label": "Indep",
          "children": [
            {
              "id": "pr",
              "label": "Prod"
            }
          ]
        }
      ],
      "topperNotes": [
        {
          "name": "PW Topper Notes — Stats & Prob",
          "url": "https://www.pw.live/toppers-notes",
          "icon": "🏆"
        },
        {
          "name": "Allen Formula Card",
          "url": "https://www.pw.live/study-material",
          "icon": "📋"
        },
        {
          "name": "JEE AITS Solutions — Stats & Prob",
          "url": "https://www.examside.com/exam/jee-main",
          "icon": "🎯"
        }
      ]
    }
  }
};

window.STUDY_CONTENT = STUDY_CONTENT;
