import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import InventoryDetails from '../src/components/MedicationDetails';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: jest.fn() }),
}));

jest.mock('../src/context/InventoryProvider', () => ({
  useInventory: () => ({
    inventories: [
      { id: '1', name: 'Item 1', total: 5, price: 10, desc: 'Description 1' },
      { id: '2', name: 'Item 2', total: 10, price: 20, desc: 'Description 2' },
    ],
    setInventories: jest.fn(),
  }),
}));

describe('InventoryDetails component', () => {
  test('should display inventory details', () => {
    const { getByText } = render(<InventoryDetails route={{ params: { id: '1' } }} />);
    expect(getByText('Name: Item 1')).toBeTruthy();
    expect(getByText('Total: 5')).toBeTruthy();
    expect(getByText('Price: 10')).toBeTruthy();
    expect(getByText('Desc: Description 1')).toBeTruthy();
  });

  test('should display delete confirmation alert when delete button is pressed', () => {
    Alert.alert = jest.fn();
    const { getByTestId } = render(<InventoryDetails route={{ params: { id: '1' } }} />);
    fireEvent.press(getByTestId('delete-button'));
    expect(Alert.alert).toHaveBeenCalledTimes(1);
  });

//     test('should navigate to InventoryEditScreen when edit button is pressed', () => {

//     const { getByTestId, getByText } = render(<InventoryDetails route={{ params: { id: '1' } }} />);
//     fireEvent.press(getByTestId('edit-button'));
//     expect(getByText('Edit Inventory')).toBeTruthy();
//   });
});

