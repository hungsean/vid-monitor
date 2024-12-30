import { TimeData } from "./realtimeServices"

describe('TimeData', () =>
{
  describe('Constructor tests', () =>
  {
    test('should create TimeData with valid numbers', () =>
    {
      const time = new TimeData(12, 30, 20);
      expect(time.hours).toBe(12);
      expect(time.minutes).toBe(30);
      expect(time.seconds).toBe(20);
    });

    test('should handle single digit numbers', () =>
    {
      const time = new TimeData(9, 5, 6);
      expect(time.hours).toBe(9);
      expect(time.minutes).toBe(5);
      expect(time.seconds).toBe(6);
    });

    test('should handle invalid hour for negative', () =>
    {
      const time = new TimeData(-1, 30, 2);
      expect(time.hours).toBe(-1);
      expect(time.minutes).toBe(30);
      expect(time.seconds).toBe(2);
    });

    test('should handle invalid hour for over 24', () =>
    {
      const time = new TimeData(24, 30, 2);
      expect(time.hours).toBe(24);
      expect(time.minutes).toBe(30);
      expect(time.seconds).toBe(2);
    });

    test('should throw error for invalid minute', () =>
    {
      expect(() => new TimeData(12, 60, 6)).toThrow();
      expect(() => new TimeData(12, -1, 6)).toThrow();
    });

    test('shoudl throw error for invalid char', () =>
    {
      expect(() => new TimeData('a', 'b', 'c')).toThrow();
      expect(() => new TimeData('1', '2', '3')).toThrow();
    })
  });

  describe('Format tests', () =>
  {
    test('should format time correctly', () =>
    {
      const time = new TimeData(12, 30, 20);
      expect(time.toString()).toBe('12:30:20');
    });

    test('should pad single digits with zero', () =>
    {
      const time = new TimeData(9, 5, 0);
      expect(time.toString()).toBe('09:05:00');
    });
  });

  describe('Parse tests', () =>
  {
    test('should parse valid time string', () =>
    {
      const time = TimeData.fromString('12:30:20');
      expect(time.hours).toBe(12);
      expect(time.minutes).toBe(30);
      expect(time.seconds).toBe(20);
    });

    test('should parse padded time string', () =>
    {
      const time = TimeData.fromString('09:05:00');
      expect(time.hours).toBe(9);
      expect(time.minutes).toBe(5);
      expect(time.seconds).toBe(0);
    });

    test('should throw error for invalid format', () =>
    {
      expect(() => TimeData.fromString('12-30-00')).toThrow();
      expect(() => TimeData.fromString('25:00:60')).toThrow();
      expect(() => TimeData.fromString('12:60:00')).toThrow();
      expect(() => TimeData.fromString('abc')).toThrow();
    });
  });
});