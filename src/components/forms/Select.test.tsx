import { fireEvent, render, waitFor } from '@testing-library/react';
import FormSelect from './Select';

const mockOptions = [
  { text: 'Option 1', value: 'option1' },
  { text: 'Option 2', value: 'option2' },
  { text: 'Option 3', value: 'option3' },
];

describe('FormSelect component', () => {
  test('renders without crashing', () => {
    render(<FormSelect id="test" options={[]} />);
  });

  test('toggles the dropdown menu when clicking on the select button', async () => {
    const { getByText, getByRole } = render(
      <FormSelect id="test" options={mockOptions} selected="option1" />,
    );
    const selectButton = getByText('Option 1', { selector: 'div > button' });
    const itemsList = getByRole('list');
    fireEvent.click(selectButton);
    await waitFor(() => expect(itemsList).toHaveClass('opacity-100'));
    fireEvent.click(selectButton);
    await waitFor(() => expect(itemsList).not.toHaveClass('opacity-100'));
  });

  test('changes the selected option when an option is clicked', async () => {
    let selectedOption = '';
    const handleChange = jest.fn((option) => {
      selectedOption = option;
    });
    const { getByText } = render(
      <FormSelect
        id="test"
        options={mockOptions}
        onChange={handleChange}
        selected="option1"
      />,
    );
    const selectButton = getByText('Option 1', { selector: 'div > button' });
    fireEvent.click(selectButton);
    const option2 = getByText('Option 2');
    fireEvent.click(option2);
    await waitFor(() => expect(selectedOption).toBe('option2'));
  });

  test('disabled the dropdown menu when clicking outside the select component', async () => {
    const { getByText, getByRole } = render(
      <FormSelect id="test" options={mockOptions} selected="option1" />,
    );
    const selectButton = getByText('Option 1', { selector: 'div > button' });
    const itemsList = getByRole('list');
    fireEvent.click(document);
    await waitFor(() => expect(itemsList).not.toHaveClass('opacity-100'));
    fireEvent.click(selectButton);
    await waitFor(() => expect(itemsList).toHaveClass('opacity-100'));
    fireEvent.click(document);
    await waitFor(() => expect(itemsList).not.toHaveClass('opacity-100'));
  });
});
