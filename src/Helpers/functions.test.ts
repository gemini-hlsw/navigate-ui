import { deg2dms, deg2hms, dms2deg, hms2deg } from './functions';
import { describe, expect, test } from 'vitest';

describe(deg2hms.name, () => {
  test.each([
    [0, '00:00:00.000'],
    [90, '06:00:00.000'],
    // [-90, '18:00:00.000'],
    [0.25, '00:01:00.000'],
    [0.1, '00:00:24.000'],
  ])(`should format %s as %s`, (deg, expected) => {
    expect(deg2hms(deg)).equals(expected);
    expect(hms2deg(expected)).equals(hms2deg(deg2hms(deg)));
  });
});

describe(deg2dms.name, () => {
  test.each([
    [0, '00:00:00.000'],
    [90, '90:00:00.000'],
    [360, '00:00:00.000'],
    [450, '90:00:00.000'],
    [-90, '-90:00:00.000'],
    [0.25, '00:15:00.000'],
    [0.01, '00:00:36.000'],
    [270, '-90:00:00.000'],
  ])(`should format %s as %s`, (deg, expected) => {
    expect(deg2dms(deg)).equals(expected);
    expect(dms2deg(expected)).equals(dms2deg(deg2dms(deg)));
  });
});
