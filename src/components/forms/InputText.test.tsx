import { fireEvent, render } from '@testing-library/react';
import FormInputText from './InputText';

describe('FormInputText component', () => {
  test('handles change event correctly', () => {
    let value = '';
    const handleChange = jest.fn((e) => {
      value = e.target.value;
    });
    const { getByLabelText } = render(
      <FormInputText
        id="test"
        label="test"
        value={value}
        onChange={handleChange}
      />,
    );
    const input = getByLabelText('test');
    fireEvent.change(input, { target: { value: 'Test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(value).toBe('Test');
  });

  test('handles numeric input correctly', () => {
    let value = '';
    const handleChange = jest.fn((e) => {
      value = e.target.value;
    });
    const { getByLabelText } = render(
      <FormInputText
        id="test"
        label="test"
        value={value}
        onChange={handleChange}
        type="numeric"
      />,
    );
    const input = getByLabelText('test');
    fireEvent.change(input, { target: { value: '123' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(value).toBe('123');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(value).toBe('');
  });

  test('displays error message when error is provided', () => {
    const { getByText } = render(
      <FormInputText
        id="test"
        value=""
        onChange={() => {}}
        error="This field is required."
      />,
    );
    expect(getByText('This field is required.')).toBeInTheDocument();
  });
});
