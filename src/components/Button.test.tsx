import { act, render } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  test('renders button with default primary color', () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders button with secondary color', () => {
    const { container } = render(<Button color="secondary">Click me</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders button with tertiary color', () => {
    const { container } = render(<Button color="tertiary">Click me</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders disabled button', () => {
    const { container } = render(<Button disabled>Click me</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('calls onClick handler when button is clicked', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<Button onClick={onClick}>Click me</Button>);
    const button = getByRole('button');
    act(() => {
      button.click();
    })
    expect(onClick).toHaveBeenCalled();
  });
});