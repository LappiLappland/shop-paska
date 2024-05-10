import { act, render } from '@testing-library/react';
import ButtonText from './ButtonText';

describe('Button component', () => {
  test('renders button with default primary color', () => {
    const { container } = render(<ButtonText>Click me</ButtonText>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders button with secondary color', () => {
    const { container } = render(<ButtonText color="secondary">Click me</ButtonText>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders button with tertiary color', () => {
    const { container } = render(<ButtonText color="tertiary">Click me</ButtonText>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders disabled button', () => {
    const { container } = render(<ButtonText disabled>Click me</ButtonText>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('calls onClick handler when button is clicked', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<ButtonText onClick={onClick}>Click me</ButtonText>);
    const button = getByRole('button');
    act(() => {
      button.click();
    })
    expect(onClick).toHaveBeenCalled();
  });
});