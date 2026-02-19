import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock the Three.js viewer page to avoid loading ESM-only modules in Jest.
jest.mock('./pages/ViewerPage', () => () => null);

import App from './App';

beforeEach(() => {
  window.history.pushState({}, '', '/');
});

const renderApp = () => render(<App />);

test('navigates from dashboard to upload for new project', async () => {
  const user = userEvent.setup();
  renderApp();

  expect(
    screen.getByRole('heading', { name: /memoria archive/i })
  ).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /create new project/i }));

  expect(
    await screen.findByRole('heading', { name: /upload project details/i })
  ).toBeInTheDocument();
});

test('opens demo project with prefilled values', async () => {
  const user = userEvent.setup();
  renderApp();

  await user.click(screen.getByRole('button', { name: /open demo project/i }));

  expect(
    await screen.findByRole('heading', { name: /upload project details/i })
  ).toBeInTheDocument();

  expect(await screen.findByLabelText(/project title/i)).toHaveValue(
    'Memoria Archive Demo'
  );
  expect(await screen.findByLabelText(/couple names/i)).toHaveValue('Ava & Liam');
});
