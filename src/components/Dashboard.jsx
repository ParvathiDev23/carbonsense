import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import ActionList from './ActionList';
import { Target, TrendingDown, Globe, Award } from 'lucide-react';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

export default function Dashboard({ userData, onLogAction }) {
  const globalAverage = 4.5; // tons CO2e per year average
  const currentDiff = Math.round((userData.current - globalAverage) * 10) / 10;
  
  const chartData = [
    { name: 'Diet', value: userData.breakdown.diet },
    { name: 'Transport', value: userData.breakdown.transport },
    { name: 'Energy', value: userData.breakdown.energy },
  ];

  const totalActionsLogged = userData.actionsTaken.length;
  const totalReduction = Math.round((userData.baseline - userData.current) * 10) / 10;

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
      
      {/* Left Column: Stats & Charts */}
      <div className="flex flex-col gap-6">
        {/* Hero Stat */}
        <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: '-20px', top: '-20px', opacity: 0.1 }}>
            <Globe size={150} />
          </div>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Your Annual Footprint</h2>
          <div className="flex items-end gap-2" style={{ marginBottom: '1rem' }}>
            <span className="text-gradient" style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1 }}>{userData.current.toFixed(1)}</span>
            <span style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', paddingBottom: '0.5rem' }}>tons CO₂e</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: currentDiff <= 0 ? 'var(--accent-primary)' : 'var(--warning)', fontWeight: 600 }}>
            <Target size={20} />
            <span>
              {Math.abs(currentDiff)} tons {currentDiff <= 0 ? 'below' : 'above'} global average
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="glass-panel" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
              <TrendingDown size={20} />
              <span style={{ fontWeight: 600 }}>Reduced</span>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{totalReduction > 0 ? totalReduction.toFixed(1) : '0.0'} tons</div>
          </div>
          <div className="glass-panel" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-secondary)', marginBottom: '0.5rem' }}>
              <Award size={20} />
              <span style={{ fontWeight: 600 }}>Actions</span>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{totalActionsLogged} logged</div>
          </div>
        </div>

        {/* Breakdown Chart */}
        <div className="glass-panel flex flex-col">
          <h3 style={{ marginBottom: '1.5rem' }}>Emissions Breakdown</h3>
          <div style={{ height: '250px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Right Column: Action Logging */}
      <div className="flex flex-col h-full">
        <ActionList onLogAction={onLogAction} />
      </div>

    </div>
  );
}
