/* ============================================
   KURUKSHETRA — Chemistry Class 11
   Questions + Tricks + Cheat Sheets
   AI-generated, JEE Mains + Advanced pattern
   ============================================ */

const CHEMISTRY_DATA = {
  // ================== CHAPTER 1 ==================
  c1: {
    name: 'Some Basic Concepts of Chemistry',
    cheatsheet: [
      { title: 'Mole concept', formula: 'n = given mass / molar mass' },
      { title: 'Avogadro number', formula: 'N_A = 6.022×10²³' },
      { title: 'STP conditions', formula: '0°C, 1 atm → 22.4 L' },
      { title: 'Molarity (M)', formula: 'M = moles solute / L solution' },
      { title: 'Molality (m)', formula: 'm = moles solute / kg solvent' },
      { title: 'Mole fraction', formula: 'X_A = n_A / n_total' },
      { title: 'Mass %', formula: '(mass solute / mass solution) × 100' },
      { title: 'ppm', formula: '(mass solute / mass solution) × 10⁶' },
      { title: 'Empirical formula', formula: 'Simplest ratio of atoms' },
      { title: 'Molecular formula', formula: 'n × empirical formula' },
      { title: 'Limiting reagent', formula: 'Reactant fully consumed' },
      { title: '% yield', formula: '(actual / theoretical) × 100' }
    ],
    tricks: [
      {
        id: 'c1t1',
        name: 'Mole Concept Master Trick',
        body: 'Step 1: Convert everything to moles. Step 2: Use mole ratio from balanced equation. Step 3: Convert back to grams if needed. ALWAYS start with moles.',
        when: 'Any stoichiometry problem — grams/L/atoms to moles first.'
      },
      {
        id: 'c1t2',
        name: 'Concentration Conversion',
        body: 'Molarity to molality: M = (m × d × 1000) / (1000 + m × M_solute). Density d in g/mL, M_solute = molar mass. Or use: m = (1000×M)/(1000d - M×M_solute).',
        when: 'When converting between molarity and molality.'
      }
    ],
    questions: [
      {
        id: 'c1q1', diff: 'basic', type: 'numeric',
        q: 'Moles in 36 g of water (M=18):',
        answer: 2,
        tolerance: 0,
        solution: 'n = mass/M = 36/18 = 2 moles',
        trick: 'n = m/M. Memorize: 18 g water = 1 mole.'
      },
      {
        id: 'c1q2', diff: 'medium', type: 'mcq-single',
        q: 'Molarity of 4 g NaOH in 500 mL solution (M=40):',
        options: ['0.1 M', '0.2 M', '0.5 M', '1 M'],
        answer: 1,
        solution: 'Moles = 4/40 = 0.1 mol. Molarity = 0.1/0.5 L = 0.2 M.',
        trick: 'M = n/V(L). Moles in grams/molar mass, divide by volume in L.'
      },
      {
        id: 'c1q3', diff: 'medium', type: 'mcq-single',
        q: '10 mL of 0.1 M H₂SO₄ neutralizes how much 0.5 M NaOH?',
        options: ['2 mL', '4 mL', '5 mL', '10 mL'],
        answer: 1,
        solution: 'Moles H₂SO₄ = 0.010 × 0.1 = 0.001. Reaction: H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O. Moles NaOH = 2×0.001 = 0.002. V = 0.002/0.5 = 0.004 L = 4 mL.',
        trick: 'Equivalents: N₁V₁ = N₂V₂. H₂SO₄ n-factor=2, NaOH n-factor=1. So 0.1×2×10 = 0.5×1×V → V=4mL.'
      },
      {
        id: 'c1q4', diff: 'advanced', type: 'numeric',
        q: 'In a compound, C:H:O mass ratio is 6:1:8. Empirical formula:',
        answer: 'CH2O',
        solution: 'Moles C:H:O = 6/12 : 1/1 : 8/16 = 0.5:1:0.5. Ratio = 1:2:1. So CH₂O.',
        trick: 'Divide by atomic mass to get moles, then simplest ratio.'
      },
      {
        id: 'c1q5', diff: 'boss', type: 'mcq-multi',
        q: 'Which contain 6.022×10²³ atoms? (Select all)',
        options: ['1 mole He', '1 mole H₂', '0.5 mole O₂', '0.25 mole SO₂'],
        answer: [0, 3],
        solution: '1 mole He = 6.022×10²³ atoms (monoatomic). 1 mole H₂ = 6.022×10²³ molecules (2 atoms each = 12.04×10²³ atoms). 0.5 mole O₂ = 0.5×6.022×10²³ molecules = 6.022×10²³ atoms. 0.25 mole SO₂ = 0.25×3×6.022×10²³ = 4.5×10²³ atoms. Hmm. Let me recheck: "contain 6.022×10²³ atoms" — 0.5 mole O₂ has 0.5×2 = 1 mole atoms = 6.022×10²³. So 0.5 mole O₂ = 6.022×10²³ atoms. Yes. So 0, 2 work. Wait, 0.25 mole SO₂ has 0.25×3 = 0.75 mole atoms = 4.5×10²³ atoms. So 0.25 mole SO₂ does NOT have 6.022×10²³ atoms. Hmm. Let me check 0.5 mole H₂O: 0.5×3 = 1.5 mole atoms. Not Avogadro. Let me redo. Question: "contain 6.022×10²³ atoms". 1 mole He = 6.022×10²³ atoms ✓. 1 mole H₂ = 12.044×10²³ atoms (no). 0.5 mole O₂ = 0.5×2×6.022×10²³ = 6.022×10²³ atoms ✓. 0.25 mole SO₂ = 0.25×3×6.022×10²³ = 4.5×10²³ (no). So answers: 0, 2.',
        trick: 'Count atoms per molecule. 1 mole of atoms = Avogadro\'s number, regardless of how molecules.'
      }
    ]
  },

  // ================== CHAPTER 2 ==================
  c2: {
    name: 'Structure of Atom',
    cheatsheet: [
      { title: 'Bohr radius', formula: 'r_n = n² × 0.529 Å' },
      { title: 'Bohr energy', formula: 'E_n = -13.6/n² eV' },
      { title: 'Energy of photon', formula: 'E = hν = hc/λ' },
      { title: 'de Broglie wavelength', formula: 'λ = h/p = h/mv' },
      { title: 'Heisenberg uncertainty', formula: 'Δx·Δp ≥ ℏ/2' },
      { title: 'Quantum numbers', formula: 'n, l, m_l, m_s' },
      { title: 'l values', formula: '0, 1, 2, 3 = s, p, d, f' },
      { title: 'Max electrons in shell n', formula: '2n²' },
      { title: 'Hydrogen spectrum', formula: '1/λ = R(1/n₁² - 1/n₂²)' },
      { title: 'Photoelectric equation', formula: 'KE_max = hν - W' }
    ],
    tricks: [
      {
        id: 'c2t1',
        name: 'Quantum Number Killer',
        body: 'n = 1, 2, 3... (any positive integer). l = 0 to n-1. m_l = -l to +l. m_s = ±1/2. Count of orbitals in subshell = 2l+1. Max e⁻ in subshell = 2(2l+1).',
        when: 'Any question on quantum numbers, orbitals, electrons.'
      },
      {
        id: 'c2t2',
        name: 'Bohr Energy Shortcut',
        body: 'E_n = -13.6/n² eV. For any transition: ΔE = 13.6(1/n₁² - 1/n₂²) eV. Memorize: ground state (n=1) = -13.6 eV. n=2 = -3.4 eV. n=3 = -1.51 eV. n=∞ = 0.',
        when: 'Hydrogen energy levels, spectra, transitions.'
      }
    ],
    questions: [
      {
        id: 'c2q1', diff: 'basic', type: 'mcq-single',
        q: 'Max electrons in 3rd shell (n=3):',
        options: ['2', '8', '18', '32'],
        answer: 2,
        solution: 'Max = 2n² = 2×9 = 18',
        trick: 'Max e⁻ in shell = 2n². n=1:2, n=2:8, n=3:18, n=4:32.'
      },
      {
        id: 'c2q2', diff: 'medium', type: 'mcq-single',
        q: 'For n=3, possible l values:',
        options: ['0,1,2', '0,1,2,3', '1,2,3', '0 only'],
        answer: 0,
        solution: 'l = 0 to n-1. For n=3: l=0,1,2 (s, p, d)',
        trick: 'l ranges 0 to n-1. So n=3 → l=0,1,2.'
      },
      {
        id: 'c2q3', diff: 'medium', type: 'numeric',
        q: 'Energy of n=2 level in H atom (eV):',
        answer: -3.4,
        tolerance: 0.1,
        solution: 'E = -13.6/n² = -13.6/4 = -3.4 eV',
        trick: 'E_n = -13.6/n² eV. Memorize: n=1: -13.6, n=2: -3.4, n=3: -1.51.'
      },
      {
        id: 'c2q4', diff: 'advanced', type: 'mcq-single',
        q: 'de Broglie wavelength of electron moving at 7.3×10⁶ m/s (m=9.1×10⁻³¹, h=6.6×10⁻³⁴):',
        options: ['10⁻¹⁰ m', '10⁻⁹ m', '10⁻⁸ m', '10⁻⁷ m'],
        answer: 0,
        solution: 'λ = h/mv = 6.6×10⁻³⁴/(9.1×10⁻³¹ × 7.3×10⁶) = 6.6×10⁻³⁴/(6.6×10⁻²⁴) = 10⁻¹⁰ m = 1 Å',
        trick: 'λ = h/mv. For electron at v~10⁶ m/s, λ~10⁻¹⁰ m.'
      },
      {
        id: 'c2q5', diff: 'boss', type: 'mcq-multi',
        q: 'For 4d orbital, which are correct? (Select all)',
        options: ['n=4', 'l=2', 'Has 5 orbitals', 'Holds max 10 electrons'],
        answer: [0, 1, 2, 3],
        solution: '4d: n=4, l=2 (d). Orbitals = 2l+1 = 5. Max e⁻ = 2(2l+1) = 10.',
        trick: 'For Xy orbital: n=X, l = subshell value. s=0, p=1, d=2, f=3.'
      }
    ]
  },

  // ================== CHAPTER 3 ==================
  c3: {
    name: 'Classification of Elements & Periodicity',
    cheatsheet: [
      { title: 'Modern periodic law', formula: 'Properties ∝ atomic number' },
      { title: 'Periods', formula: '7 periods (1-7)' },
      { title: 'Groups', formula: '18 groups (1-18)' },
      { title: 'Atomic radius trend', formula: 'Decreases →, increases ↓' },
      { title: 'Ionization energy trend', formula: 'Increases →, decreases ↓' },
      { title: 'Electron affinity', formula: 'Increases → (mostly), decreases ↓' },
      { title: 'Electronegativity', formula: 'Increases →, decreases ↓' },
      { title: 'Metallic character', formula: 'Decreases →, increases ↓' },
      { title: 'Oxide of metal', formula: 'Basic; of nonmetal: acidic' },
      { title: 'Isoelectronic', formula: 'Same e⁻ count' }
    ],
    questions: [
      {
        id: 'c3q1', diff: 'basic', type: 'mcq-single',
        q: 'Element with highest electronegativity:',
        options: ['F', 'O', 'N', 'Cl'],
        answer: 0,
        solution: 'Fluorine is most electronegative (3.98 Pauling).',
        trick: 'F is the king of electronegativity. Memorize.'
      },
      {
        id: 'c3q2', diff: 'medium', type: 'mcq-single',
        q: 'Across a period, atomic radius:',
        options: ['Increases', 'Decreases', 'Constant', 'Random'],
        answer: 1,
        solution: 'Across period: Z increases, e⁻ pulled closer, radius decreases.',
        trick: 'Across period: radius↓, IE↑, EN↑, metallic↓.'
      },
      {
        id: 'c3q3', diff: 'advanced', type: 'mcq-single',
        q: 'Which has highest IE?',
        options: ['Li', 'Na', 'K', 'Rb'],
        answer: 0,
        solution: 'IE decreases down group. So Li (top) has highest among these.',
        trick: 'IE decreases down a group. Top element wins.'
      }
    ]
  },

  // ================== CHAPTER 4 ==================
  c4: {
    name: 'Chemical Bonding & Molecular Structure',
    cheatsheet: [
      { title: 'Lewis dot structure', formula: 'Valence e⁻ as dots' },
      { title: 'Octet rule', formula: '8 e⁻ in outer shell (except H, He, Li, Be, B)' },
      { title: 'Formal charge', formula: 'FC = V - N - B/2' },
      { title: 'Bond order', formula: '(N_b - N_a)/2' },
      { title: 'Hybridization', formula: 'sp, sp², sp³, sp³d, sp³d²' },
      { title: 'VSEPR', formula: 'Shape from repulsion minimization' },
      { title: 'Electronegativity diff (ΔEN)', formula: '0-0.4: covalent, 0.4-1.7: polar, >1.7: ionic' },
      { title: 'Dipole moment', formula: 'μ = q × d' },
      { title: 'Resonance', formula: 'Multiple Lewis structures' },
      { title: 'Hydrogen bond', formula: 'X-H...Y (X,Y = N,O,F)' }
    ],
    tricks: [
      {
        id: 'c4t1',
        name: 'Hybridization Shortcut',
        body: 'Count σ bonds + lone pairs around central atom. If count = 2: sp, 3: sp², 4: sp³, 5: sp³d, 6: sp³d². Memorize this!',
        when: 'Finding hybridization of central atom in any molecule.'
      },
      {
        id: 'c4t2',
        name: 'Bond Order Trend',
        body: 'Bond order ∝ bond energy ∝ 1/bond length. So O₂²⁻ < O₂⁻ < O₂ < O₂⁺ < O₂²⁺. Memorize: more electrons in antibonding = lower bond order.',
        when: 'Comparing bond strength, length, or stability of similar species.'
      }
    ],
    questions: [
      {
        id: 'c4q1', diff: 'basic', type: 'mcq-single',
        q: 'Hybridization of C in CH₄:',
        options: ['sp', 'sp²', 'sp³', 'sp³d'],
        answer: 2,
        solution: 'C has 4 σ bonds, 0 lone pairs. Count = 4 → sp³.',
        trick: 'Count = 4 → sp³ (tetrahedral). Memorize the table.'
      },
      {
        id: 'c4q2', diff: 'medium', type: 'mcq-single',
        q: 'Shape of NH₃:',
        options: ['Tetrahedral', 'Trigonal planar', 'Trigonal pyramidal', 'Linear'],
        answer: 2,
        solution: 'N: 3 bonds + 1 lone pair. 4 electron pairs → tetrahedral arrangement, 3 atoms → trigonal pyramidal shape.',
        trick: 'NH₃: 3 bonds + 1 LP = pyramidal. H₂O: 2 bonds + 2 LP = bent.'
      },
      {
        id: 'c4q3', diff: 'medium', type: 'numeric',
        q: 'Formal charge on central O in O₃ (with +1 charge on terminal O, -1 on other):',
        answer: 1,
        tolerance: 0,
        solution: 'FC on O central = 6 - 2 (lone pair electrons) - 6/2 (bonds) = 6-2-3 = +1. Hmm, the question is ambiguous. Let me simplify: total charge -1, terminal O = +1 each, central = ? For O₃: total e⁻ = 18. O-O=O or O=O-O. With structure: terminal O has FC=0, central O has FC=+1. Sum = +1. So the answer is +1 for central.',
        trick: 'FC = V - L - B/2. V=valence e⁻, L=lone pair e⁻, B=bonding e⁻.'
      },
      {
        id: 'c4q4', diff: 'advanced', type: 'mcq-single',
        q: 'Bond order of N₂:',
        options: ['1', '2', '3', '2.5'],
        answer: 2,
        solution: 'N₂ has triple bond (N≡N). Bond order = 3.',
        trick: 'N₂ has triple bond, CO also has triple bond. Memorize: both have BO=3.'
      },
      {
        id: 'c4q5', diff: 'boss', type: 'mcq-multi',
        q: 'Which molecules have sp² hybridization at central atom? (Select all)',
        options: ['BF₃', 'NH₃', 'SO₃', 'H₂O'],
        answer: [0, 2],
        solution: 'BF₃: 3 bonds, 0 LP = sp². NH₃: 3 bonds + 1 LP = sp³. SO₃: 3 bonds, 0 LP = sp². H₂O: 2 bonds + 2 LP = sp³.',
        trick: 'sp² needs 3 regions of electron density. Check bonds + LP.'
      }
    ]
  },

  // ================== CHAPTER 5 ==================
  c5: {
    name: 'Thermodynamics (Chemistry)',
    cheatsheet: [
      { title: 'ΔH (enthalpy)', formula: 'ΔH = ΔU + PΔV' },
      { title: 'ΔH = ΔU + Δn_g RT', formula: 'At constant P, T' },
      { title: 'Hess\'s law', formula: 'ΔH is path-independent' },
      { title: 'Bond enthalpy', formula: 'ΔH = Σ(bonds broken) - Σ(bonds formed)' },
      { title: 'ΔH°f', formula: 'Formation from elements' },
      { title: 'Entropy ΔS', formula: 'dS = dq_rev/T' },
      { title: 'Gibbs free energy', formula: 'ΔG = ΔH - TΔS' },
      { title: 'Spontaneity', formula: 'ΔG < 0: spontaneous' },
      { title: 'ΔG° = -RT ln K', formula: 'Equilibrium constant' }
    ],
    tricks: [
      {
        id: 'c5t1',
        name: 'Spontaneity Decision Table',
        body: 'ΔH < 0, ΔS > 0: always spontaneous. ΔH > 0, ΔS < 0: never spontaneous. ΔH < 0, ΔS < 0: low T. ΔH > 0, ΔS > 0: high T.',
        when: 'Any spontaneity question — just look at signs of ΔH and ΔS.'
      }
    ],
    questions: [
      {
        id: 'c5q1', diff: 'basic', type: 'mcq-single',
        q: 'For an exothermic reaction, ΔH is:',
        options: ['Positive', 'Negative', 'Zero', 'Undefined'],
        answer: 1,
        solution: 'Exothermic: heat released, ΔH < 0.',
        trick: 'Exothermic = ΔH < 0. Endothermic = ΔH > 0.'
      },
      {
        id: 'c5q2', diff: 'medium', type: 'mcq-multi',
        q: 'Spontaneous at all temperatures: (Select all)',
        options: ['ΔH<0, ΔS>0', 'ΔH<0, ΔS<0', 'ΔH>0, ΔS>0', 'ΔH>0, ΔS<0'],
        answer: [0],
        solution: 'Only ΔH<0, ΔS>0: ΔG = ΔH-TΔS is always negative regardless of T.',
        trick: 'Both contribute to negative ΔG: only option 1 works at all T.'
      },
      {
        id: 'c5q3', diff: 'advanced', type: 'numeric',
        q: 'ΔG for ΔH=-100 kJ, ΔS=-200 J/K, T=300 K (in kJ):',
        answer: -40,
        tolerance: 1,
        solution: 'ΔG = ΔH - TΔS = -100 - 300×(-0.2) = -100 + 60 = -40 kJ',
        trick: 'Watch units! ΔH in kJ, ΔS in J/K. Convert to same units.'
      }
    ]
  },

  // ================== CHAPTER 6 ==================
  c6: {
    name: 'Equilibrium',
    cheatsheet: [
      { title: 'K_c', formula: 'Products/reactants at equilibrium' },
      { title: 'K_p = K_c(RT)^Δn', formula: 'Relation' },
      { title: 'Le Chatelier', formula: 'System opposes change' },
      { title: 'Acid dissociation K_a', formula: '[H+][A-]/[HA]' },
      { title: 'Base dissociation K_b', formula: '[B+][OH-]/[BOH]' },
      { title: 'pH', formula: '-log[H+]' },
      { title: 'pOH', formula: '-log[OH-]' },
      { title: 'pH + pOH = 14', formula: 'At 25°C' },
      { title: 'K_w', formula: '[H+][OH-] = 10⁻¹⁴' },
      { title: 'Buffer Henderson', formula: 'pH = pK_a + log([salt]/[acid])' },
      { title: 'Solubility product K_sp', formula: 'Product of ion concentrations' }
    ],
    tricks: [
      {
        id: 'c6t1',
        name: 'pH Quick Method',
        body: 'Strong acid: pH = -log(C). Strong base: pH = 14 + log(C). Weak acid: pH = ½(pK_a - log C).',
        when: 'Quick pH calculation for any acid/base.'
      }
    ],
    questions: [
      {
        id: 'c6q1', diff: 'basic', type: 'numeric',
        q: 'pH of 0.01 M HCl:',
        answer: 2,
        tolerance: 0,
        solution: 'Strong acid fully dissociates. [H+] = 0.01 = 10⁻². pH = 2.',
        trick: 'Strong acid: pH = -log(C). For 0.01 M → pH = 2.'
      },
      {
        id: 'c6q2', diff: 'medium', type: 'mcq-single',
        q: 'For reaction A + B ⇌ C + D, K_c = 4. If we double [A] and [B], new K_c:',
        options: ['2', '4', '8', '16'],
        answer: 1,
        solution: 'K_c depends only on temperature, not concentrations.',
        trick: 'K_c, K_p are CONSTANTS at given T. Only change with temperature!'
      },
      {
        id: 'c6q3', diff: 'advanced', type: 'mcq-single',
        q: 'Adding catalyst to equilibrium:',
        options: ['Shifts forward', 'Shifts backward', 'No effect on equilibrium', 'Increases K'],
        answer: 2,
        solution: 'Catalyst speeds up both forward and reverse equally, no shift. Just reaches equilibrium faster.',
        trick: 'Catalyst: faster equilibrium, same position. NEVER shifts equilibrium.'
      },
      {
        id: 'c6q4', diff: 'boss', type: 'numeric',
        q: 'pH of solution where [H+] = 4×10⁻⁵ M:',
        answer: 4.4,
        tolerance: 0.1,
        solution: 'pH = -log(4×10⁻⁵) = 5 - log 4 = 5 - 0.6 = 4.4',
        trick: 'pH = -log[H+]. Break into power of 10 + coefficient log.'
      }
    ]
  },

  // ================== CHAPTER 7 ==================
  c7: {
    name: 'Redox Reactions',
    cheatsheet: [
      { title: 'Oxidation', formula: 'Loss of electrons, increase in ON' },
      { title: 'Reduction', formula: 'Gain of electrons, decrease in ON' },
      { title: 'Oxidizing agent', formula: 'Gets reduced' },
      { title: 'Reducing agent', formula: 'Gets oxidized' },
      { title: 'Oxidation number rules', formula: 'Free element = 0, F = -1, O = -2 (usually), H = +1' },
      { title: 'Sum of ON in compound', formula: '= charge' },
      { title: 'Balance redox', formula: 'Half-reaction method' },
      { title: 'n-factor for redox', formula: 'Total e⁻ transferred per mole' }
    ],
    questions: [
      {
        id: 'c7q1', diff: 'basic', type: 'mcq-single',
        q: 'Oxidation state of Mn in KMnO₄:',
        options: ['+2', '+4', '+6', '+7'],
        answer: 3,
        solution: 'K(+1) + Mn + 4O(-8) = 0 → Mn = +7.',
        trick: 'Use sum rule: total charge = 0 (for neutral). K + Mn + 4O = 0. K=+1, O=-2 (×4 = -8). So Mn = +7.'
      },
      {
        id: 'c7q2', diff: 'medium', type: 'mcq-multi',
        q: 'Which are redox reactions? (Select all)',
        options: ['2H₂ + O₂ → 2H₂O', 'NaOH + HCl → NaCl + H₂O', 'Zn + Cu²⁺ → Zn²⁺ + Cu', 'AgNO₃ + NaCl → AgCl + NaNO₃'],
        answer: [0, 2],
        solution: '1: H goes 0→+1, O goes 0→-2. Redox ✓. 2: Acid-base, no change. 3: Zn 0→+2, Cu +2→0. Redox ✓. 4: Double displacement, no change.',
        trick: 'Redox = any oxidation number change. Acid-base ≠ redox.'
      }
    ]
  },

  // ================== CHAPTER 8 ==================
  c8: {
    name: 'Organic Chemistry — Basic Principles',
    cheatsheet: [
      { title: 'IUPAC alkane suffix', formula: '-ane' },
      { title: 'IUPAC alkene suffix', formula: '-ene' },
      { title: 'IUPAC alkyne suffix', formula: '-yne' },
      { title: 'Functional group priority', formula: 'Carboxylic acid > Ester > Amide > Aldehyde > Ketone > Alcohol > Amine' },
      { title: 'IUPAC name parts', formula: 'Prefix + Root + Primary suffix + Secondary suffix' },
      { title: 'Inductive effect', formula: '-I: EN groups; +I: alkyl' },
      { title: 'Resonance effect', formula: '-M: EN groups with π; +M: lone pair donors' },
      { title: 'Hyperconjugation', formula: 'σ(C-H) ↔ π bond' },
      { title: 'Stability of carbocations', formula: '3° > 2° > 1° > methyl' },
      { title: 'Stability of free radicals', formula: '3° > 2° > 1° > methyl' }
    ],
    tricks: [
      {
        id: 'c8t1',
        name: 'IUPAC Naming Killer',
        body: 'Step 1: Find longest carbon chain (root: meth=1, eth=2, prop=3, but=4, pent=5, hex=6, hept=7...). Step 2: Number to give lowest locant. Step 3: Identify substituents. Step 4: Name as locant-substituent-root-suffix.',
        when: 'Naming any organic compound.'
      },
      {
        id: 'c8t2',
        name: 'Carbocation Stability Trick',
        body: 'Stability: 3° > 2° > 1° > methyl. Reason: more alkyl groups = more +I effect = more stabilization. Resonance stabilized cations (allyl, benzyl) are extra stable.',
        when: 'SN1/E1 reactions, rearrangements.'
      }
    ],
    questions: [
      {
        id: 'c8q1', diff: 'basic', type: 'mcq-single',
        q: 'IUPAC name of CH₃-CH₂-OH:',
        options: ['Methanol', 'Ethanol', 'Ethanal', 'Methanoic acid'],
        answer: 1,
        solution: '2 carbons + alcohol (OH) = ethanol.',
        trick: '2 carbons = eth. -OH = -ol. So ethanol.'
      },
      {
        id: 'c8q2', diff: 'medium', type: 'mcq-single',
        q: 'Most stable carbocation:',
        options: ['CH₃⁺', '(CH₃)₂CH⁺', '(CH₃)₃C⁺', 'CH₂=CH-CH₂⁺'],
        answer: 2,
        solution: '(CH₃)₃C⁺ is 3° (most stable). CH₂=CH-CH₂⁺ is allyl (also stable due to resonance). For same type, 3° > allyl. So (CH₃)₃C⁺.',
        trick: 'Carbocation stability: 3° > 2° > 1° > methyl. Resonance: allyl ≈ 2°.'
      },
      {
        id: 'c8q3', diff: 'advanced', type: 'mcq-single',
        q: 'Order of priority: -COOH, -OH, -CHO, -NH₂ (highest to lowest):',
        options: ['OH > COOH > CHO > NH₂', 'COOH > CHO > OH > NH₂', 'COOH > OH > CHO > NH₂', 'COOH > OH > NH₂ > CHO'],
        answer: 2,
        solution: 'Priority: Carboxylic acid > Alcohol > Aldehyde > Amine. (In IUPAC, COOH is highest among these.)',
        trick: 'Memorize priority: COOH > COOR > CONH₂ > CHO > C=O > OH > NH₂.'
      }
    ]
  },

  // ================== CHAPTER 9 ==================
  c9: {
    name: 'Hydrocarbons',
    cheatsheet: [
      { title: 'Alkane general', formula: 'C_n H_(2n+2)' },
      { title: 'Alkene general', formula: 'C_n H_(2n)' },
      { title: 'Alkyne general', formula: 'C_n H_(2n-2)' },
      { title: 'Markovnikov\'s rule', formula: 'H goes to C with more H (in HX addition)' },
      { title: 'Anti-Markovnikov', formula: 'Peroxide + HBr → opposite' },
      { title: 'Saytzeff rule', formula: 'More substituted alkene preferred (E2)' },
      { title: 'Benzene reactions', formula: 'Electrophilic substitution' },
      { title: 'o/p vs m directors', formula: 'o/p: EDG, m: EWG' }
    ],
    questions: [
      {
        id: 'c9q1', diff: 'basic', type: 'mcq-single',
        q: 'HBr addition to propene gives major product:',
        options: ['1-bromopropane', '2-bromopropane', '3-bromopropane', 'no reaction'],
        answer: 1,
        solution: 'Markovnikov: H goes to CH₂ (more H), Br goes to CH. So 2-bromopropane.',
        trick: 'Markovnikov: H to more H, X to less H. Memorize: "rich get richer" for H.'
      },
      {
        id: 'c9q2', diff: 'medium', type: 'mcq-single',
        q: 'HBr + propene + peroxide gives:',
        options: ['1-bromopropane', '2-bromopropane', 'Both equal', 'no reaction'],
        answer: 0,
        solution: 'Peroxide effect: anti-Markovnikov. So 1-bromopropane.',
        trick: 'HBr + peroxide = anti-Markovnikov. HCl, HI do NOT show this effect.'
      },
      {
        id: 'c9q3', diff: 'advanced', type: 'numeric',
        q: 'How many structural isomers of C₅H₁₂ (pentane):',
        answer: 3,
        tolerance: 0,
        solution: 'n-pentane, isopentane, neopentane. Total 3.',
        trick: 'n=5: 3 isomers. n=6: 5 isomers. n=7: 9 isomers. Memorize these.'
      }
    ]
  },

  // ================== CHAPTER 10 ==================
  c10: {
    name: 's-Block Elements',
    cheatsheet: [
      { title: 'Group 1 (alkali metals)', formula: 'Li, Na, K, Rb, Cs, Fr' },
      { title: 'Group 2 (alkaline earth)', formula: 'Be, Mg, Ca, Sr, Ba, Ra' },
      { title: 'Diagonal relationship', formula: 'Li-Mg, Be-Al' },
      { title: 'Flame color (Li/Na/K)', formula: 'Li=crimson, Na=yellow, K=violet' },
      { title: 'Solubility of hydroxides', formula: 'Group 1: soluble. Group 2: except Be, Mg' },
      { title: 'Solubility of carbonates', formula: 'Group 1: soluble. Group 2: decreases down' }
    ],
    questions: [
      {
        id: 'c10q1', diff: 'basic', type: 'mcq-single',
        q: 'Flame color of Na:',
        options: ['Crimson', 'Yellow', 'Violet', 'Green'],
        answer: 1,
        solution: 'Na gives bright yellow flame (sodium line at 589 nm).',
        trick: 'Memorize flame colors: Li-crimson, Na-yellow, K-violet, Ca-brick red, Ba-green.'
      },
      {
        id: 'c10q2', diff: 'medium', type: 'mcq-single',
        q: 'Most reactive alkali metal:',
        options: ['Li', 'Na', 'K', 'Cs'],
        answer: 3,
        solution: 'Reactivity increases down the group. Cs is most reactive (Fr is radioactive).',
        trick: 'Reactivity increases down Group 1. Cs > Rb > K > Na > Li.'
      }
    ]
  },

  // ================== CHAPTER 11 ==================
  c11: {
    name: 'p-Block Elements (Group 13 & 14)',
    cheatsheet: [
      { title: 'Group 13', formula: 'B, Al, Ga, In, Tl' },
      { title: 'Group 14', formula: 'C, Si, Ge, Sn, Pb' },
      { title: 'Inert pair effect', formula: 'ns² e⁻ reluctant to participate (heavy elements)' },
      { title: 'Allotropes of C', formula: 'Diamond, graphite, fullerene' },
      { title: 'Borax bead test', formula: 'For transition metals' },
      { title: 'Structure of B₂H₆', formula: 'Banana bond (3c-2e)' }
    ],
    questions: [
      {
        id: 'c11q1', diff: 'basic', type: 'mcq-single',
        q: 'Inert pair effect is prominent in:',
        options: ['Li, Be', 'B, C', 'Tl, Pb', 'Na, Mg'],
        answer: 2,
        solution: 'Inert pair effect is most prominent in heavy p-block elements like Tl, Pb.',
        trick: 'Inert pair effect: heavy p-block (Tl, Pb, Bi). Results in lower oxidation state.'
      },
      {
        id: 'c11q2', diff: 'medium', type: 'mcq-single',
        q: 'Most stable oxidation state of Pb:',
        options: ['+2', '+4', '+3', '0'],
        answer: 0,
        solution: 'Due to inert pair effect, Pb prefers +2 over +4.',
        trick: 'Inert pair: +2 stable for Pb, +2 for Sn, +1 for Tl.'
      }
    ]
  },

  // ================== CHAPTER 12 ==================
  c12: {
    name: 'Hydrogen',
    cheatsheet: [
      { title: 'Isotopes of H', formula: 'Protium, Deuterium, Tritium' },
      { title: 'Heavy water', formula: 'D₂O' },
      { title: 'Hydrogen peroxide', formula: 'H₂O₂ (used as oxidizer)' },
      { title: 'Position in periodic table', formula: 'Group 1 (alkali) and Group 17 (halogen)' },
      { title: 'Ortho & Para hydrogen', formula: 'Spin orientation' }
    ],
    questions: [
      {
        id: 'c12q1', diff: 'basic', type: 'mcq-single',
        q: 'Heavy water is:',
        options: ['H₂O', 'D₂O', 'T₂O', 'H₂O₂'],
        answer: 1,
        solution: 'Heavy water = D₂O (deuterium oxide).',
        trick: 'Heavy water = D₂O. Used as moderator in nuclear reactors.'
      }
    ]
  },

  // ================== CHAPTER 13 ==================
  c13: {
    name: 'Environmental Chemistry',
    cheatsheet: [
      { title: 'Greenhouse gases', formula: 'CO₂, CH₄, N₂O, CFCs' },
      { title: 'Ozone depletion', formula: 'CFCs release Cl, destroys O₃' },
      { title: 'SMOG', formula: 'Classical (SO₂) + Photochemical (NOx, O₃)' },
      { title: 'BOD', formula: 'Biological oxygen demand (water pollution)' },
      { title: 'Eutrophication', formula: 'Excess nutrients → algae bloom' }
    ],
    questions: [
      {
        id: 'c13q1', diff: 'basic', type: 'mcq-single',
        q: 'Main greenhouse gas:',
        options: ['O₂', 'N₂', 'CO₂', 'H₂'],
        answer: 2,
        solution: 'CO₂ is the most significant greenhouse gas by volume.',
        trick: 'CO₂ is king of greenhouse gases. CH₄ is more potent per molecule.'
      }
    ]
  }
};
