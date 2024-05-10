import { act, render } from '@testing-library/react';
import ButtonToggle from './ButtonToggle';

describe('ButtonToggle component', () => {
  test('renders button toggle with default state', () => {
    const { container } = render(<ButtonToggle>Toggle</ButtonToggle>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders button toggle as active', () => {
    const { container } = render(
      <ButtonToggle active>Toggle</ButtonToggle>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders button toggle as disabled', () => {
    const { container } = render(
      <ButtonToggle disabled>Toggle</ButtonToggle>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('calls onClick handler when button toggle is clicked', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <ButtonToggle onClick={onClick}>Toggle</ButtonToggle>
    );
    const button = getByRole('button');
    act(() => {
      button.click();
    })
    expect(onClick).toHaveBeenCalled();
  });
});