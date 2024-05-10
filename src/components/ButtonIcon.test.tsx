import { act, render } from '@testing-library/react';
import ButtonIcon from './ButtonIcon';
import ArrowIcon from './icons/ArrowIcon';

describe('ButtonIcon component', () => {
  test('renders button icon with default size', () => {
    const { container } = render(
      <ButtonIcon>
        <ArrowIcon />
      </ButtonIcon>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders button icon with smaller size', () => {
    const { container } = render(
      <ButtonIcon size="small">
        <ArrowIcon />
      </ButtonIcon>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders button icon with different numbers', () => {
    const { container, rerender } = render(
      <ButtonIcon number={0}>
        <ArrowIcon />
      </ButtonIcon>
    );
    expect(container.firstChild).toMatchSnapshot();

    rerender(
      <ButtonIcon number={1}>
        <ArrowIcon />
      </ButtonIcon>
    );
    expect(container.firstChild).toMatchSnapshot();

    rerender(
      <ButtonIcon number={10}>
        <ArrowIcon />
      </ButtonIcon>
    );
    expect(container.firstChild).toMatchSnapshot();

    rerender(
      <ButtonIcon number={100}>
        <ArrowIcon />
      </ButtonIcon>
    );
    expect(container.firstChild).toMatchSnapshot();

    rerender(
      <ButtonIcon number={1000}>
        <ArrowIcon />
      </ButtonIcon>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('calls onClick handler when button icon is clicked', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <ButtonIcon onClick={onClick}>
        <ArrowIcon />
      </ButtonIcon>
    );
    const buttonIcon = getByRole('button');
    act(() => {
      buttonIcon.click();
    })
    expect(onClick).toHaveBeenCalled();
  });
});
