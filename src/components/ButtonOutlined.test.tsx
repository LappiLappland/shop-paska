import { act, render } from '@testing-library/react';
import ButtonOutlined from './ButtonOutlined';

describe('ButtonOutlined component', () => {
  test('renders button with default state', () => {
    const { container } = render(<ButtonOutlined>Click me</ButtonOutlined>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders button with disabled state', () => {
    const { container } = render(
      <ButtonOutlined disabled>Click me</ButtonOutlined>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders button with padding disabled', () => {
    const { container } = render(
      <ButtonOutlined addPadding={false}>Click me</ButtonOutlined>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('calls onClick handler when button is clicked', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <ButtonOutlined onClick={onClick}>Click me</ButtonOutlined>
    );
    const button = getByRole('button');
    act(() => {
      button.click();
    })
    expect(onClick).toHaveBeenCalled();
  });
});
