import { act, render } from '@testing-library/react';
import AnimatedNumbers from './animatedNumbers';

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

describe('AnimatedNumbers component', () => {
  test('displays the correct initial value', () => {
    const { getByText } = render(<AnimatedNumbers value={42} />);
    expect(getByText('42')).toBeInTheDocument();
  });

  test('displays extra text when provided', () => {
    const { getByText } = render(
      <AnimatedNumbers value={42} extraText=" extra" />,
    );
    expect(getByText('42 extra')).toBeInTheDocument();
  });

  test('displays before text when provided', () => {
    const { getByText } = render(
      <AnimatedNumbers value={42} beforeText="Before: " />,
    );
    expect(getByText('Before: 42')).toBeInTheDocument();
  });

  test('updates the displayed value when the "value" prop changes', () => {
    const { getByText, rerender } = render(<AnimatedNumbers value={0} />);
    act(() => {
      rerender(<AnimatedNumbers value={100} />);
    });

    act(() => advanceTime(1000));
    expect(getByText('100')).toBeInTheDocument();

    act(() => {
      rerender(<AnimatedNumbers value={999} />);
    });

    act(() => advanceTime(1000));
    expect(getByText('999')).toBeInTheDocument();
  });
});
