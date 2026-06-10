import { useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { actions } from '../data/ecoActions';


/**
 * ActionCarousel Component
 * Renders a horizontally scrollable list of daily eco-friendly actions that users can log.
 * 
 * @param {Object} props
 * @param {Function} props.onLogAction - Callback fired when an action is logged
 */
const ActionCarousel = ({ onLogAction }) => {
  const scrollRef = useRef(null);
  const [logged, setLogged] = useState({});

  const scroll = useCallback((dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
  }, []);

  const handleLog = useCallback(
    (action, index) => {
      if (logged[index]) return;
      setLogged((prev) => ({ ...prev, [index]: true }));
      if (onLogAction) {
        onLogAction({ title: action.title, impact: action.impact, category: action.category });
      }
      setTimeout(() => {
        setLogged((prev) => {
          const next = { ...prev };
          delete next[index];
          return next;
        });
      }, 1500);
    },
    [logged, onLogAction]
  );

  return (
    <section style={{ padding: '60px 0', position: 'relative' }}>
      <style>{`
        .action-scroll::-webkit-scrollbar { display: none; }
        .action-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(0,0,0,0.35); }
        .log-btn:hover { background: rgba(74,222,128,0.25) !important; }
        .carousel-arrow:hover { background: rgba(74,222,128,0.2) !important; border-color: rgba(74,222,128,0.4) !important; }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2
              className="text-gradient"
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, marginBottom: '8px' }}
            >
              Daily Eco Actions
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1rem', margin: 0 }}>
              Log actions to reduce your footprint and build sustainable habits
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              aria-label="Scroll left"
              className="carousel-arrow"
              onClick={() => scroll(-1)}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                border: '1px solid rgba(148,163,184,0.2)',
                background: 'rgba(15,23,42,0.6)',
                color: '#f1f5f9',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.25s ease',
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              aria-label="Scroll right"
              className="carousel-arrow"
              onClick={() => scroll(1)}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                border: '1px solid rgba(148,163,184,0.2)',
                background: 'rgba(15,23,42,0.6)',
                color: '#f1f5f9',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.25s ease',
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="action-scroll"
        style={{
          display: 'flex',
          gap: '20px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          paddingLeft: 'max(24px, calc((100vw - 1200px) / 2 + 24px))',
          paddingRight: '24px',
          paddingBottom: '8px',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {actions.map((action, i) => {
          const Icon = action.icon;
          const isLogged = logged[i];
          return (
            <div
              key={i}
              className="glass-panel action-card"
              style={{
                flex: '0 0 280px',
                scrollSnapAlign: 'start',
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative',
              }}
            >
              <div style={{ height: '4px', background: action.color }} />
              <div style={{ padding: '28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: `${action.color}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '18px',
                    border: `1px solid ${action.color}30`,
                  }}
                >
                  <Icon size={22} color={action.color} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '8px' }}>
                  {action.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, flex: 1, margin: 0 }}>
                  {action.description}
                </p>
                <div
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 800,
                    color: '#4ade80',
                    marginTop: '16px',
                    marginBottom: '18px',
                  }}
                >
                  {action.impact}t CO2
                </div>
                <button
                  className="log-btn"
                  onClick={() => handleLog(action, i)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid rgba(74,222,128,0.3)',
                    background: isLogged ? 'rgba(74,222,128,0.2)' : 'rgba(74,222,128,0.1)',
                    color: '#4ade80',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  {isLogged ? (
                    <>
                      <Check size={18} />
                      Logged
                    </>
                  ) : (
                    'Log This'
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};



ActionCarousel.propTypes = {
};

export default ActionCarousel;
