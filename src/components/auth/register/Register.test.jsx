import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register';
import store from '../../../store/configure-store';

describe('Register Page', () => {

  test('should render register page', async () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );
    expect(container).toBeDefined();
    expect(container).toMatchSnapshot();
    const linkElement = screen.getByText(/Join as a client or freelancer/i);
    expect(linkElement).toBeInTheDocument();
    const registerButton = screen.getByRole('button', {
      name: /create account/i
    });
    expect(registerButton).toBeDisabled();
    const joinAsFreelancerBtn = screen.getByText(/I'm a client, hiring for a project/i);
    fireEvent.click(joinAsFreelancerBtn);

    await waitFor(() => {
      expect(joinAsFreelancerBtn).toBeEnabled();
    })
  });

  test('should display error for invalid input', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );
    const joinAsClientBtn = screen.getByText(/I'm a client, hiring for a project/i);
    fireEvent.click(joinAsClientBtn);
    await waitFor(() => {
      expect(joinAsClientBtn).toBeEnabled();
    });

    const registerButton = screen.getByRole('button', {
      name: /join as a client/i
    });
    fireEvent.click(registerButton);

    const emailInput = screen.getByPlaceholderText('Enter Email');
    fireEvent.change(emailInput, { target: { value: 'test@123' } });
    fireEvent.blur(emailInput);
    expect(screen.getByText(/Enter a valid Email./i)).toBeInTheDocument();
  });

  test('register button to be enabled after valid inputs are entered', async () => {
    render(
      <Provider store={store}>
        <Router>
          <Register />
        </Router>
      </Provider>
    );
    const joinAsFreelancerBtn = screen.getByText(/I'm a freelancer, looking for work/i);
    fireEvent.click(joinAsFreelancerBtn);
    await waitFor(() => {
      expect(joinAsFreelancerBtn).toBeEnabled();
    });

    const registerButton = screen.getByRole('button', {
      name: /apply as a freelancer/i
    });
    fireEvent.click(registerButton);

    const emailInput = screen.getByPlaceholderText('Enter Email');
    const passwordInput = screen.getByPlaceholderText('Enter Password');
    const fNameInput = screen.getByPlaceholderText('Enter First Name');
    const lNameInput = screen.getByPlaceholderText('Enter Last Name');
    fireEvent.change(fNameInput, { target: { value: 'Anil' } });
    expect(fNameInput.value).toBe('Anil');
    fireEvent.blur(fNameInput);
    fireEvent.change(lNameInput, { target: { value: 'Saini' } });
    expect(lNameInput.value).toBe('Saini');
    fireEvent.blur(lNameInput);
    fireEvent.change(emailInput, { target: { value: 'anil@test.com' } });
    expect(emailInput.value).toBe('anil@test.com');
    fireEvent.blur(emailInput);
    fireEvent.change(passwordInput, { target: { value: 'Test-123' } });
    expect(emailInput.value).toBe('anil@test.com');
    fireEvent.blur(passwordInput);

    const regiterNowButton = screen.getByRole('button', {
      name: /create my account/i
    });
    await waitFor(() => {
      expect(regiterNowButton).toBeEnabled();
    });
    fireEvent.click(regiterNowButton);
  });
});