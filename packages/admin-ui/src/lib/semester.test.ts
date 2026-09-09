import { describe, expect, it } from 'vitest';

import { currentSemester, NO_SEMESTER, semesterOf } from './semester';

describe(semesterOf, () => {
  it('extracts the semester token from a program reference', () => {
    expect(semesterOf('G-2027B-1234-Q')).toBe('2027B');
    expect(semesterOf('G-2026A-0001-C')).toBe('2026A');
  });

  it('returns the placeholder when the reference carries no semester', () => {
    expect(semesterOf('p-172')).toBe(NO_SEMESTER);
    expect(semesterOf('')).toBe(NO_SEMESTER);
  });
});

describe(currentSemester, () => {
  it('assigns Feb–Jul to A and Aug–Dec to B', () => {
    expect(currentSemester(new Date('2027-02-01T00:00:00Z'))).toBe('2027A');
    expect(currentSemester(new Date('2027-07-31T23:59:59Z'))).toBe('2027A');
    expect(currentSemester(new Date('2027-08-01T00:00:00Z'))).toBe('2027B');
    expect(currentSemester(new Date('2027-12-31T23:59:59Z'))).toBe('2027B');
  });

  it("assigns January to the previous year's B semester", () => {
    expect(currentSemester(new Date('2028-01-15T12:00:00Z'))).toBe('2027B');
  });
});
