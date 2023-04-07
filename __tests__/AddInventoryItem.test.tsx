import React from 'react';
import { render } from '@testing-library/react-native';
import AddInventoryItem from '../src/screens/AddInventory/AddInventoryItems';

describe('AddInventoryItem component', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(<AddInventoryItem />);
    const view = getByTestId('add-inventory-view');
    expect(view).toBeDefined();
  });
});
