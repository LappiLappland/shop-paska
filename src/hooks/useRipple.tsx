import { CSSProperties, RefObject, useEffect, useRef, useState } from 'react';

interface RippleOptions {
  color?: string;
  clickRef?: RefObject<HTMLElement>;
  static?: boolean;
  diameter?: number;
  className?: string;
}

export default function useRipple<T extends HTMLElement>(
  ref: RefObject<T>,
  options: RippleOptions,
) {
  const [ripples, setRipples] = useState<CSSProperties[]>([]);

  const removeTimer = useRef<NodeJS.Timeout | undefined>();

  const clickRef = 'clickRef' in options ? options.clickRef! : ref;

  useEffect(() => {
    if (ref.current && clickRef.current) {
      const clickHandler = (e: MouseEvent) => {
        const rect = ref.current!.getBoundingClientRect();

        let posX: number;
        let posY: number;
        if (options.static) {
          posX = rect.left - rect.x + rect.width / 2;
          posY = rect.top - rect.y + rect.height / 2;
        } else {
          posX = e.clientX - rect.left;
          posY = e.clientY - rect.top;
        }
        const diameter =
          options.diameter ?? Math.min(rect.height / 2, rect.width / 2);

        setRipples([
          ...ripples,
          {
            top: posY - diameter / 2,
            left: posX - diameter / 2,
            height: diameter,
            width: diameter,
          },
        ]);
      };

      clickRef.current.addEventListener('click', clickHandler);

      clearTimeout(removeTimer.current);
      removeTimer.current = setTimeout(() => {
        setRipples([]);
      }, 500);

      return () => {
        clickRef.current?.removeEventListener('click', clickHandler);
        clearTimeout(removeTimer.current);
      };
    }
  }, [ref, options.clickRef, removeTimer, ripples]);

  const ripplesEl = ripples.map((ripple, i) => {
    return (
      <span
        key={i}
        className={`absolute scale-0 animate-ripple rounded-full opacity-25 ${options.color ?? 'bg-on-primary'}`}
        style={{
          ...ripple,
        }}
      />
    );
  });

  return (
    <span
      className={`absolute inset-0 h-full w-full overflow-hidden ${options.className ?? ''}`}
    >
      {ripplesEl}
    </span>
  );
}
