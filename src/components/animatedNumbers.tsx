import { useEffect, useRef, useState } from 'react';
import animate, { getPoweredTiming } from '../helpers/animate';

interface AnimatedNumbersProps {
  value: number;
  extraText?: string;
  beforeText?: string;
  numberCallaback?: (num: number) => string | number;
}

export default function AnimatedNumbers({
  value,
  extraText = '',
  beforeText = '',
  numberCallaback,
}: AnimatedNumbersProps) {
  const spanEl = useRef<HTMLSpanElement>(null);
  const [innerValue, setInnerValue] = useState(value);
  const curValue = useRef(value);

  useEffect(() => {
    if (value !== innerValue) {
      const diff = value - innerValue;
      animate({
        duration: 250,
        timing: getPoweredTiming(),
        action: (progress) => {
          curValue.current = Math.floor(innerValue + diff * progress);
          if (!spanEl.current) return;
          spanEl.current.innerText =
            beforeText +
            (numberCallaback
              ? numberCallaback(curValue.current)
              : curValue.current) +
            extraText;
        },
        onEnd: () => {
          setInnerValue(curValue.current);
        },
      });
    }
  }, [value]);

  return (
    <span ref={spanEl}>
      {beforeText}
      {numberCallaback ? numberCallaback(innerValue) : innerValue}
      {extraText}
    </span>
  );
}
