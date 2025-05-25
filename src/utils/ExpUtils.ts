// expUtils.ts
export function getSectionsCount(level: string): number {
    // Por ahora hardcodeado, puedes mejorarlo luego
    if (level === "A1") return 8;
    if (level === "A2") return 10;
    // ...otros niveles
    return 8;
  }
  
  // Devuelve cuántas secciones están completadas para ese nivel
  export function getCompletedSections(level: string): number {
    const total = getSectionsCount(level);
    let count = 0;
    for (let i = 1; i <= total; i++) {
      const saved = localStorage.getItem(`progress_${level}_section${i}`);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.sectionDone) count++;
      }
    }
    return count;
  }
  
  export function getExpPercentage(level: string): number {
    const completed = getCompletedSections(level);
    const total = getSectionsCount(level);
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  }
  