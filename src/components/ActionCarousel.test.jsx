import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ActionCarousel from './ActionCarousel';

describe('ActionCarousel Component', () => {
  it('renders the daily eco actions title', () => {
    render(<ActionCarousel onLogAction={() => {}} />);
    expect(screen.getByText(/Daily Eco Actions/i)).toBeInTheDocument();
  });

  it('renders multiple action cards', () => {
    render(<ActionCarousel onLogAction={() => {}} />);
    // "Log This" button appears multiple times (once per card)
    const logButtons = screen.getAllByText(/Log This/i);
    expect(logButtons.length).toBeGreaterThan(0);
  });
});
