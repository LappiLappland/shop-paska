import {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import CloseControl from './CloseControl';
import ModalPortal from './ModalPortal';

type setStyleCallback = (style: CSSProperties) => void;

interface ModalWindowProps {
  children: ReactNode;
  bgClassName?: string;
  windowClassName?: string;
  addButton?: boolean;
  id: string;
  isOpened: boolean;
  onClosedWindow?: () => void;
  onBeginOpening?: (window: HTMLElement | null, setStyle: setStyleCallback) => void;
  onBeginClosing?: (window: HTMLElement | null, setStyle: setStyleCallback) => void;
}

export default function ModalWindow({
  children,
  bgClassName,
  windowClassName,
  onBeginClosing,
  onBeginOpening,
  addButton = false,
  id,
  isOpened,
  onClosedWindow,
}: ModalWindowProps) {
  const [isClosed, setIsClosed] = useState(true);
  const [style, setStyle] = useState<CSSProperties>({});

  const modalEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closeKeyEvent = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (onClosedWindow) onClosedWindow()
      }
    };
    document.addEventListener('keydown', closeKeyEvent);

    const closeMouseEvent = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        !modalEl.current?.contains(e.target)
      ) {
        if (onClosedWindow) onClosedWindow();
      }
    };
    document.addEventListener('mouseup', closeMouseEvent);

    () => {
      document.removeEventListener('keydown', closeKeyEvent);
      document.removeEventListener('mouseup', closeMouseEvent);
    };
  }, [onClosedWindow]);

  useEffect(() => {
    if (isClosed) {
      setStyle({});
    }
  }, [isClosed]);

  const renderedCallback = useCallback((node: HTMLDivElement) => {
    if (node) {
      modalEl.current = node;
      if (onBeginOpening) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            onBeginOpening(node, setStyle);
          });
        });
      }
    }
  }, []);

  useEffect(() => {
    if (!isOpened) {
      if (onBeginClosing) onBeginClosing(modalEl.current, setStyle)
      else setIsClosed(true);
    } else {
      setIsClosed(false);
    }
  }, [isOpened, modalEl.current]);

  if (isClosed) return null;

  return (
    <ModalPortal wrapperId={id}>
      <div
        className={`
        fixed left-0 top-0 
        h-screen w-screen
        ${isOpened ? 'opened' : ''}
        ${bgClassName ? bgClassName : ''}
        `}
      >
        <div
          className={`
          relative
          ${windowClassName}
          `}
          ref={renderedCallback}
          onTransitionEnd={(e) => {
            if (!isOpened && e.currentTarget === e.target) setIsClosed(true);
          }}
          style={style}
        >
          {addButton && (
            <CloseControl
              className="absolute right-3 top-3 h-8 w-8 p-2"
              onClick={() => {
                if (onClosedWindow) onClosedWindow();
              }}
            />
          )}
          {children}
        </div>
      </div>
    </ModalPortal>
  );
}
