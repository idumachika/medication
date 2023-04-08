import React from 'react';
import { render,fireEvent } from '@testing-library/react-native';
import AddInventoryItem from '../src/screens/AddInventory/AddInventoryItems';

describe('AddInventory component', () => {
  test('renders all input fields', () => {
    const { getByPlaceholderText } = render(<AddInventoryItem />);

    expect(getByPlaceholderText('Name')).toBeDefined();
    expect(getByPlaceholderText('Total')).toBeDefined();
    expect(getByPlaceholderText('Price')).toBeDefined();
    expect(getByPlaceholderText('Description')).toBeDefined();
  });

  test('displays an error message when submitting with an existing item name', () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(<AddInventoryItem />);
    const nameInput = getByPlaceholderText('Name');
    const totalInput = getByPlaceholderText('Total');
    const priceInput = getByPlaceholderText('Price');
    const descInput = getByPlaceholderText('Description');

    fireEvent.changeText(nameInput, 'Item1');
    fireEvent.changeText(totalInput, '10');
    fireEvent.changeText(priceInput, '5');
    fireEvent.changeText(descInput, 'Lorem ipsum dolor sit amet.');
    fireEvent.changeText(nameInput, 'Item1');
    fireEvent.changeText(totalInput, '20');
    fireEvent.changeText(priceInput, '10');
    fireEvent.changeText(descInput, 'Lorem ipsum dolor sit amet.');
  });

  test('displays an error message when submitting with a description with less than three words', () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(<AddInventoryItem />);
    const nameInput = getByPlaceholderText('Name');
    const totalInput = getByPlaceholderText('Total');
    const priceInput = getByPlaceholderText('Price');
    const descInput = getByPlaceholderText('Description');

    fireEvent.changeText(nameInput, 'Item2');
    fireEvent.changeText(totalInput, '5');
    fireEvent.changeText(priceInput, '3');
    fireEvent.changeText(descInput, 'Lorem ipsum.');
  });

  test('displays an error message when submitting with invalid numbers for Total and Price', () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(<AddInventoryItem />);
    const nameInput = getByPlaceholderText('Name');
    const totalInput = getByPlaceholderText('Total');
    const priceInput = getByPlaceholderText('Price');
    const descInput = getByPlaceholderText('Description');

    fireEvent.changeText(nameInput, 'Item3');
    fireEvent.changeText(totalInput, 'invalid');
    fireEvent.changeText(priceInput, '3');
    fireEvent.changeText(descInput, 'Lorem ipsum dolor sit amet.');

    fireEvent.changeText(nameInput, 'Item4');
    fireEvent.changeText(totalInput, '5');
    fireEvent.changeText(priceInput, 'invalid');
    fireEvent.changeText(descInput, 'Lorem ipsum dolor sit amet.');
    });
});

