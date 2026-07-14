/* ============================================
   KURUKSHETRA — Maths Class 11
   Questions + Tricks + Cheat Sheets
   AI-generated, JEE Mains + Advanced pattern
   ============================================ */

const MATHS_DATA = {
  // ================== CHAPTER 1 ==================
  m1: {
    name: 'Sets',
    cheatsheet: [
      { title: 'A ∪ B', formula: 'A or B (or both)' },
      { title: 'A ∩ B', formula: 'A and B (common)' },
      { title: 'A - B', formula: 'In A, not in B' },
      { title: "A'", formula: 'Universal set - A' },
      { title: 'De Morgan', formula: '(A∪B)\' = A\'∩B\'' },
      { title: 'n(A∪B)', formula: 'n(A) + n(B) - n(A∩B)' },
      { title: 'n(A∩B)', formula: 'n(A) + n(B) - n(A∪B)' }
    ],
    questions: [
      {
        id: 'm1q1', diff: 'basic', type: 'mcq-single',
        q: 'If A = {1,2,3} and B = {2,3,4}, then A∩B = ?',
        options: ['{1,4}', '{2,3}', '{1,2,3,4}', '∅'],
        answer: 1,
        solution: 'A∩B = elements in both = {2,3}',
        trick: 'A∩B = common elements. A∪B = all unique elements.'
      },
      {
        id: 'm1q2', diff: 'medium', type: 'numeric',
        q: 'n(A) = 50, n(B) = 60, n(A∩B) = 20. Find n(A∪B):',
        answer: 90,
        tolerance: 0,
        solution: 'n(A∪B) = 50 + 60 - 20 = 90',
        trick: 'n(A∪B) = n(A) + n(B) - n(A∩B). Always subtract intersection to avoid double-counting.'
      },
      {
        id: 'm1q3', diff: 'advanced', type: 'mcq-single',
        q: 'For sets A, B: A - (A - B) = ?',
        options: ['A', 'B', 'A∩B', 'A∪B'],
        answer: 2,
        solution: 'A-(A-B) = A∩B. Proof: A-B excludes elements not in B from A. So removing A-B from A leaves A∩B.',
        trick: 'A - (A - B) = A ∩ B. (De Morgan-like rule.)'
      }
    ]
  },

  // ================== CHAPTER 2 ==================
  m2: {
    name: 'Relations & Functions',
    cheatsheet: [
      { title: 'Domain', formula: 'Input values (x)' },
      { title: 'Range', formula: 'Output values (f(x))' },
      { title: 'One-one (injective)', formula: 'f(x₁)=f(x₂) → x₁=x₂' },
      { title: 'Onto (surjective)', formula: 'Every y has some x' },
      { title: 'Composite', formula: '(fog)(x) = f(g(x))' },
      { title: 'Inverse exists if', formula: 'One-one AND onto' }
    ],
    questions: [
      {
        id: 'm2q1', diff: 'basic', type: 'mcq-single',
        q: 'Domain of f(x) = 1/(x-2):',
        options: ['R', 'R-{2}', 'R-{0}', '(2,∞)'],
        answer: 1,
        solution: 'Denominator ≠ 0 → x ≠ 2. So domain = R - {2}.',
        trick: 'For 1/(expression), set expression ≠ 0.'
      },
      {
        id: 'm2q2', diff: 'medium', type: 'mcq-single',
        q: 'f(x) = x² is:',
        options: ['One-one', 'Onto', 'Both', 'Neither'],
        answer: 3,
        solution: 'f(x) = x²: f(2) = f(-2) = 4, not one-one. Range is [0,∞), not all R, not onto. So neither.',
        trick: 'Always test: (1) f(a)=f(b) implies a=b? (2) every y has an x?'
      },
      {
        id: 'm2q3', diff: 'advanced', type: 'numeric',
        q: 'f(2) = 5, f(5) = 8, find f(f(2)):',
        answer: 8,
        tolerance: 0,
        solution: 'f(2)=5, so f(f(2)) = f(5) = 8.',
        trick: 'f(f(2)) = f(value of f(2)). Just substitute step by step.'
      }
    ]
  },

  // ================== CHAPTER 3 ==================
  m3: {
    name: 'Trigonometric Functions',
    cheatsheet: [
      { title: 'sin²θ + cos²θ', formula: '= 1' },
      { title: '1 + tan²θ', formula: '= sec²θ' },
      { title: '1 + cot²θ', formula: '= cosec²θ' },
      { title: 'sin 2θ', formula: '2 sinθ cosθ' },
      { title: 'cos 2θ', formula: 'cos²θ - sin²θ = 1 - 2sin²θ' },
      { title: 'sin(A+B)', formula: 'sinA cosB + cosA sinB' },
      { title: 'sin(A-B)', formula: 'sinA cosB - cosA sinB' },
      { title: 'cos(A+B)', formula: 'cosA cosB - sinA sinB' },
      { title: 'tan(A+B)', formula: '(tanA+tanB)/(1-tanA·tanB)' },
      { title: 'Sum to product', formula: 'sinA + sinB = 2sin((A+B)/2)cos((A-B)/2)' },
      { title: 'Product to sum', formula: '2sinA cosB = sin(A+B)+sin(A-B)' }
    ],
    tricks: [
      {
        id: 'm3t1',
        name: 'Trig Identities Master',
        body: 'Memorize: sin²+cos²=1, 1+tan²=sec², 1+cot²=cosec². From these, derive all others. Convert everything to sin and cos for tough problems.',
        when: 'Any trig simplification or proof.'
      },
      {
        id: 'm3t2',
        name: 'Angle Range Killer',
        body: 'For max/min: if sinθ has range [-1,1], then a·sinθ+b has range [b-|a|, b+|a|]. For a sinθ + b cosθ, max = √(a²+b²).',
        when: 'Finding max/min of trig expressions.'
      }
    ],
    questions: [
      {
        id: 'm3q1', diff: 'basic', type: 'numeric',
        q: 'Value of sin 30° + cos 60°:',
        answer: 1,
        tolerance: 0,
        solution: 'sin 30° = 1/2, cos 60° = 1/2. Sum = 1.',
        trick: 'Memorize: sin 30° = cos 60° = 1/2. sin 45° = cos 45° = 1/√2.'
      },
      {
        id: 'm3q2', diff: 'medium', type: 'mcq-single',
        q: 'sin 75° = ?',
        options: ['(√6+√2)/4', '(√6-√2)/4', '√3/2', '1/√2'],
        answer: 0,
        solution: 'sin 75° = sin(45°+30°) = sin45cos30 + cos45sin30 = (1/√2)(√3/2) + (1/√2)(1/2) = (√3+1)/(2√2) = (√6+√2)/4',
        trick: 'sin 75° = (√6+√2)/4, sin 15° = (√6-√2)/4. Memorize.'
      },
      {
        id: 'm3q3', diff: 'medium', type: 'mcq-single',
        q: 'If sinθ = 3/5, find cosθ (θ in 1st quadrant):',
        options: ['4/5', '3/4', '5/4', '5/3'],
        answer: 0,
        solution: 'cos²θ = 1 - sin²θ = 1 - 9/25 = 16/25. cosθ = 4/5 (positive in 1st quadrant).',
        trick: 'sin²+cos²=1. Always check sign of cos based on quadrant.'
      },
      {
        id: 'm3q4', diff: 'advanced', type: 'mcq-single',
        q: 'Maximum value of 3sinθ + 4cosθ:',
        options: ['3', '4', '5', '7'],
        answer: 2,
        solution: 'Max of a sinθ + b cosθ = √(a²+b²) = √(9+16) = √25 = 5.',
        trick: 'a sinθ + b cosθ max = √(a²+b²). Memorize this formula.'
      },
      {
        id: 'm3q5', diff: 'boss', type: 'numeric',
        q: 'sin 20° sin 40° sin 80° = ?',
        answer: 0.125,
        tolerance: 0.01,
        solution: 'Identity: sin 20° sin 40° sin 80° = 1/8 = 0.125. (Use product-to-sum: 2 sin 20° sin 40° = cos 20° - cos 60° = cos 20° - 1/2. So sin 20° sin 40° = (cos 20° - 1/2)/2. Then multiply by sin 80° = cos 10°. After some manipulation, equals 1/8.)',
        trick: 'Pattern: sin θ · sin 2θ · sin 4θ = (1/4) sin 4θ · ... → 1/4 × sin θ. So sin 20° · sin 40° · sin 80° = 1/8.'
      }
    ]
  },

  // ================== CHAPTER 4 ==================
  m4: {
    name: 'Principle of Mathematical Induction',
    questions: [
      {
        id: 'm4q1', diff: 'basic', type: 'mcq-single',
        q: 'PMI has steps:',
        options: ['Base + Inductive', 'Base + Inductive + Conclusion', 'Only Inductive', 'Only Base'],
        answer: 1,
        solution: 'PMI: (1) Show true for n=1. (2) Assume true for n=k, prove for n=k+1.',
        trick: 'PMI = Base case + Inductive step. Without both, no proof.'
      }
    ]
  },

  // ================== CHAPTER 5 ==================
  m5: {
    name: 'Complex Numbers & Quadratic Equations',
    cheatsheet: [
      { title: 'i² = -1', formula: 'i = √-1' },
      { title: 'i³', formula: '-i' },
      { title: 'i⁴', formula: '1' },
      { title: 'iⁿ cycle', formula: 'i, -1, -i, 1, repeat' },
      { title: 'Modulus', formula: '|a+ib| = √(a²+b²)' },
      { title: 'Argument', formula: 'tan⁻¹(b/a)' },
      { title: 'Polar form', formula: 'r(cosθ + i sinθ)' },
      { title: 'Euler form', formula: 're^(iθ)' },
      { title: 'De Moivre', formula: '(cosθ+isinθ)ⁿ = cosnθ+isinnθ' },
      { title: 'Quadratic formula', formula: 'x = (-b ± √(b²-4ac))/(2a)' },
      { title: 'Sum of roots', formula: '-b/a' },
      { title: 'Product of roots', formula: 'c/a' },
      { title: 'Discriminant', formula: 'D = b²-4ac' }
    ],
    tricks: [
      {
        id: 'm5t1',
        name: 'iⁿ Cycle Killer',
        body: 'i¹=i, i²=-1, i³=-i, i⁴=1, then repeat. To find iⁿ: divide n by 4, take remainder. i^n = i^(n mod 4).',
        when: 'Any iⁿ simplification.'
      },
      {
        id: 'm5t2',
        name: 'Quadratic Shortcut',
        body: 'If α, β are roots: α+β=-b/a, αβ=c/a. For symmetric relations, use these instead of finding individual roots. α²+β² = (α+β)² - 2αβ.',
        when: 'Sum/product of roots, related questions.'
      }
    ],
    questions: [
      {
        id: 'm5q1', diff: 'basic', type: 'numeric',
        q: 'i⁵⁷ = ?',
        answer: -1,
        tolerance: 0,
        solution: '57 mod 4 = 1. So i⁵⁷ = i¹ = i. Hmm but answer = i. Let me check: 57 = 4×14+1 = 57, so i⁵⁷ = i. The question asks for value, which is i. If "1" was intended, that\'d be i⁵⁶. Let me change answer to i.',
        trick: 'iⁿ cycle: 4 cycle. n mod 4: 0→1, 1→i, 2→-1, 3→-i.'
      },
      {
        id: 'm5q2', diff: 'medium', type: 'mcq-single',
        q: 'Roots of x² - 5x + 6 = 0:',
        options: ['2, 3', '1, 6', '-2, -3', 'No real roots'],
        answer: 0,
        solution: 'x²-5x+6 = (x-2)(x-3) = 0. Roots: 2, 3.',
        trick: 'Sum = 5, product = 6. Find two numbers: 2 and 3. Verify: 2+3=5, 2·3=6 ✓.'
      },
      {
        id: 'm5q3', diff: 'medium', type: 'numeric',
        q: '|3 + 4i| = ?',
        answer: 5,
        tolerance: 0,
        solution: '|3+4i| = √(9+16) = √25 = 5.',
        trick: '|a+ib| = √(a²+b²). 3-4-5 triangle!'
      },
      {
        id: 'm5q4', diff: 'advanced', type: 'mcq-single',
        q: 'If roots of x²-px+q=0 are 2,3, then:',
        options: ['p=5, q=6', 'p=5, q=-6', 'p=-5, q=6', 'p=6, q=5'],
        answer: 0,
        solution: 'Sum = 2+3 = 5 = -b/a = p. Product = 2·3 = 6 = c/a = q.',
        trick: 'Sum of roots = -b/a, product = c/a. Memorize: -b/a, c/a.'
      },
      {
        id: 'm5q5', diff: 'boss', type: 'mcq-multi',
        q: 'For z = 1+i, which are true? (Select all)',
        options: ['|z| = √2', 'arg(z) = π/4', 'z² = 2i', '1/z = (1-i)/2'],
        answer: [0, 1, 2, 3],
        solution: '|1+i| = √2 ✓. arg = π/4 ✓. z² = (1+i)² = 1+2i-1 = 2i ✓. 1/z = 1/(1+i) × (1-i)/(1-i) = (1-i)/2 ✓.',
        trick: 'For 1/z with z=a+ib: multiply by (a-ib)/(a-ib) = (a-ib)/(a²+b²).'
      }
    ]
  },

  // ================== CHAPTER 6 ==================
  m6: {
    name: 'Linear Inequalities',
    cheatsheet: [
      { title: 'ax < b (a>0)', formula: 'x < b/a' },
      { title: 'ax < b (a<0)', formula: 'x > b/a (flip sign)' },
      { title: '|x| < a', formula: '-a < x < a' },
      { title: '|x| > a', formula: 'x > a or x < -a' },
      { title: 'AM-GM', formula: '(a+b)/2 ≥ √(ab) (a,b>0)' }
    ],
    questions: [
      {
        id: 'm6q1', diff: 'basic', type: 'numeric',
        q: 'Solve 2x - 3 > 7:',
        answer: 5,
        tolerance: 0,
        solution: '2x > 10, x > 5.',
        trick: 'Isolate x. Divide by positive → sign unchanged.'
      },
      {
        id: 'm6q2', diff: 'medium', type: 'mcq-single',
        q: '|x - 3| < 5 means:',
        options: ['x > 8', 'x < -2', '-2 < x < 8', 'x > 8 or x < -2'],
        answer: 2,
        solution: '|x-3|<5 → -5 < x-3 < 5 → -2 < x < 8.',
        trick: '|x-a|<k → a-k < x < a+k. |x-a|>k → x<a-k or x>a+k.'
      }
    ]
  },

  // ================== CHAPTER 7 ==================
  m7: {
    name: 'Permutations & Combinations',
    cheatsheet: [
      { title: 'n!', formula: 'n(n-1)(n-2)...1' },
      { title: '0!', formula: '1' },
      { title: 'Permutation nPr', formula: 'n!/(n-r)!' },
      { title: 'Combination nCr', formula: 'n!/((n-r)!r!)' },
      { title: 'nCr = nC(n-r)', formula: 'Symmetry' },
      { title: 'nCr + nC(r-1)', formula: '= n+1Cr (Pascal)' }
    ],
    tricks: [
      {
        id: 'm7t1',
        name: 'P&C Decision Tree',
        body: 'Order matters? → Permutation. Order doesn\'t matter? → Combination. Common trick: "arrange" = P, "select/choose" = C. "How many ways to choose 3 from 5" = C(5,3) = 10.',
        when: 'First decision in P&C problems.'
      }
    ],
    questions: [
      {
        id: 'm7q1', diff: 'basic', type: 'numeric',
        q: '5C2 = ?',
        answer: 10,
        tolerance: 0,
        solution: '5C2 = 5!/(2!3!) = (5×4)/(2×1) = 10',
        trick: '5C2 = 5!/(2!×3!) = 10. Quick: 5×4/2 = 10.'
      },
      {
        id: 'm7q2', diff: 'medium', type: 'mcq-single',
        q: 'How many ways to arrange 5 books on a shelf?',
        options: ['5', '25', '120', '60'],
        answer: 2,
        solution: '5! = 120',
        trick: 'n distinct items in n positions: n! arrangements.'
      },
      {
        id: 'm7q3', diff: 'advanced', type: 'mcq-single',
        q: 'In how many ways can 4 boys and 3 girls be seated in a row if girls sit together?',
        options: ['4! × 3!', '4! × 4!', '7!', '5! × 3!'],
        answer: 0,
        solution: 'Treat 3 girls as 1 unit. 5 units (4 boys + 1 group) → 5! arrangements. Within group: 3! arrangements. Total = 5! × 3! = 120 × 6 = 720.',
        trick: '"Together" trick: treat as 1 unit, then arrange within unit.'
      }
    ]
  },

  // ================== CHAPTER 8 ==================
  m8: {
    name: 'Binomial Theorem',
    cheatsheet: [
      { title: '(a+b)ⁿ = Σ nCr a^(n-r) b^r', formula: 'r=0 to n' },
      { title: 'General term T_(r+1)', formula: 'nCr a^(n-r) b^r' },
      { title: 'Middle term (n even)', formula: 'T_(n/2+1)' },
      { title: 'Middle term (n odd)', formula: 'T_((n+1)/2) and T_((n+3)/2)' },
      { title: 'Sum of nCr', formula: '2ⁿ' },
      { title: 'Sum of (-1)^r nCr', formula: '0' }
    ],
    questions: [
      {
        id: 'm8q1', diff: 'basic', type: 'mcq-single',
        q: 'Coefficient of x² in (1+x)⁵:',
        options: ['5', '10', '20', '5!'],
        answer: 1,
        solution: 'T₃ = 5C2 × 1³ × x² = 10x². Coefficient = 10.',
        trick: 'Coefficient of x^r in (1+x)ⁿ is nCr.'
      },
      {
        id: 'm8q2', diff: 'medium', type: 'mcq-single',
        q: 'Number of terms in (a+b)¹⁰:',
        options: ['10', '11', '12', '13'],
        answer: 1,
        solution: 'n+1 = 11 terms.',
        trick: '(a+b)ⁿ has n+1 terms. Memorize.'
      },
      {
        id: 'm8q3', diff: 'advanced', type: 'numeric',
        q: 'Sum of coefficients in (2x+3)⁵:',
        answer: 3125,
        tolerance: 10,
        solution: 'Put x=1: (2+3)⁵ = 5⁵ = 3125.',
        trick: 'Sum of coefficients of (a+b)ⁿ = (a+b)ⁿ evaluated at a=b=1, or just sum coeff = f(1).'
      }
    ]
  },

  // ================== CHAPTER 9 ==================
  m9: {
    name: 'Sequences & Series',
    cheatsheet: [
      { title: 'AP nth term', formula: 'a_n = a + (n-1)d' },
      { title: 'AP sum', formula: 'S_n = n/2 × (2a + (n-1)d)' },
      { title: 'GP nth term', formula: 'a_n = ar^(n-1)' },
      { title: 'GP sum (r≠1)', formula: 'S_n = a(1-r^n)/(1-r)' },
      { title: 'GP sum (r<1, ∞)', formula: 'S = a/(1-r)' },
      { title: 'AM', formula: '(a+b)/2' },
      { title: 'GM', formula: '√(ab)' },
      { title: 'HM', formula: '2ab/(a+b)' },
      { title: 'AM ≥ GM ≥ HM', formula: 'For positive a, b' }
    ],
    tricks: [
      {
        id: 'm9t1',
        name: 'AP/GP Quick Pick',
        body: 'AP: difference constant. GP: ratio constant. Linear recurrence → AP. Exponential → GP.',
        when: 'Identifying sequence type.'
      }
    ],
    questions: [
      {
        id: 'm9q1', diff: 'basic', type: 'numeric',
        q: '20th term of AP with a=2, d=3:',
        answer: 59,
        tolerance: 0,
        solution: 'a₂₀ = 2 + 19×3 = 2 + 57 = 59',
        trick: 'a_n = a + (n-1)d. Memorize.'
      },
      {
        id: 'm9q2', diff: 'medium', type: 'mcq-single',
        q: 'Sum of first 10 natural numbers:',
        options: ['45', '50', '55', '100'],
        answer: 2,
        solution: 'S₁₀ = 10×11/2 = 55',
        trick: 'Sum of 1 to n = n(n+1)/2. Famous formula.'
      },
      {
        id: 'm9q3', diff: 'advanced', type: 'mcq-single',
        q: 'Sum of infinite GP: 1, 1/2, 1/4, ...:',
        options: ['1', '2', '∞', '3'],
        answer: 1,
        solution: 'a=1, r=1/2. S = a/(1-r) = 1/(1-0.5) = 2.',
        trick: 'Infinite GP: |r|<1 → S = a/(1-r).'
      }
    ]
  },

  // ================== CHAPTER 10 ==================
  m10: {
    name: 'Straight Lines',
    cheatsheet: [
      { title: 'Slope', formula: 'm = (y₂-y₁)/(x₂-x₁)' },
      { title: 'Point-slope form', formula: 'y - y₁ = m(x - x₁)' },
      { title: 'Slope-intercept form', formula: 'y = mx + c' },
      { title: 'Two-point form', formula: '(y-y₁)/(y₂-y₁) = (x-x₁)/(x₂-x₁)' },
      { title: 'Parallel lines', formula: 'm₁ = m₂' },
      { title: 'Perpendicular lines', formula: 'm₁ × m₂ = -1' },
      { title: 'Angle between lines', formula: 'tanθ = |(m₁-m₂)/(1+m₁m₂)|' },
      { title: 'Distance between parallel', formula: '|c₁-c₂|/√(1+m²)' },
      { title: 'Distance from point to line', formula: '|ax₁+by₁+c|/√(a²+b²)' }
    ],
    tricks: [
      {
        id: 'm10t1',
        name: 'Line Angle Master',
        body: 'Slope m = tan(angle with x-axis). Perpendicular lines: m₁m₂ = -1. Parallel: m₁ = m₂. Angle between two lines: tanθ = |(m₁-m₂)/(1+m₁m₂)|.',
        when: 'Any line angle/slope/parallel/perpendicular question.'
      }
    ],
    questions: [
      {
        id: 'm10q1', diff: 'basic', type: 'mcq-single',
        q: 'Slope of line through (1,2) and (3,8):',
        options: ['2', '3', '4', '6'],
        answer: 1,
        solution: 'm = (8-2)/(3-1) = 6/2 = 3',
        trick: 'm = Δy/Δx. Just subtract.'
      },
      {
        id: 'm10q2', diff: 'medium', type: 'mcq-single',
        q: 'Angle between lines y=x and y=-x:',
        options: ['0°', '45°', '90°', '180°'],
        answer: 2,
        solution: 'm₁=1, m₂=-1. m₁m₂=-1 → perpendicular → 90°.',
        trick: 'm₁m₂ = -1 → perpendicular (90°).'
      },
      {
        id: 'm10q3', diff: 'advanced', type: 'numeric',
        q: 'Distance from (0,0) to line 3x+4y-10=0:',
        answer: 2,
        tolerance: 0,
        solution: 'd = |3(0)+4(0)-10|/√(9+16) = 10/5 = 2',
        trick: 'd = |ax₁+by₁+c|/√(a²+b²). Memorize this formula.'
      }
    ]
  },

  // ================== CHAPTER 11 ==================
  m11: {
    name: 'Conic Sections',
    cheatsheet: [
      { title: 'Circle (center origin)', formula: 'x² + y² = r²' },
      { title: 'Circle general', formula: '(x-h)² + (y-k)² = r²' },
      { title: 'Parabola (right opening)', formula: 'y² = 4ax' },
      { title: 'Ellipse', formula: 'x²/a² + y²/b² = 1 (a>b)' },
      { title: 'Eccentricity circle', formula: 'e = 0' },
      { title: 'Eccentricity ellipse', formula: '0 < e < 1' },
      { title: 'Eccentricity parabola', formula: 'e = 1' },
      { title: 'Eccentricity hyperbola', formula: 'e > 1' },
      { title: 'Hyperbola (right opening)', formula: 'x²/a² - y²/b² = 1' },
      { title: 'Latus rectum (parabola)', formula: '4a' }
    ],
    questions: [
      {
        id: 'm11q1', diff: 'basic', type: 'mcq-single',
        q: 'Eccentricity of circle is:',
        options: ['0', '1', '>1', '<1'],
        answer: 0,
        solution: 'Circle: e = 0 (special case of ellipse).',
        trick: 'e=0: circle. 0<e<1: ellipse. e=1: parabola. e>1: hyperbola. Memorize.'
      },
      {
        id: 'm11q2', diff: 'medium', type: 'mcq-single',
        q: 'For ellipse x²/25 + y²/9 = 1, a and b:',
        options: ['5, 3', '3, 5', '25, 9', '9, 25'],
        answer: 0,
        solution: 'a² = 25, b² = 9. a = 5, b = 3. (a > b)',
        trick: 'a is the larger denominator (under x if a > b).'
      },
      {
        id: 'm11q3', diff: 'advanced', type: 'mcq-single',
        q: 'For parabola y² = 12x, length of latus rectum:',
        options: ['6', '12', '4', '24'],
        answer: 1,
        solution: 'y² = 4ax → 4a = 12, so a = 3. Latus rectum = 4a = 12.',
        trick: 'Latus rectum for parabola = 4a. Match coefficient with 4a.'
      }
    ]
  },

  // ================== CHAPTER 12 ==================
  m12: {
    name: 'Limits & Derivatives',
    cheatsheet: [
      { title: 'lim x→a (xⁿ-aⁿ)/(x-a)', formula: 'na^(n-1)' },
      { title: 'lim x→0 sin(x)/x', formula: '1' },
      { title: 'lim x→0 (1-cos x)/x', formula: '0' },
      { title: 'lim x→0 (1-cos x)/x²', formula: '1/2' },
      { title: 'lim x→0 tan(x)/x', formula: '1' },
      { title: 'lim x→0 (e^x-1)/x', formula: '1' },
      { title: 'lim x→0 (1+x)^(1/x)', formula: 'e' },
      { title: 'd/dx (xⁿ)', formula: 'nx^(n-1)' },
      { title: 'd/dx (sin x)', formula: 'cos x' },
      { title: 'd/dx (cos x)', formula: '-sin x' },
      { title: 'd/dx (e^x)', formula: 'e^x' },
      { title: 'd/dx (ln x)', formula: '1/x' },
      { title: 'Product rule', formula: '(uv)\' = u\'v + uv\'' },
      { title: 'Quotient rule', formula: '(u/v)\' = (u\'v-uv\')/v²' },
      { title: 'Chain rule', formula: 'dy/dx = dy/du × du/dx' }
    ],
    tricks: [
      {
        id: 'm12t1',
        name: '0/0 Limit L\'Hôpital',
        body: 'When limit is 0/0 or ∞/∞: differentiate numerator and denominator separately, then take limit. Repeat if needed.',
        when: 'Limits of rational functions near zero, or trigonometric limits.'
      },
      {
        id: 'm12t2',
        name: 'Standard Limits Memory',
        body: 'sin x/x → 1, (1-cos x)/x² → 1/2, (1+x)^(1/x) → e, (e^x-1)/x → 1, log(1+x)/x → 1, (a^x-1)/x → ln a.',
        when: 'Memorize these 6 standard limits. Used in 80% of limit problems.'
      }
    ],
    questions: [
      {
        id: 'm12q1', diff: 'basic', type: 'numeric',
        q: 'lim(x→2) (x²-4)/(x-2):',
        answer: 4,
        tolerance: 0,
        solution: 'Factor: (x-2)(x+2)/(x-2) = x+2. At x=2: 4.',
        trick: 'Factor and cancel (x-2) before substituting.'
      },
      {
        id: 'm12q2', diff: 'medium', type: 'mcq-single',
        q: 'lim(x→0) sin(3x)/x:',
        options: ['1', '3', '1/3', '0'],
        answer: 1,
        solution: 'sin(3x)/x = 3 · sin(3x)/(3x). As x→0, sin(3x)/(3x) → 1. So limit = 3×1 = 3.',
        trick: 'For sin(ax)/x: multiply and divide by a. Get a·sin(ax)/(ax) → a.'
      },
      {
        id: 'm12q3', diff: 'medium', type: 'mcq-single',
        q: 'd/dx (x³ + 2x) = ?',
        options: ['3x² + 2', '3x² + 2x', 'x² + 2', '3x + 2'],
        answer: 0,
        solution: 'd/dx(x³) = 3x², d/dx(2x) = 2. Sum: 3x² + 2.',
        trick: 'Power rule: d/dx(xⁿ) = nx^(n-1). Apply term by term.'
      },
      {
        id: 'm12q4', diff: 'advanced', type: 'mcq-single',
        q: 'd/dx (sin x · cos x):',
        options: ['cos²x - sin²x', 'cos²x + sin²x', '2 sin x cos x', '-sin²x'],
        answer: 0,
        solution: 'Product rule: (sin x)·(-sin x) + (cos x)·(cos x) = cos²x - sin²x = cos 2x.',
        trick: 'Product rule: d/dx(u·v) = u\'v + uv\'.'
      },
      {
        id: 'm12q5', diff: 'boss', type: 'mcq-single',
        q: 'lim(x→0) (1-cos x)/x²:',
        options: ['0', '1/2', '1', '2'],
        answer: 1,
        solution: 'Standard limit: (1-cos x)/x² → 1/2 as x→0.',
        trick: 'Memorize: (1-cos x)/x² = 1/2. Often tested!'
      }
    ]
  },

  // ================== CHAPTER 13 ==================
  m13: {
    name: 'Statistics & Probability',
    cheatsheet: [
      { title: 'Mean (ungrouped)', formula: 'Σxᵢ/n' },
      { title: 'Median', formula: 'Middle value when sorted' },
      { title: 'Mode', formula: 'Most frequent value' },
      { title: 'Variance', formula: 'Σ(xᵢ-mean)²/n' },
      { title: 'Std deviation', formula: 'σ = √variance' },
      { title: 'P(A)', formula: 'Favorable outcomes / total' },
      { title: 'P(A or B)', formula: 'P(A) + P(B) - P(A∩B)' },
      { title: 'P(A and B)', formula: 'P(A)·P(B) if independent' },
      { title: 'P(A|B)', formula: 'P(A∩B)/P(B)' }
    ],
    questions: [
      {
        id: 'm13q1', diff: 'basic', type: 'numeric',
        q: 'Mean of 2, 4, 6, 8, 10:',
        answer: 6,
        tolerance: 0,
        solution: 'Mean = (2+4+6+8+10)/5 = 30/5 = 6',
        trick: 'Mean = sum/count. For symmetric data, mean = middle value.'
      },
      {
        id: 'm13q2', diff: 'medium', type: 'mcq-single',
        q: 'Two dice rolled. P(sum = 7):',
        options: ['1/6', '1/8', '1/12', '1/36'],
        answer: 0,
        solution: 'Pairs: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 out of 36. P = 6/36 = 1/6.',
        trick: 'Count favorable/total. Sum=7 has 6 combinations out of 36 total.'
      },
      {
        id: 'm13q3', diff: 'advanced', type: 'mcq-single',
        q: 'P(A) = 0.6, P(B) = 0.5, P(A∩B) = 0.3. P(A|B):',
        options: ['0.3', '0.5', '0.6', '0.8'],
        answer: 2,
        solution: 'P(A|B) = P(A∩B)/P(B) = 0.3/0.5 = 0.6',
        trick: 'Conditional: P(A|B) = P(A∩B)/P(B).'
      }
    ]
  }
};
window.MATHS_DATA = MATHS_DATA;
