import { formatTime, getAdjacentPieces } from 'utils/functions';

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

describe('test getAdjacentPieces', () => {
  describe('test getAdjacentPieces with 16 piece puzzle', () => {
    test('gets adjacent pieces of piece 0', () => {
      expect(getAdjacentPieces(0, 0, 0, 4)).toStrictEqual({
        right: 1,
        bottom: 4
      });
    });

    test('gets adjacent pieces of piece 1', () => {
      expect(getAdjacentPieces(1, 1, 0, 4)).toStrictEqual({
        right: 2,
        bottom: 5,
        left: 0
      });
    });

    test('gets adjacent pieces of piece 2', () => {
      expect(getAdjacentPieces(2, 2, 0, 4)).toStrictEqual({
        right: 3,
        bottom: 6,
        left: 1
      });
    });

    test('gets adjacent pieces of piece 3', () => {
      expect(getAdjacentPieces(3, 3, 0, 4)).toStrictEqual({
        bottom: 7,
        left: 2
      });
    });

    test('gets adjacent pieces of piece 4', () => {
      expect(getAdjacentPieces(4, 0, 1, 4)).toStrictEqual({
        top: 0,
        right: 5,
        bottom: 8
      });
    });

    test('gets adjacent pieces of piece 5', () => {
      expect(getAdjacentPieces(5, 1, 1, 4)).toStrictEqual({
        top: 1,
        right: 6,
        bottom: 9,
        left: 4
      });
    });

    test('gets adjacent pieces of piece 6', () => {
      expect(getAdjacentPieces(6, 2, 1, 4)).toStrictEqual({
        top: 2,
        right: 7,
        bottom: 10,
        left: 5
      });
    });

    test('gets adjacent pieces of piece 7', () => {
      expect(getAdjacentPieces(7, 3, 1, 4)).toStrictEqual({
        top: 3,
        bottom: 11,
        left: 6
      });
    });

    test('gets adjacent pieces of piece 8', () => {
      expect(getAdjacentPieces(8, 0, 2, 4)).toStrictEqual({
        top: 4,
        right: 9,
        bottom: 12
      });
    });

    test('gets adjacent pieces of piece 9', () => {
      expect(getAdjacentPieces(9, 1, 2, 4)).toStrictEqual({
        top: 5,
        right: 10,
        bottom: 13,
        left: 8
      });
    });

    test('gets adjacent pieces of piece 10', () => {
      expect(getAdjacentPieces(10, 2, 2, 4)).toStrictEqual({
        top: 6,
        right: 11,
        bottom: 14,
        left: 9
      });
    });

    test('gets adjacent pieces of piece 11', () => {
      expect(getAdjacentPieces(11, 3, 2, 4)).toStrictEqual({
        top: 7,
        bottom: 15,
        left: 10
      });
    });

    test('gets adjacent pieces of piece 12', () => {
      expect(getAdjacentPieces(12, 0, 3, 4)).toStrictEqual({
        top: 8,
        right: 13
      });
    });

    test('gets adjacent pieces of piece 13', () => {
      expect(getAdjacentPieces(13, 1, 3, 4)).toStrictEqual({
        top: 9,
        right: 14,
        left: 12
      });
    });

    test('gets adjacent pieces of piece 14', () => {
      expect(getAdjacentPieces(14, 2, 3, 4)).toStrictEqual({
        top: 10,
        right: 15,
        left: 13
      });
    });

    test('gets adjacent pieces of piece 15', () => {
      expect(getAdjacentPieces(15, 3, 3, 4)).toStrictEqual({
        top: 11,
        left: 14
      });
    });
  });

  describe('test getAdjacentPieces with 36 piece puzzle', () => {
    test('gets adjacent pieces of piece 0', () => {
      expect(getAdjacentPieces(0, 0, 0, 6)).toStrictEqual({
        right: 1,
        bottom: 6
      });
    });

    test('gets adjacent pieces of piece 5', () => {
      expect(getAdjacentPieces(5, 5, 0, 6)).toStrictEqual({
        bottom: 11,
        left: 4
      });
    });

    test('gets adjacent pieces of piece 13', () => {
      expect(getAdjacentPieces(13, 1, 2, 6)).toStrictEqual({
        top: 7,
        right: 14,
        bottom: 19,
        left: 12
      });
    });

    test('gets adjacent pieces of piece 27', () => {
      expect(getAdjacentPieces(27, 3, 4, 6)).toStrictEqual({
        top: 21,
        right: 28,
        bottom: 33,
        left: 26
      });
    });

    test('gets adjacent pieces of piece 33', () => {
      expect(getAdjacentPieces(33, 3, 5, 6)).toStrictEqual({
        top: 27,
        right: 34,
        left: 32
      });
    });

    test('gets adjacent pieces of piece 35', () => {
      expect(getAdjacentPieces(35, 5, 5, 6)).toStrictEqual({
        top: 29,
        left: 34
      });
    });
  });

  describe('test getAdjacentPieces with 64 piece puzzle', () => {
    test('gets adjacent pieces of piece 0', () => {
      expect(getAdjacentPieces(0, 0, 0, 8)).toStrictEqual({
        right: 1,
        bottom: 8
      });
    });

    test('gets adjacent pieces of piece 20', () => {
      expect(getAdjacentPieces(20, 3, 2, 8)).toStrictEqual({
        top: 12,
        right: 21,
        bottom: 28,
        left: 19
      });
    });

    test('gets adjacent pieces of piece 35', () => {
      expect(getAdjacentPieces(35, 3, 4, 8)).toStrictEqual({
        top: 27,
        right: 36,
        bottom: 43,
        left: 34
      });
    });

    test('gets adjacent pieces of piece 48', () => {
      expect(getAdjacentPieces(48, 0, 6, 8)).toStrictEqual({
        top: 40,
        right: 49,
        bottom: 56
      });
    });

    test('gets adjacent pieces of piece 56', () => {
      expect(getAdjacentPieces(56, 0, 7, 8)).toStrictEqual({
        top: 48,
        right: 57
      });
    });

    test('gets adjacent pieces of piece 63', () => {
      expect(getAdjacentPieces(63, 7, 7, 8)).toStrictEqual({
        top: 55,
        left: 62
      });
    });
  });
});
