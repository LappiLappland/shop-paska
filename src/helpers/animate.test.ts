import { testing } from './animate';

const { animate, getLinearTiming, getEaseOut, getPoweredTiming } = testing;

jest.useFakeTimers();

const mockRequestAnimationFrame = (
  callback: FrameRequestCallback,
): NodeJS.Timeout => {
  return setTimeout(() => callback(performance.now()), 1000 / 60);
};

const mockCancelAnimationFrame = (id: number) => {
  clearTimeout(id);
};

let spyRequestAnimationFrame: jest.SpyInstance;
let spyCancelAnimationFrame: jest.SpyInstance;
let spyPerfomanceNow: jest.SpyInstance;

let currentTime = 0;

const advanceTime = (ms: number) => {
  currentTime += ms;
  jest.advanceTimersByTime(ms);
};

beforeAll(() => {
  spyRequestAnimationFrame = jest.spyOn(window, 'requestAnimationFrame');
  spyRequestAnimationFrame.mockImplementation(mockRequestAnimationFrame);

  spyCancelAnimationFrame = jest.spyOn(window, 'cancelAnimationFrame');
  spyCancelAnimationFrame.mockImplementation(mockCancelAnimationFrame);

  spyPerfomanceNow = jest.spyOn(performance, 'now');
  spyPerfomanceNow.mockImplementation(() => currentTime);
});

afterAll(() => {
  spyRequestAnimationFrame.mockRestore();
  spyCancelAnimationFrame.mockRestore();
  spyPerfomanceNow.mockRestore();
});

afterEach(() => {
  currentTime = 0;
});

describe('animate', () => {
  describe('animation', () => {
    test('should call the action function with the correct progress', () => {
      const action = jest.fn();
      const stopAnimation = animate({
        duration: 1000,
        timing: getLinearTiming(),
        action,
      });

      advanceTime(500);

      expect(action).toHaveBeenCalledWith(0.5);

      advanceTime(500);

      expect(action).toHaveBeenCalledWith(1);

      expect(stopAnimation).not.toThrow();
    });

    test('should stop animation when stopAnimation is called', () => {
      const action = jest.fn();
      const stopAnimation = animate({
        duration: 1000,
        timing: getLinearTiming(),
        action,
      });

      advanceTime(1000 / 60);

      expect(action).toHaveBeenCalled();

      stopAnimation();

      advanceTime(500);

      expect(action).toHaveBeenCalledTimes(1);
    });

    test('should call onEnd callback if provided', () => {
      const action = jest.fn();
      const onEnd = jest.fn();
      animate({ duration: 1000, timing: getLinearTiming(), action, onEnd });

      advanceTime(1000);

      expect(onEnd).toHaveBeenCalled();
    });
  });

  describe('timing functions', () => {
    test('getLinearTiming returns correct values', () => {
      const linearTiming = getLinearTiming();
      expect(linearTiming(0)).toBe(0);
      expect(linearTiming(0.5)).toBe(0.5);
      expect(linearTiming(1)).toBe(1);
    });

    test('getPoweredTiming returns correct values with default power', () => {
      const poweredTiming = getPoweredTiming();
      expect(poweredTiming(0)).toBe(0);
      expect(poweredTiming(0.5)).toBe(0.25);
      expect(poweredTiming(1)).toBe(1);
    });

    test('getPoweredTiming returns correct values with custom power', () => {
      const poweredTiming = getPoweredTiming(3);
      expect(poweredTiming(0)).toBe(0);
      expect(poweredTiming(0.5)).toBe(0.125);
      expect(poweredTiming(1)).toBe(1);
    });

    test('getEaseOut returns correct values', () => {
      const linearTiming = getLinearTiming();
      const easeOutTiming = getEaseOut(linearTiming);
      expect(easeOutTiming(0)).toBe(0);
      expect(easeOutTiming(0.5)).toBeCloseTo(0.5);
      expect(easeOutTiming(1)).toBe(1);
    });
  });
});
