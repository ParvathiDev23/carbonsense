import { Check, Plus } from 'lucide-react';
import { useState } from 'react';

const ACTIONS = [
  { id: 'a1', title: 'Plant-based meal', impact: 0.1, category: 'Diet' },
  { id: 'a2', title: 'Bike to work', impact: 0.2, category: 'Transport' },
  { id: 'a3', title: 'Public transit', impact: 0.1, category: 'Transport' },
  { id: 'a4', title: 'Line dry clothes', impact: 0.05, category: 'Energy' },
  { id: 'a5', title: 'Unplug devices', impact: 0.02, category: 'Energy' },
];

export default function ActionList({ onLogAction }) {
  const [loggedAnim, setLoggedAnim] = useState(null);

  const handleLog = (action) => {
    onLogAction(action);
    setLoggedAnim(action.id);
    setTimeout(() => setLoggedAnim(null), 1000);
  };

  return (
    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Reduce Your Footprint</h3>
        <p className="text-sm">Log daily actions to lower your carbon impact and build sustainable habits.</p>
      </div>

      <div className="flex flex-col gap-3" style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
        {ACTIONS.map(action => (
          <div 
            key={action.id} 
            style={{ 
              background: 'rgba(0,0,0,0.2)', 
              padding: '1rem', 
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid var(--border-color)'
            }}
          >
            <div>
              <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{action.title}</div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.5rem', borderRadius: '1rem', color: 'var(--text-secondary)' }}>
                  {action.category}
                </span>
                <span style={{ fontSize: '0.875rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                  -{action.impact} tons
                </span>
              </div>
            </div>
            <button 
              className="btn-primary" 
              onClick={() => handleLog(action)}
              style={{ 
                padding: '0.5rem', 
                borderRadius: '50%', 
                width: '40px', 
                height: '40px',
                background: loggedAnim === action.id ? '#3b82f6' : '' 
              }}
            >
              {loggedAnim === action.id ? <Check size={20} /> : <Plus size={20} />}
            </button>
          </div>
        ))}
      </div>
      
      {/* Gamification / Tree Graphic Placeholder */}
      <div style={{ 
        marginTop: '2rem', 
        padding: '1.5rem', 
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
        borderRadius: 'var(--radius-md)',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌱</div>
        <div style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>Your Forest is Growing!</div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Every action you log contributes to a healthier planet.</p>
      </div>
    </div>
  );
}
