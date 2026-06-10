import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = MockIntersectionObserver;

// Mock Canvas getContext
HTMLCanvasElement.prototype.getContext = () => ({
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
});

describe('App Component', () => {
  it('renders the CarbonSense branding', () => {
    render(<App />);
    const brandingElements = screen.getAllByText(/Carbon/i);
    expect(brandingElements.length).toBeGreaterThan(0);
  });

  it('renders the Get Started button initially', () => {
    render(<App />);
    const getStartedBtn = screen.getByText(/Get Started/i);
    expect(getStartedBtn).toBeDefined();
  });
});
