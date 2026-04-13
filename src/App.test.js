import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders english landing page by default', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: /camargo julian 2\.0/i })).toBeInTheDocument();
});

test('renders spanish landing page for es route', () => {
  render(
    <MemoryRouter initialEntries={['/es']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: /camargo julian 2\.0/i })).toBeInTheDocument();
});
