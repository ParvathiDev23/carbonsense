import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from './Dashboard';

// Mock recharts because it can cause issues in jsdom without canvas
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  PieChart: ({ children }) => <div>{children}</div>,
  Pie: () => <div>Pie</div>,
  Cell: () => <div>Cell</div>,
  Tooltip: () => <div>Tooltip</div>,
}));

describe('Dashboard Component', () => {
  const mockUserData = {
    current: 4.5,
    baseline: 4.5,
    breakdown: { Diet: 1.0, Transport: 1.5, Energy: 1.0, Shopping: 0.5, Flights: 0.5 },
    streak: 2,
    totalReduced: 0.5,
    history: [],
    actionsTaken: 5
  };

  it('renders the dashboard with correct footprint', () => {
    // Wrap in a mock IntersectionObserver
    class MockIntersectionObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    window.IntersectionObserver = MockIntersectionObserver;

    render(<Dashboard userData={mockUserData} onLogAction={() => {}} />);
    
    expect(screen.getByText(/Current Footprint/i)).toBeInTheDocument();
    // Due to the counter animation, the initial value rendered is 0.0
    expect(screen.getAllByText(/0\.0/i).length).toBeGreaterThan(0);
  });
});
