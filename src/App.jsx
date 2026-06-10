import { useState, useEffect, useRef, useCallback } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import Hero from './components/Hero';
import Features from './components/Features';
import Calculator from './components/Calculator';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { Leaf, X } from 'lucide-react';

function App() {
  const [userData, setUserData] = useLocalStorage('carbonsense_data', null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const calculatorRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [userData, showCalculator]);

  const handleStartCalculator = useCallback(() => {
    setShowCalculator(true);
    setTimeout(() => {
      calculatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }, []);

  const handleCompleteOnboarding = useCallback((data) => {
    setUserData({
      baseline: data.totalFootprint,
      current: data.totalFootprint,
      breakdown: data.breakdown,
      history: [{ date: new Date().toISOString(), value: data.totalFootprint }],
      actionsTaken: [],
      streak: 0,
    });
    setShowCalculator(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLogAction = useCallback((action) => {
    setUserData((prev) => {
      const newCurrent = Math.max(0, prev.current - action.impact);
      const lastActionDate = prev.actionsTaken.length > 0
        ? new Date(prev.actionsTaken[0].loggedAt).toDateString()
        : null;
      const today = new Date().toDateString();
      const newStreak = lastActionDate === today ? prev.streak : prev.streak + 1;

      return {
        ...prev,
        current: newCurrent,
        streak: newStreak,
        history: [...prev.history, { date: new Date().toISOString(), value: newCurrent }],
        actionsTaken: [
          { ...action, loggedAt: new Date().toISOString(), id: Date.now() },
          ...prev.actionsTaken,
        ],
      };
    });
  }, []);

  const resetData = useCallback(() => {
    if (confirm('Are you sure you want to reset all your data and start fresh?')) {
      localStorage.removeItem('carbonsense_data');
      setUserData(null);
      setShowCalculator(false);
    }
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Floating Navbar */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0.75rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          background: navScrolled ? 'rgba(5, 11, 21, 0.85)' : 'transparent',
          backdropFilter: navScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: navScrolled ? 'blur(16px)' : 'none',
          borderBottom: navScrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <div className="flex items-center gap-2" style={{ cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              padding: '0.45rem',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(16, 185, 129, 0.3)',
            }}
          >
            <Leaf size={20} color="#fff" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.04em' }}>
            Carbon<span style={{ color: 'var(--accent-primary)' }}>Sense</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {userData && (
            <button className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }} onClick={resetData}>
              Reset
            </button>
          )}
          {!userData && !showCalculator && (
            <button className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }} onClick={handleStartCalculator}>
              Get Started
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {!userData ? (
          <>
            <Hero onStart={handleStartCalculator} />
            <Features />
            {showCalculator && (
              <div ref={calculatorRef} id="calculator-section">
                <section className="section" style={{ position: 'relative' }}>
                  <button
                    aria-label="Close Calculator"
                    onClick={() => setShowCalculator(false)}
                    style={{
                      position: 'absolute',
                      top: '2rem',
                      right: '2rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      zIndex: 10,
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                  >
                    <X size={18} />
                  </button>
                  <Calculator onComplete={handleCompleteOnboarding} />
                </section>
              </div>
            )}
            <Footer />
          </>
        ) : (
          <>
            <div style={{ paddingTop: '5rem' }}>
              <Dashboard userData={userData} onLogAction={handleLogAction} />
            </div>
            <Footer />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
