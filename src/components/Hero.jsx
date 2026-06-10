import { useEffect, useRef, useState, useCallback } from 'react';

import { ChevronDown } from 'lucide-react';

/**
 * Hero Component
 * Displays the landing section with background video, animated headline, and call-to-action.
 * 
 * @param {Object} props
 * @param {Function} props.onStart - Callback fired when the CTA button is clicked
 */
const Hero = ({ onStart }) => {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const [wordsVisible, setWordsVisible] = useState(0);

  const headline = 'Understand Your Impact on the Planet';
  const words = headline.split(' ');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setWordsVisible(i);
      if (i >= words.length) clearInterval(interval);
    }, 180);
    return () => clearInterval(interval);
  }, [words.length]);

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 0.5,
      vy: -(Math.random() * 0.4 + 0.15),
      vx: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74,222,128,${p.opacity})`;
        ctx.fill();
      }
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const cleanup = initParticles();
    return cleanup;
  }, [initParticles]);

  const styles = {
    wrapper: {
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    video: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: 0,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background:
        'linear-gradient(180deg, rgba(2,6,23,0.85) 0%, rgba(2,6,23,0.7) 50%, rgba(2,6,23,0.95) 100%)',
      zIndex: 1,
    },
    canvas: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 2,
      pointerEvents: 'none',
    },
    content: {
      position: 'relative',
      zIndex: 3,
      textAlign: 'center',
      maxWidth: '900px',
      padding: '0 24px',
    },
    headline: {
      fontSize: 'clamp(2.2rem, 5vw, 4rem)',
      fontWeight: 800,
      lineHeight: 1.15,
      marginBottom: '24px',
      letterSpacing: '-0.02em',
    },
    word: (visible) => ({
      display: 'inline-block',
      marginRight: '0.3em',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)',
    }),
    subtext: {
      fontSize: 'clamp(1rem, 2vw, 1.25rem)',
      color: 'rgba(148,163,184,1)',
      maxWidth: '640px',
      margin: '0 auto 48px',
      lineHeight: 1.7,
      opacity: wordsVisible >= words.length ? 1 : 0,
      transform: wordsVisible >= words.length ? 'translateY(0)' : 'translateY(12px)',
      transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
    },
    ctaWrap: {
      opacity: wordsVisible >= words.length ? 1 : 0,
      transform: wordsVisible >= words.length ? 'translateY(0)' : 'translateY(16px)',
      transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s',
    },
    cta: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '18px 44px',
      fontSize: '1.1rem',
      fontWeight: 700,
      color: '#020617',
      background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
      border: 'none',
      borderRadius: '16px',
      cursor: 'pointer',
      boxShadow: '0 0 40px rgba(74,222,128,0.35), 0 0 80px rgba(74,222,128,0.15)',
      animation: 'ctaPulse 2.5s ease-in-out infinite',
      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    },
    scrollIndicator: {
      position: 'absolute',
      bottom: '40px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      color: 'rgba(148,163,184,0.6)',
      fontSize: '0.8rem',
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      animation: 'bounceArrow 2s ease-in-out infinite',
    },
  };

  return (
    <section style={styles.wrapper}>
      <style>{`
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 0 40px rgba(74,222,128,0.35), 0 0 80px rgba(74,222,128,0.15); }
          50% { box-shadow: 0 0 60px rgba(74,222,128,0.5), 0 0 120px rgba(74,222,128,0.25); }
        }
        @keyframes bounceArrow {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.6; }
          50% { transform: translateX(-50%) translateY(12px); opacity: 1; }
        }
        .hero-cta:hover {
          transform: scale(1.05) !important;
          box-shadow: 0 0 60px rgba(74,222,128,0.55), 0 0 120px rgba(74,222,128,0.3) !important;
        }
      `}</style>

      <video
        style={styles.video}
        src="/videos/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div style={styles.overlay} />
      <canvas ref={canvasRef} style={styles.canvas} />

      <div style={styles.content}>
        <p style={{
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: '#4ade80',
          fontWeight: 600,
          marginBottom: '20px',
          opacity: wordsVisible > 0 ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}>
          Carbon Footprint Awareness Platform
        </p>
        <h1 style={{
          ...styles.headline,
          color: '#f1f5f9',
        }}>
          {words.map((w, i) => (
            <span key={i} style={{
              ...styles.word(i < wordsVisible),
              color: (w === 'Impact' || w === 'Planet') ? '#4ade80' : '#f1f5f9',
              textShadow: (w === 'Impact' || w === 'Planet') ? '0 0 30px rgba(74,222,128,0.4)' : 'none',
            }}>
              {w}
            </span>
          ))}
        </h1>
        <p style={styles.subtext}>
          Track, reduce, and offset your carbon footprint with personalized
          insights and actionable challenges.
        </p>
        <div style={styles.ctaWrap}>
          <button
            className="hero-cta btn-primary"
            style={styles.cta}
            onClick={onStart}
          >
            Calculate Your Footprint
          </button>
        </div>
      </div>

      <div style={styles.scrollIndicator}>
        <span>Scroll</span>
        <ChevronDown size={22} />
      </div>
    </section>
  );
};



Hero.propTypes = {
};

export default Hero;
