import { ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  wrapperId: string;
}

export default function ModalPortal({ children, wrapperId }: PortalProps) {
  const [modalWrapperEl, setModalWrapperEl] = useState<Element | null>(null);

  useLayoutEffect(() => {
    let wrapperEl = document.querySelector(`#modals #${wrapperId}`);
    let createdNow = false;

    if (!wrapperEl) {
      wrapperEl = document.createElement('div');
      wrapperEl.setAttribute('id', wrapperId);
      const modals = document.querySelector('#modals')!;
      modals.appendChild(wrapperEl);
      createdNow = true;
    }

    setModalWrapperEl(wrapperEl);

    return () => {
      if (createdNow && wrapperEl?.parentNode) {
        wrapperEl.parentNode.removeChild(wrapperEl);
      }
    };
  }, [wrapperId]);

  if (!modalWrapperEl) return null;

  return createPortal(children, modalWrapperEl);
}
