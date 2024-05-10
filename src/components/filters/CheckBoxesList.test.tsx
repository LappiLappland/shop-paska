import { render, fireEvent } from '@testing-library/react';
import CheckBoxesList from './CheckBoxesList';

const options = [
  { value: '1', name: 'Option 1' },
  { value: '2', name: 'Option 2' },
  { value: '3', name: 'Option 3' },
];

const states = [false, false, false];

const onChangeMock = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

describe('CheckBoxesList component', () => {
  test('renders options correctly', () => {
    const { getByText } = render(
      <CheckBoxesList
        id="test"
        options={options}
        states={states}
        onChange={onChangeMock}
      />,
    );

    options.forEach((option) => {
      expect(getByText(option.name)).toBeInTheDocument();
    });
  });

  test('triggers onChange correctly', () => {
    const { getByText } = render(
      <CheckBoxesList
        id="test"
        options={options}
        states={states}
        onChange={onChangeMock}
      />,
    );

    const checkbox1 = getByText('Option 1');
    fireEvent.click(checkbox1);
    expect(onChangeMock).toHaveBeenCalledWith(0, true);

    const checkbox2 = getByText('Option 2');
    fireEvent.click(checkbox2);
    expect(onChangeMock).toHaveBeenCalledWith(1, true);
  });

  test('toggles show all/hide button correctly', () => {
    const { getByText } = render(
      <CheckBoxesList
        id="test"
        options={options}
        states={states}
        onChange={onChangeMock}
      />,
    );

    const showAllButton = getByText('Show all');
    fireEvent.click(showAllButton);
    expect(getByText('Hide')).toBeInTheDocument();

    fireEvent.click(showAllButton);
    expect(getByText('Show all')).toBeInTheDocument();
  });

  test('displays limited options by default', () => {
    const { getByText, queryByText } = render(
      <CheckBoxesList
        id="test"
        options={options}
        states={states}
        onChange={onChangeMock}
        maxLimit={2}
      />,
    );

    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
    expect(queryByText('Option 3')).toBeNull();
  });

  test('displays all options when "Show all" is clicked', () => {
    const { getByText } = render(
      <CheckBoxesList
        id="test"
        options={options}
        states={states}
        onChange={onChangeMock}
      />,
    );

    const showAllButton = getByText('Show all');
    fireEvent.click(showAllButton);

    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
    expect(getByText('Option 3')).toBeInTheDocument();
  });
});
