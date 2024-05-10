import { ReactNode, useEffect, useRef, useState } from 'react';

import { withinBoundaries } from '../../helpers/dom';
import useResize from '../../hooks/useResize';
import ScrollControl from '../ScrollControl';

interface SliderLongProps {
  children: ReactNode[];
  showSlides: {
    sm: number;
    md: number;
    lg: number;
  };
}

export default function SliderLong({ children, showSlides }: SliderLongProps) {
  const [dragging, setDragging] = useState<null | number>(null);
  const sliderDelay = useRef<'1s' | '0s'>('0s');

  const breakpoint = useResize();

  const slidersEl = useRef<HTMLUListElement>(null);
  const dotsEl = useRef<HTMLUListElement>(null);

  const curPos = useRef(0);
  const draggingDiff = useRef(0);

  //const sliderItems = [placeholder, placeholder2, placeholder, placeholder3, placeholder2, placeholder3, placeholder, placeholder, placeholder, placeholder2, placeholder3, placeholder, placeholder3, placeholder3, placeholder3, placeholder3, placeholder3, placeholder3];
  //const sliderLimit = 6;
  const sliderLimit = getSliderLimit();
  const perSlide = 100 / sliderLimit;
  const sliderItems = children;
  const slidePages = Math.ceil(sliderItems.length / sliderLimit);

  function getSliderLimit() {
    switch (breakpoint) {
      case 'sm':
        return showSlides.sm;
      case 'md':
        return showSlides.md;
      case 'lg':
      default:
        return showSlides.lg;
    }
  }

  //Setup document-level mouse events
  useEffect(() => {
    const handlerDown = (e: MouseEvent) => mouseDownHandler(e);
    const handlerUp = () => mouseUpHandler();
    const handlerMove = (e: MouseEvent) => mouseMoveHandler(e);
    document.addEventListener('mousedown', handlerDown);
    document.addEventListener('mouseup', handlerUp);
    document.addEventListener('mousemove', handlerMove);
    return () => {
      document.removeEventListener('mousedown', handlerDown);
      document.removeEventListener('mouseup', handlerUp);
      document.removeEventListener('mousemove', handlerMove);
    };
  }, [mouseDownHandler, mouseUpHandler, mouseMoveHandler]);

  useEffect(() => {
    if (!dragging && sliderDelay.current !== '0s') {
      const curRealPos = getRealCurPos();
      draggingDiff.current = 0;
      snapSlider(curRealPos);
    }
  }, [dragging, breakpoint]);

  useEffect(() => {
    sliderDelay.current = '1s';
  }, []);

  function getRealCurPos() {
    return curPos.current + 100 - draggingDiff.current;
  }

  function setCurPos(a?: number) {
    if (a !== undefined) curPos.current = a;
    // || curPos.current === slidePages * 100
    let instantAnimation = false;
    const curPosAndDiff = curPos.current - draggingDiff.current;
    if (curPosAndDiff < -50) {
      // console.log(curPos.current, 100 * slidePages, 100 * slidePages + curPos.current)
      curPos.current = 100 * slidePages + curPos.current;
      instantAnimation = true;
    } else if (curPosAndDiff > (slidePages - 1) * 100 + 50) {
      curPos.current = curPos.current - slidePages * 100;
      instantAnimation = true;
    }
    if (slidersEl.current) {
      if (instantAnimation) {
        sliderDelay.current = '0s';
        slidersEl.current.style.transitionDuration = '0s';
        requestAnimationFrame(() => {
          if (slidersEl.current) {
            sliderDelay.current = '1s';
            slidersEl.current.style.transitionDuration = '1s';
          }
        });
      }
      slidersEl.current.style.transform = `translate3d(${'-' + getRealCurPos()}%, 0px, 0px)`;
    }
  }

  function getSliderPage() {
    if (curPos.current < 0) {
      return slidePages - 1;
    } else if (curPos.current > 100 * (slidePages - 1)) {
      return 0;
    } else {
      return Math.floor(curPos.current / 100);
    }
  }

  function updateDots() {
    if (dotsEl.current) {
      const dots = dotsEl.current.children;
      const page = getSliderPage();
      for (let i = 0; i < dots.length; i++) {
        const e = dots.item(i)!.children[0]!.classList;
        if (i === page) {
          e.add('bg-on-surface-variant');
        } else {
          e.remove('bg-on-surface-variant');
        }
      }
    }
  }

  function switchToPage(to: number) {
    if (to === -1) {
      to = -1;
    } else if (to === slidePages) {
      to = slidePages;
    } else if (to > slidePages) {
      to = 0;
    } else if (to < 0) {
      to = slidePages - 1;
    }
    //setCurPos(to * 100);
    //curPos.current = to * 100;
    //setCurPos(to * 100);
    curPos.current = to * 100;
    slidersEl.current!.style.transform = `translate3d(${'-' + getRealCurPos()}%, 0px, 0px)`;
    updateDots();
  }

  function snapSlider(curRelPos: number) {
    const unaligned = curRelPos % perSlide;
    const toChange =
      unaligned >= perSlide / 2 ? perSlide - unaligned : -unaligned;
    //console.log(curRelPos, unaligned, toChange, curRelPos + toChange, curRelPos - 100 + toChange);
    setCurPos(curRelPos - 100 + toChange);
    updateDots();
  }

  function mouseDownHandler(e: MouseEvent) {
    if (!slidersEl.current) return;
    if (!withinBoundaries(e, slidersEl.current)) return;
    if (curPos.current === -100 || curPos.current === slidePages * 100) return;

    setDragging(e.clientX);
  }

  function mouseUpHandler() {
    if (!slidersEl.current) return;
    if (!dragging) return;

    //! Old method, remove later
    //const ch = getRealCurPos() % 100;
    //const threshold = 10; // Page won't change if swipe was shorther than this
    //console.log(threshold, ch, 100 - threshold, getRealCurPos(), getRealCurPos() % 100);
    // let movePage = 0;
    // if (ch >= threshold && ch <= 50) {
    //   movePage = 1;
    // } else if (ch < 100 - threshold && ch > 50) {
    //   movePage = -1;
    // }

    setDragging(null);
    //switchToPage(getSliderPage() + movePage);
  }

  function mouseMoveHandler(e: MouseEvent) {
    if (dragging === null) return;
    if (!slidersEl.current) return;
    const listRect = slidersEl.current.getBoundingClientRect();
    const diff = ((e.clientX - dragging) / listRect.width) * 100;
    //setDraggingDiff(diff);
    draggingDiff.current = diff;
    setCurPos();
  }

  function generateDotsElements() {
    const dotsListEl = [];
    for (let i = 0; i < slidePages; i++) {
      dotsListEl.push(
        <li className={`mr-1 flex items-center`} key={i}>
          <button
            className={`h-4 w-4 rounded-full border border-on-surface-variant ${i === getSliderPage() ? 'bg-on-surface-variant' : ''}`}
            onClick={() => switchToPage(i)}
            aria-label={"Select picture " + (i + 1)}
          />
        </li>,
      );
    }
    return dotsListEl;
  }

  const slidersListEl = sliderItems.map((e, i) => {
    //? Might need to put draggable="false" on every possible child img
    return (
      <li
        className="mx-1 flex shrink-0 select-none items-center justify-center"
        style={{ width: `calc(100% / ${sliderLimit} - 0.5rem)` }}
        key={i}
      >
        {e}
      </li>
    );
  });

  return (
    <div className="flex h-full w-full flex-col overflow-hidden py-6">
      <ul
        className={`slider-animate flex h-full select-none ${dragging ? 'slider-smooth-animate' : ''}`}
        style={{
          transform: `translate3d(${'-' + getRealCurPos()}%, 0px, 0px)`,
          transitionDuration: sliderDelay.current,
        }}
        ref={slidersEl}
      >
        {slidersListEl.slice(-sliderLimit)}
        {slidersListEl}
        {slidersListEl.slice(0, sliderLimit)}
      </ul>
      <div className="flex w-full items-center justify-center gap-1 p-1">
        <ScrollControl
          direction="left"
          onClick={() => switchToPage(getSliderPage() - 1)}
        />
        <ul className="flex h-full" ref={dotsEl}>
          {generateDotsElements()}
        </ul>
        <ScrollControl
          direction="right"
          onClick={() => switchToPage(getSliderPage() + 1)}
        />
      </div>
    </div>
  );
}
