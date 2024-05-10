import { useEffect, useState } from 'react';

const breakpoints = {
  '2xl': 1536,
  xl: 1280,
  lg: 1024,
  md: 768,
  sm: 640,
};

type allBreakpoints = keyof typeof breakpoints;

const breakpointsAsArray = Object.entries(breakpoints).sort(
  (a, b) => b[1] - a[1],
) as [allBreakpoints, number][];

export default function useResize() {
  const [breakpoint, setBreakpoint] = useState<allBreakpoints>(() =>
    calculateBreakpoint(window.innerWidth),
  );

  function calculateBreakpoint(w: number): allBreakpoints {
    for (const [name, min] of breakpointsAsArray) {
      if (w >= min) {
        return name;
      }
    }
    return 'sm';
  }

  useEffect(() => {
    const resizeHandler = (e: UIEvent) => {
      if (e.target instanceof Window) {
        const w = e.target.innerWidth;
        setBreakpoint(calculateBreakpoint(w));
      }
    };
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return breakpoint;
}
