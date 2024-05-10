import { render, fireEvent } from '@testing-library/react';
import CheckBox from './CheckBox';

describe('CheckBox component', () => {
  test('renders without crashing', () => {
    render(
      <CheckBox id="test" text="Test" checked={false} onChange={() => {}} />,
    );
  });

  test('handles change event correctly', () => {
    let isChecked = false;
    const handleChange = jest.fn(() => {
      isChecked = !isChecked;
    });
    const { getByLabelText } = render(
      <CheckBox
        id="test"
        text="Test"
        checked={isChecked}
        onChange={handleChange}
      />,
    );
    const checkbox = getByLabelText('Test');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(isChecked).toBe(true);
  });

  test('toggles the checkbox state when clicked', () => {
    let isChecked = false;
    const handleChange = jest.fn(() => {
      isChecked = !isChecked;
    });
    const { getByLabelText } = render(
      <CheckBox
        id="test"
        text="Test"
        checked={isChecked}
        onChange={handleChange}
      />,
    );
    const checkbox = getByLabelText('Test');
    fireEvent.click(checkbox);
    expect(isChecked).toBe(true);
    fireEvent.click(checkbox);
    expect(isChecked).toBe(false);
  });

  test('displays an error message when an error is provided', () => {
    const { getByText } = render(
      <CheckBox
        id="test"
        text="Test"
        checked={false}
        onChange={() => {}}
        error="This field is required."
      />,
    );
    expect(getByText('This field is required.')).toBeInTheDocument();
  });
});
