/** Semester helpers for the Admin views' semester facets. Semester is not a
 *  first-class field on a Program in the ODB, so it is parsed from the program
 *  reference label. */

/** Placeholder for a reference that carries no semester (e.g. an internal-id
 *  fallback). */
export const NO_SEMESTER = '—';

/** The semester token in a program reference ("G-2027B-1234-Q" → "2027B"), or
 *  {@link NO_SEMESTER} when the reference carries none. */
export function semesterOf(reference: string): string {
  return /-(\d{4}[AB])-/.exec(reference)?.[1] ?? NO_SEMESTER;
}

/** The current Gemini semester ("2027B"). Gemini semester A runs Feb–Jul and B
 *  runs Aug–Jan, with January belonging to the previous year's B semester. */
export function currentSemester(now: Date = new Date()): string {
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth() + 1;
  if (month === 1) return `${String(year - 1)}B`;
  return `${String(year)}${month < 8 ? 'A' : 'B'}`;
}
