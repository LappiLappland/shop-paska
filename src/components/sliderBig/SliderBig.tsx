import { ReactNode, useEffect, useRef, useState } from 'react';
import ScrollControl from '../ScrollControl';

interface SliderBigProps {
  children?: ReactNode | ReactNode[];
  sliderSwitchTime?: number;
}

export default function SliderBig({
  children,
  sliderSwitchTime,
}: SliderBigProps) {
  const [curSlide, setCurSlide] = useState(0);

  const switchTimer = useRef<ReturnType<typeof setTimeout> | undefined>();

  useEffect(() => {
    if (sliderSwitchTime)
      switchTimer.current = setTimeout(
        () => switchSlide(curSlide + 1),
        sliderSwitchTime,
      );
    return () => {
      clearTimeout(switchTimer.current);
    };
  }, [sliderSwitchTime]);

  const sliderItems = Array.isArray(children) ? children : [children];
  const sliderAmount = sliderItems.length;

  const slidersListEl = sliderItems.map((e, i) => {
    return (
      <div
        className={`absolute left-0 top-0 flex h-full w-full items-center justify-center opacity-0 transition-opacity duration-200 ease-standart-acclerate ${i === curSlide ? 'opacity-100' : ''}`}
        key={i}
      >
        {e}
      </div>
    );
  });

  const dotsListEl = sliderItems.map((e, i) => {
    return (
      <button
        className={`mr-1 h-4 w-4 rounded-full border-on-surface-variant ${i === curSlide ? 'bg-on-surface-variant' : 'border bg-surface'}`}
        key={i}
        onClick={() => switchSlide(i)}
        aria-label={"Select picture " + (i + 1)}
      />
    );
  });

  function switchSlide(to: number) {
    if (to >= sliderAmount) {
      to = 0;
    } else if (to < 0) {
      to = sliderAmount - 1;
    }
    setCurSlide(to);
    clearTimeout(switchTimer.current);
    if (sliderSwitchTime)
      switchTimer.current = setTimeout(
        () => switchSlide(to + 1),
        sliderSwitchTime,
      );
  }

  return (
    <div className="relative h-full w-full bg-surface-container-high">
      <div className="relative flex h-full w-full items-center justify-center">
        {slidersListEl}
      </div>
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-between p-2">
        <ScrollControl
          className="shadow-level-2"
          direction="left"
          colors='secondary'
          onClick={() => switchSlide(curSlide - 1)}
        />
        <div className="justify-center self-end ">{dotsListEl}</div>
        <ScrollControl
          className="shadow-level-2"
          direction="right"
          colors='secondary'
          onClick={() => switchSlide(curSlide + 1)}
        />
      </div>
    </div>
  );
}
