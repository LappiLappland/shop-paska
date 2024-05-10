import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import ModalPortal from './ModalPortal';

let portalRoot: HTMLDivElement;
let modalsRoot: HTMLDivElement;

beforeAll(() => {
  portalRoot = document.createElement('div');
  modalsRoot = document.createElement('div');
  modalsRoot.id = 'modals';
  modalsRoot.dataset['testid'] = 'modals-root'
  document.body.appendChild(modalsRoot);
  document.body.appendChild(portalRoot);
});

afterAll(() => {
  document.body.removeChild(portalRoot);
  document.body.removeChild(modalsRoot);
});

describe('ModalPortal', () => {

  test('renders portal correctly', () => {
    const wrapperId = 'test-wrapper';
    const childText = 'Testing';
    
    const wrapper = screen.getByTestId('modals-root');
    
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.childNodes.length).toEqual(0);

    let firstUnmount = () => {};
    act(() => {
      const { unmount } = render(
        <ModalPortal wrapperId={wrapperId}>
          <div>{childText}</div>
        </ModalPortal>,
      );
      firstUnmount = unmount;
    });
    
    const firstModalWrapper = screen.getByText('', {selector: '#' + wrapperId});
    const firstModalContent = screen.getByText(childText);

    expect(wrapper).toContainElement(firstModalWrapper);
    expect(firstModalWrapper).toContainElement(firstModalContent);
    
    let secondUnmount = () => {};
    act(() => {
      const { unmount } = render(
        <ModalPortal wrapperId={wrapperId + '2'}>
          <div>{childText + '2'}</div>
        </ModalPortal>,
      );
      secondUnmount = unmount;
    });

    const secondModalWrapper = screen.getByText('', {selector: '#' + wrapperId + '2'});
    const secondModalContent = screen.getByText(childText + '2');
    
    expect(wrapper).toContainElement(firstModalWrapper);
    expect(firstModalWrapper).toContainElement(firstModalContent);
    expect(wrapper).toContainElement(secondModalWrapper);
    expect(secondModalWrapper).toContainElement(secondModalContent);

    firstUnmount();
    expect(wrapper).not.toContainElement(firstModalWrapper);
    expect(firstModalContent).not.toBeInTheDocument();
    expect(wrapper).toContainElement(secondModalWrapper);
    expect(secondModalWrapper).toContainElement(secondModalContent);
    
    secondUnmount();
    expect(wrapper).not.toContainElement(firstModalWrapper);
    expect(firstModalContent).not.toBeInTheDocument();
    expect(wrapper).not.toContainElement(secondModalWrapper);
    expect(secondModalContent).not.toBeInTheDocument();

  });
});