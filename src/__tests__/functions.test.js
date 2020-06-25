import { formatTime } from 'utils/functions';

describe('test formatTime', () => {
  test('formats 0 to "00:00"', () => {
    expect(formatTime(0)).toBe('00:00');
  });

  test('formats 1 to "00:01"', () => {
    expect(formatTime(1)).toBe('00:01');
  });

  test('formats 37 to "00:37"', () => {
    expect(formatTime(37)).toBe('00:37');
  });

  test('formats 60 to "01:00"', () => {
    expect(formatTime(60)).toBe('1:00');
  });

  test('formats 61 to "01:01"', () => {
    expect(formatTime(61)).toBe('1:01');
  });

  test('formats 120 to "02:00"', () => {
    expect(formatTime(120)).toBe('2:00');
  });

  test('formats 276 to "04:36"', () => {
    expect(formatTime(276)).toBe('4:36');
  });

  test('formats 432 to "07:12"', () => {
    expect(formatTime(432)).toBe('7:12');
  });

  test('formats 1298 to "21:38"', () => {
    expect(formatTime(1298)).toBe('21:38');
  });

  test('formats 1432 to "23:52"', () => {
    expect(formatTime(1432)).toBe('23:52');
  });

  test('formats 1500 to "25:00"', () => {
    expect(formatTime(1500)).toBe('25:00');
  });

  test('formats 3600 to "> hour"', () => {
    expect(formatTime(3600)).toBe('> hour');
  });

  test('formats 46600 to "> hour"', () => {
    expect(formatTime(46600)).toBe('> hour');
  });
});
