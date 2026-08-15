// ============================================================
// Dynamic Date Utilities — Hannah Elangovan Portfolio
// DOB: 19 July 2005 | Venture Founded: 2021
// ============================================================

const DOB = new Date("2005-07-19");
const VENTURE_FOUNDED_YEAR = 2021;

/** Returns Hannah's current age as an integer */
export function getAge(): number {
  const today = new Date();
  let age = today.getFullYear() - DOB.getFullYear();
  const m = today.getMonth() - DOB.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < DOB.getDate())) age--;
  return age;
}

/** Returns full years Web Mall (Pvt) Ltd has been running */
export function getVentureYears(): number {
  return new Date().getFullYear() - VENTURE_FOUNDED_YEAR;
}

/** "21-year-old" style label */
export function getAgeLabel(): string {
  return getAge() + "-year-old";
}

/** "5+ Years" style label from a founding year */
export function getYearsLabel(startYear: number, suffix = "Years"): string {
  return (new Date().getFullYear() - startYear) + "+ " + suffix;
}
