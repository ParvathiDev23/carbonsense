import { useState, useEffect } from 'react';
import Calculator from './components/Calculator';
import Dashboard from './components/Dashboard';
import { Leaf } from 'lucide-react';

function App() {
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('carbonsense_data');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (userData) {
      localStorage.setItem('carbonsense_data', JSON.stringify(userData));
    }
  }, [userData]);

  const handleCompleteOnboarding = (data) => {
    setUserData({
      baseline: data.totalFootprint,
      current: data.totalFootprint,
      breakdown: data.breakdown,
      history: [
        { date: new Date().toISOString(), value: data.totalFootprint }
      ],
      actionsTaken: []
    });
  };

  const handleLogAction = (action) => {
    setUserData(prev => {
      const newCurrent = Math.max(0, prev.current - action.impact);
      return {
        ...prev,
        current: newCurrent,
        history: [...prev.history, { date: new Date().toISOString(), value: newCurrent }],
        actionsTaken: [{ ...action, loggedAt: new Date().toISOString(), id: Date.now() }, ...prev.actionsTaken]
      };
    });
  };

  const resetData = () => {
    if (confirm('Are you sure you want to reset your profile and start over?')) {
      localStorage.removeItem('carbonsense_data');
      setUserData(null);
    }
  };

  return (
    <div style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header className="flex justify-between items-center" style={{ marginBottom: '3rem' }}>
        <div className="flex items-center gap-2">
          <div style={{ background: 'var(--accent-primary)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Leaf size={24} />
          </div>
          <h1 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 800, letterSpacing: '-0.05em' }}>Carbon<span style={{ color: 'var(--accent-primary)' }}>Sense</span></h1>
        </div>
        {userData && (
          <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }} onClick={resetData}>
            Reset Profile
          </button>
        )}
      </header>

      <main>
        {!userData ? (
          <Calculator onComplete={handleCompleteOnboarding} />
        ) : (
          <Dashboard userData={userData} onLogAction={handleLogAction} />
        )}
      </main>
    </div>
  );
}

export default App;
