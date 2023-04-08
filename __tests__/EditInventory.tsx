import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import EditInventory from '../src/screens/EditInventory/EditInventory';

describe('EditInventory', () => {
  test('updates the input fields correctly', () => {
    const mockInventory = {
      id: '123',
      name: 'Test Item',
      total: 10,
      price: 5,
      desc: 'A test item'
    };
    const { getByPlaceholderText } = render(<EditInventory route={{params: { inventory: mockInventory }}} />);
    const nameInput = getByPlaceholderText('Name');
    const totalInput = getByPlaceholderText('Total');
    const priceInput = getByPlaceholderText('Price');
    const descInput = getByPlaceholderText('Description');

    fireEvent.changeText(nameInput, 'New Test Item');
    fireEvent.changeText(totalInput, '15');
    fireEvent.changeText(priceInput, '10');
    fireEvent.changeText(descInput, 'A new test item');

    expect(nameInput.props.value).toBe('New Test Item');
    expect(totalInput.props.value).toBe('15');
    expect(priceInput.props.value).toBe('10');
    expect(descInput.props.value).toBe('A new test item');
  });

  test('shows alert if a required field is missing', () => {
    const mockInventory = {
      id: '123',
      name: 'Test Item',
      total: 10,
      price: 5,
      desc: 'A test item'
    };
    const { getByText } = render(<EditInventory route={{params: { inventory: mockInventory }}} />);
    const submitButton = getByText('OK');
    fireEvent.press(submitButton);

  });

});