import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Calculator from './Calculator';

describe('Calculator Component', () => {
  it('renders the initial step correctly', () => {
    render(<Calculator onComplete={() => {}} />);
    expect(screen.getAllByText(/Diet/i).length).toBeGreaterThan(0);
  });
});
