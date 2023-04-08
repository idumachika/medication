import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginForm from '../src/screens/Login/Login';

describe('LoginForm', () => {
  const onSubmit = jest.fn();

  it('submits the form with valid email and password', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm onSubmit={onSubmit} />);
   const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password');
  });

  it('displays an error message with invalid email', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm onSubmit={onSubmit} />);

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent.changeText(passwordInput, 'password');
  });

  it('displays an error message with short password', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginForm onSubmit={onSubmit} />);

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'short');
  });
});
