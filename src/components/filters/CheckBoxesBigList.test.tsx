import { render, fireEvent } from '@testing-library/react';
import CheckBoxesBigList from './CheckBoxesBigList';

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

describe('CheckBoxesBigList component', () => {
  test('renders options correctly', () => {
    const { getByText } = render(
      <CheckBoxesBigList
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
      <CheckBoxesBigList
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
      <CheckBoxesBigList
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

  test('filters options correctly when searching', () => {
    const { getByLabelText, getByText, queryByText } = render(
      <CheckBoxesBigList
        id="test"
        options={options}
        states={states}
        onChange={onChangeMock}
      />,
    );

    const showAllButton = getByText('Show all');
    fireEvent.click(showAllButton);

    const searchInput = getByLabelText('Search');
    fireEvent.change(searchInput, { target: { value: '1' } });

    expect(getByText('Option 1')).toBeInTheDocument();
    expect(queryByText('Option 2')).toBeNull();
    expect(queryByText('Option 3')).toBeNull();
  });

  test('displays message when nothing found during search', () => {
    const { getByLabelText, getByText } = render(
      <CheckBoxesBigList
        id="test"
        options={options}
        states={states}
        onChange={onChangeMock}
      />,
    );

    const showAllButton = getByText('Show all');
    fireEvent.click(showAllButton);

    const searchInput = getByLabelText('Search');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    expect(getByText('Nothing was found.')).toBeInTheDocument();
  });
});
