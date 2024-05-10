type TimingFunction = (fraction: number) => number;
type ActionFunction = (progress: number) => void;

interface AnimationObject {
  duration: number;
  timing: TimingFunction;
  action: ActionFunction;
  onEnd?: () => void;
}

export default function animate({
  duration,
  timing,
  action,
  onEnd,
}: AnimationObject) {
  const start = performance.now();
  let animationId: number;

  const animateFrame = (time: number) => {
    let fraction = (time - start) / duration;
    if (fraction > 1) {
      fraction = 1;
    }

    const progress = timing(fraction);

    action(progress);

    if (fraction < 1) {
      animationId = requestAnimationFrame(animateFrame);
    } else {
      if (onEnd) onEnd();
    }
  };

  animationId = requestAnimationFrame(animateFrame);

  const stopAnimation = () => {
    cancelAnimationFrame(animationId);
  };

  return stopAnimation;
}

export function getLinearTiming() {
  return (fraction: number) => fraction;
}

export function getPoweredTiming(power: number = 2) {
  return (fraction: number) => fraction ** power;
}

export function getEaseOut(timing: TimingFunction) {
  return (fraction: number) => 1 - timing(1 - fraction);
}

export function getEaseInOut(timing: TimingFunction) {
  return (fraction: number) => {
    if (fraction < 0.5) return timing(2 * fraction) / 2;
    else return (2 - timing(2 * (1 - fraction))) / 2;
  };
}

export const testing = {
  animate,
  getLinearTiming,
  getPoweredTiming,
  getEaseOut,
  getEaseInOut,
};
