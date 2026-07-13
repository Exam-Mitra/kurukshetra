/* ============================================
   KURUKSHETRA — School Mode (Sunday)
   Lighter tasks + revision only
   ============================================ */

const School = {
  isActive() { return K.isSchoolDay(); },

  // Get suggested subject for today
  suggestedSubjects() {
    if (!this.isActive()) return ['physics', 'chemistry', 'maths'];
    // Sunday: revision mode
    return ['revision', 'weak-topics', 'mock'];
  },

  // Get lighter task count for school day
  taskCount() {
    return this.isActive()
      ? { lectures: 1, hw: 3, dpp: 1 }  // lighter
      : { lectures: 3, hw: 5, dpp: 1 };
  },

  // Show school mode banner
  render(state) {
    if (!this.isActive()) return '';
    return `
      <div class="card" style="background: linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(255, 215, 0, 0.05)); border-color: var(--info);">
        <h2>📚 School Day Mode</h2>
        <p style="color:var(--text-secondary); margin-top:8px;">
          Today is Sunday — your day for school (Phe/English/Fine Arts). Use Kurukshetra in <b>revision mode</b>:
          light practice, revisit weak topics, and prepare for Monday.
        </p>
      </div>
    `;
  }
};
