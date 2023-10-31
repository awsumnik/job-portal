import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import store from '../../../store/configure-store';

describe('Login Page', () => {
  
  test('should render login page', async () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
    const linkElement = screen.getByText(/Log in to Job Portal/i);
    expect(linkElement).toBeInTheDocument();
    const loginButton = screen.getByRole('button', {
      name: /log in/i
    });
    expect(loginButton).toBeDisabled();
  });

  test('should display error for invalid input', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    const emailInput = screen.getByPlaceholderText('Enter Email');
    fireEvent.change(emailInput, { target: { value: '12345' } });
    fireEvent.blur(emailInput);
    expect(screen.getByText(/Email should be minimum 8 characters in length./i)).toBeInTheDocument();
  });

  test('login button to be enabled after email and password are inputed', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    const emailInput = screen.getByPlaceholderText('Enter Email');
    const passwordInput = screen.getByPlaceholderText('Enter Password');
    fireEvent.change(emailInput, { target: { value: 'anil@test.com' } });
    expect(emailInput.value).toBe('anil@test.com');
    fireEvent.blur(emailInput);
    fireEvent.change(passwordInput, { target: { value: 'Test-123' } });
    expect(emailInput.value).toBe('anil@test.com');
    fireEvent.blur(passwordInput);
    
    const loginButton = screen.getByRole('button', {
      name: /log in/i
    });
    await waitFor(() => {
      expect(loginButton).toBeEnabled();
    });
    fireEvent.click(loginButton);
  });
});