import { fireEvent, render, screen } from '@testing-library/react';
import ModalWindow from './ModalWindow';

let portalRoot: HTMLDivElement;
let modalsRoot: HTMLDivElement;

const onBeginOpeningMock = jest.fn();
const onBeginClosingMock = jest.fn();
const onClosedWindowMock = jest.fn();

const mockRequestAnimationFrame = (call: () => void) => {call()};
let spyRequestAnimationFrame: jest.SpyInstance;

beforeAll(() => {
  spyRequestAnimationFrame = jest.spyOn(window, 'requestAnimationFrame');
  spyRequestAnimationFrame.mockImplementation(mockRequestAnimationFrame);
});

afterAll(() => {
  spyRequestAnimationFrame.mockRestore();
});

beforeEach(() => {
  portalRoot = document.createElement('div');
  modalsRoot = document.createElement('div');
  modalsRoot.id = 'modals';
  modalsRoot.dataset['testid'] = 'modals-root'
  document.body.appendChild(modalsRoot);
  document.body.appendChild(portalRoot);

  jest.clearAllMocks();
});

afterEach(() => {
  document.body.removeChild(portalRoot);
  document.body.removeChild(modalsRoot);
});

describe('ModalWindow', () => {

  test('renders modal window when isOpened is true', () => {
    render(
      <ModalWindow
        id="test-modal"
        isOpened={true}
        onBeginOpening={onBeginOpeningMock}
        onBeginClosing={onBeginClosingMock}
        onClosedWindow={onClosedWindowMock}
      >
        <div>Modal Content</div>
      </ModalWindow>
    );

    const modalContent = screen.getByText('Modal Content');
    expect(modalContent).toBeInTheDocument();
  });

  test('does not render modal window when isOpened is false', () => {
    render(
      <ModalWindow
        id="test-modal"
        isOpened={false}
        onBeginOpening={onBeginOpeningMock}
        onBeginClosing={onBeginClosingMock}
        onClosedWindow={onClosedWindowMock}
      >
        <div>Modal Content</div>
      </ModalWindow>
    );

    const modalContent = screen.queryByText('Modal Content');
    expect(modalContent).not.toBeInTheDocument();
  });

  test('closes modal window when isOpened changes', () => {
    const { rerender } = render(
      <ModalWindow
        id="test-modal"
        windowClassName='transition-opacity'
        isOpened={true}
        onClosedWindow={onClosedWindowMock}
      >
        <div>Modal Content</div>
      </ModalWindow>
    );

    const modalContent = screen.getByText('Modal Content');
    expect(modalContent).toBeInTheDocument();

    rerender(
      <ModalWindow
        id="test-modal"
        windowClassName='transition-opacity'
        isOpened={false}
        onClosedWindow={onClosedWindowMock}
      >
        <div>Modal Content</div>
      </ModalWindow>
    );

    expect(modalContent).not.toBeInTheDocument();
  })
  
  test('renders modal control when addButton is set', () => {
    render(
      <ModalWindow
        id="test-modal"
        isOpened={true}
        addButton
      >
        <div>Modal Content</div>
      </ModalWindow>
    );

    const modalContent = screen.getByText('Modal Content');
    expect(modalContent).toBeInTheDocument();

    const buttonControl = screen.getByRole('button');
    expect(buttonControl).toBeInTheDocument();
  });
  
  test('does not render modal control when addButton is not set', () => {
    render(
      <ModalWindow
        id="test-modal"
        isOpened={true}
      >
        <div>Modal Content</div>
      </ModalWindow>
    );

    const modalContent = screen.getByText('Modal Content');
    expect(modalContent).toBeInTheDocument();

    const buttonControl = screen.queryByRole('button');
    expect(buttonControl).not.toBeInTheDocument();
  });

  test('triggers event on opening start', () => {
    render(
      <ModalWindow
        id="test-modal"
        isOpened={true}
        onBeginOpening={onBeginOpeningMock}
        onBeginClosing={onBeginClosingMock}
        onClosedWindow={onClosedWindowMock}
      >
        <div>Modal Content</div>
      </ModalWindow>
    );

    expect(onBeginOpeningMock).toHaveBeenCalled();

  }) 

  test('triggers event on closing start', () => {
    const {rerender} = render(
      <ModalWindow
        id="test-modal"
        isOpened={true}
        onBeginOpening={onBeginOpeningMock}
        onBeginClosing={onBeginClosingMock}
        onClosedWindow={onClosedWindowMock}
      >
        <div>Modal Content</div>
      </ModalWindow>
    );

    rerender(
      <ModalWindow
        id="test-modal"
        windowClassName='transition-opacity'
        isOpened={false}
        onBeginOpening={onBeginOpeningMock}
        onBeginClosing={onBeginClosingMock}
        onClosedWindow={onClosedWindowMock}
      >
        <div>Modal Content</div>
      </ModalWindow>
    );

    expect(onBeginClosingMock).toHaveBeenCalled();

  }) 

  test('triggers event on closing window by mouse', () => {
    render(
      <>
        <div>Outside Content</div>
        <ModalWindow
          id="test-modal"
          isOpened={true}
          onClosedWindow={onClosedWindowMock}
        >
          <div>Modal Content</div>
        </ModalWindow>
      </>
    );

    const modalContent = screen.getByText('Modal Content');
    expect(modalContent).toBeInTheDocument();
    const outsideContent = screen.getByText('Outside Content');

    fireEvent.mouseUp(outsideContent);
    expect(onClosedWindowMock).toHaveBeenCalled();
  }) 

  test('triggers event on closing window by keyboard', () => {
    render(
      <ModalWindow
        id="test-modal"
        isOpened={true}
        onClosedWindow={onClosedWindowMock}
      >
        <div>Modal Content</div>
      </ModalWindow>
    );

    const modalContent = screen.getByText('Modal Content');
    expect(modalContent).toBeInTheDocument();

    fireEvent.keyDown(modalContent, {key: 'Escape'});
    expect(onClosedWindowMock).toHaveBeenCalled();
  }) 

  test('triggers event on closing window by control button', () => {
    render(
      <ModalWindow
        id="test-modal"
        isOpened={true}
        addButton
        onClosedWindow={onClosedWindowMock}
      >
        <div>Modal Content</div>
      </ModalWindow>
    );

    const modalContent = screen.getByText('Modal Content');
    expect(modalContent).toBeInTheDocument();

    const closeControl = screen.getByRole('button');
    fireEvent.click(closeControl);

    expect(onClosedWindowMock).toHaveBeenCalled();
  }) 

});
