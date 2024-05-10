import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import ButtonText from './ButtonText';
import ArrowIcon from './icons/ArrowIcon';

interface AccordionProps {
  children: ReactNode;
  titles: string[];
  titleClassname?: string;
}

export default function Accordion({
  children,
  titles,
  titleClassname = '',
}: AccordionProps) {
  const tabs: ReactNode[] = Array.isArray(children) ? children : [children];

  const [tabsState, setTabsState] = useState(() => tabs.map(() => false));
  const tabsHeights = useRef<number[]>(tabs.map(() => 0));

  useEffect(() => {
    setTabsState(() => tabs.map(() => false));
  }, [children])

  const computeTabHeight = useCallback(
    (node: HTMLDivElement | null, i: number) => {
      if (!node) return;
      tabsHeights.current[i] = node.getBoundingClientRect().height;
    },
    [],
  );

  function changeTabState(index: number) {
    const clone = [...tabsState];
    clone[index] = !clone[index];
    setTabsState(clone);
  }

  const tabsEl = tabs.map((tab, i) => {
    const isOpened = tabsState[i];
    return (
      <div className="border-t border-outline-variant last:border-b" key={i}>
        <ButtonText
          className="flex w-full cursor-pointer items-center justify-between px-3 py-3 text-label-large"
          onClick={() => changeTabState(i)}
        >
          <span className={titleClassname}>{titles[i]}</span>
          <span>
            <ArrowIcon
              className={`
              fill-primary transition-transform duration-300
              ${isOpened ? 'duration-300 ease-emphasized-declerate' : 'duration-200 ease-emphasized-acclerate'}
              `}
              direction={isOpened ? 'up' : 'down'}
            />
          </span>
        </ButtonText>
        <div
          className={`overflow-hidden pl-3 ${isOpened ? 'mb-3' : ''} transition-height duration-300 ease-in-out`}
          style={{ maxHeight: isOpened ? tabsHeights.current[i] : 0 }}
        >
          <div className="" ref={(node) => computeTabHeight(node, i)}>
            {tab}
          </div>
        </div>
      </div>
    );
  });

  return <div>{tabsEl}</div>;
}
