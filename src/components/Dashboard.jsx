import React, { useEffect, useRef, useState } from 'react';
import {
  TrendingDown,
  Activity,
  Flame,
  Clock,
  Leaf,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import ActionCarousel from './ActionCarousel';

const PIE_COLORS = ['#4ade80', '#38bdf8', '#fbbf24', '#a78bfa', '#f87171'];

const categoryLabels = {
  diet: 'Diet',
  transport: 'Transport',
  energy: 'Home Energy',
  shopping: 'Shopping',
  travel: 'Flights',
};

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

function AnimatedNumber({ value, decimals = 1, inView, suffix = '' }) {
  const numVal = Number(value) || 0;
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const stepTime = 16;
    const numSteps = duration / stepTime;
    const inc = numVal / numSteps;
    const timer = setInterval(() => {
      start += inc;
      if (start >= numVal) {
        setCurrent(numVal);
        clearInterval(timer);
      } else {
        setCurrent(start);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, numVal]);
  return (
    <span>
      {Number(current).toFixed(decimals)}
      {suffix}
    </span>
  );
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0];
  return (
    <div
      style={{
        background: 'rgba(15,23,42,0.95)',
        border: '1px solid rgba(148,163,184,0.2)',
        borderRadius: '12px',
        padding: '12px 16px',
        fontSize: '0.9rem',
      }}
    >
      <p style={{ color: '#f1f5f9', fontWeight: 700, margin: '0 0 4px' }}>
        {d.name}
      </p>
      <p style={{ color: '#94a3b8', margin: 0 }}>
        {Number(d.value).toFixed(1)}t CO2/year
      </p>
    </div>
  );
}

const Dashboard = ({ userData, onLogAction }) => {
  const heroRef = useRef(null);
  const chartRef = useRef(null);
  const statsRef = useRef(null);
  const activityRef = useRef(null);

  const heroInView = useInView(heroRef);
  const chartInView = useInView(chartRef);
  const statsInView = useInView(statsRef);
  const activityInView = useInView(activityRef);

  const {
    baseline = 0,
    current = 0,
    breakdown = {},
    history = [],
    actionsTaken = [],
    streak: userStreak = 0,
  } = userData || {};

  const actionsCount = Array.isArray(actionsTaken) ? actionsTaken.length : Number(actionsTaken) || 0;
  const globalAvg = 4.5;
  const diff = Number(current) - globalAvg;
  const totalReduced = Math.max(0, Number(baseline) - Number(current));
  const streak = Number(userStreak) || 0;

  const pieData = Object.entries(breakdown)
    .filter(([, v]) => v > 0)
    .map(([key, value]) => ({
      name: categoryLabels[key] || key,
      value,
    }));

  const statCards = [
    {
      label: 'Total Reduced',
      value: totalReduced,
      decimals: 1,
      suffix: 't',
      icon: TrendingDown,
      color: '#4ade80',
    },
    {
      label: 'Actions Logged',
      value: actionsCount,
      decimals: 0,
      suffix: '',
      icon: Activity,
      color: '#38bdf8',
    },
    {
      label: 'Current Streak',
      value: streak,
      decimals: 0,
      suffix: ' days',
      icon: Flame,
      color: '#fbbf24',
    },
  ];

  return (
    <section
      style={{
        padding: 'clamp(60px, 8vw, 100px) 24px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2
          className="text-gradient"
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 800,
            marginBottom: '12px',
          }}
        >
          Your Dashboard
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
          Track your progress toward a lower carbon lifestyle.
        </p>
      </div>

      {/* Hero stat */}
      <div
        ref={heroRef}
        className="glass-panel"
        style={{
          borderRadius: '24px',
          padding: 'clamp(32px, 5vw, 56px)',
          textAlign: 'center',
          marginBottom: '32px',
          opacity: heroInView ? 1 : 0,
          transform: heroInView ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <p
          style={{
            color: '#94a3b8',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '8px',
          }}
        >
          Current Footprint
        </p>
        <div
          className="text-gradient"
          style={{
            fontSize: 'clamp(3rem, 8vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1,
            marginBottom: '8px',
          }}
        >
          <AnimatedNumber value={current} decimals={1} inView={heroInView} />
        </div>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '16px' }}>
          tons CO2 per year
        </p>
        <p
          style={{
            color: diff > 0 ? '#fbbf24' : '#4ade80',
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          {diff > 0
            ? `${Math.abs(Number(diff)).toFixed(1)} tons above global average`
            : `${Math.abs(Number(diff)).toFixed(1)} tons below global average`}
        </p>
      </div>

      {/* Breakdown + Stats row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px',
          marginBottom: '32px',
        }}
      >
        {/* Pie chart */}
        <div
          ref={chartRef}
          className="glass-panel"
          style={{
            borderRadius: '24px',
            padding: '32px',
            opacity: chartInView ? 1 : 0,
            transform: chartInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s',
          }}
        >
          <h3
            style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#f1f5f9',
              marginBottom: '24px',
            }}
          >
            Your Breakdown
          </h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1200}
                  animationEasing="ease-out"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div
              style={{
                height: '260px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b',
              }}
            >
              Complete the calculator to see your breakdown
            </div>
          )}
          {pieData.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                marginTop: '16px',
                justifyContent: 'center',
              }}
            >
              {pieData.map((d, i) => (
                <div
                  key={d.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.8rem',
                    color: '#94a3b8',
                  }}
                >
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '3px',
                      background: PIE_COLORS[i % PIE_COLORS.length],
                    }}
                  />
                  {d.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stat cards + Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div
            ref={statsRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '16px',
            }}
          >
            {statCards.map((sc, i) => {
              const Icon = sc.icon;
              return (
                <div
                  key={sc.label}
                  className="glass-panel"
                  style={{
                    borderRadius: '20px',
                    padding: '24px 20px',
                    opacity: statsInView ? 1 : 0,
                    transform: statsInView ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms`,
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: `${sc.color}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '14px',
                      border: `1px solid ${sc.color}30`,
                    }}
                  >
                    <Icon size={20} color={sc.color} />
                  </div>
                  <div
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      color: '#f1f5f9',
                      marginBottom: '4px',
                    }}
                  >
                    <AnimatedNumber
                      value={sc.value}
                      decimals={sc.decimals}
                      inView={statsInView}
                      suffix={sc.suffix}
                    />
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    {sc.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Activity feed */}
          <div
            ref={activityRef}
            className="glass-panel"
            style={{
              borderRadius: '20px',
              padding: '28px 24px',
              flex: 1,
              opacity: activityInView ? 1 : 0,
              transform: activityInView ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s',
            }}
          >
            <h3
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: '#f1f5f9',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Clock size={16} color="#94a3b8" />
              Recent Activity
            </h3>
            {Array.isArray(actionsTaken) && actionsTaken.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {actionsTaken.slice(0, 5).map((item, i) => (
                  <li
                    key={item.id || i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      background: 'rgba(15,23,42,0.5)',
                      border: '1px solid rgba(148,163,184,0.08)',
                    }}
                  >
                    <Leaf size={16} color="#4ade80" />
                    <div style={{ flex: 1 }}>
                      <span style={{ color: '#f1f5f9', fontSize: '0.9rem', fontWeight: 600 }}>
                        {item.title || item.action || 'Action'}
                      </span>
                    </div>
                    <span style={{ color: '#4ade80', fontSize: '0.85rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                      -{Number(item.impact || 0).toFixed(2)}t
                    </span>
                    {item.loggedAt && (
                      <span style={{ color: '#64748b', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                        {new Date(item.loggedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#64748b', fontSize: '0.9rem', textAlign: 'center', padding: '20px 0' }}>
                No actions logged yet. Start below!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Carousel */}
      <ActionCarousel onLogAction={onLogAction} />
    </section>
  );
};

export default Dashboard;
