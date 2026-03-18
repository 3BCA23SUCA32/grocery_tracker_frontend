import { render, screen } from '@testing-library/react';
import App from './App';

test('renders grocery tracker heading', () => {
  render(<App />);
  const heading = screen.getByText(/grocery tracker/i);
  expect(heading).toBeInTheDocument();
});
