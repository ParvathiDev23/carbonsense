import React, { useEffect, useRef, useState, useCallback } from 'react';
import { TreePine, Waves, Zap } from 'lucide-react';

const featureData = [
  {
    icon: TreePine,
    title: 'Forest Conservation',
    description:
      'Understand how your choices impact global deforestation and learn strategies to protect vital ecosystems.',
    image: '/images/forest.png',
  },
  {
    icon: Waves,
    title: 'Ocean Health',
    description:
      'Discover the connection between carbon emissions and ocean acidification, and how you can help reverse it.',
    image: '/images/ocean.png',
  },
  {
    icon: Zap,
    title: 'Clean Energy',
    description:
      'Transition to renewable energy sources and reduce your household carbon output by up to 80 percent.',
    image: '/images/energy.png',
  },
];

const statsData = [
  { value: 4.5, suffix: ' tons', label: 'Global Average CO2 per Person' },
  { value: 26, suffix: '%', label: 'Emissions from Transport' },
  { value: 14.5, suffix: '%', label: 'Emissions from Food' },
];

function useInView(ref, options = {}) {
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
      { threshold: 0.2, ...options }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);
  return inView;
}

function AnimatedCounter({ target, suffix, inView }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCurrent(target);
        clearInterval(timer);
      } else {
        setCurrent(start);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, target]);

  const display = Number.isInteger(target)
    ? Math.round(current)
    : current.toFixed(1);

  return (
    <span className="text-gradient" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>
      {display}{suffix}
    </span>
  );
}

function FeatureCard({ data, index, inView }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -12, y: x * 12 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const Icon = data.icon;

  return (
    <div
      ref={cardRef}
      className="glass-panel"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '20px',
        minHeight: '380px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '32px',
        cursor: 'pointer',
        transform: inView
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(0)`
          : 'perspective(800px) translateY(40px)',
        opacity: inView ? 1 : 0,
        transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 200}ms, opacity 0.6s ease ${index * 200}ms`,
        willChange: 'transform, opacity',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${data.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
          transition: 'transform 0.6s ease',
        }}
        className="feature-card-bg"
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(2,6,23,0.3) 0%, rgba(2,6,23,0.85) 70%, rgba(2,6,23,0.95) 100%)',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: 'rgba(74,222,128,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            border: '1px solid rgba(74,222,128,0.25)',
          }}
        >
          <Icon size={26} color="#4ade80" />
        </div>
        <h3
          style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#f1f5f9',
            marginBottom: '10px',
          }}
        >
          {data.title}
        </h3>
        <p
          style={{
            fontSize: '0.95rem',
            color: 'rgba(148,163,184,0.9)',
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {data.description}
        </p>
      </div>
    </div>
  );
}

const Features = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const sectionInView = useInView(sectionRef);
  const statsInView = useInView(statsRef);

  return (
    <section
      style={{
        padding: 'clamp(60px, 10vw, 120px) 24px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <style>{`
        .feature-card-bg {
          transform: scale(1);
        }
        .glass-panel:hover .feature-card-bg {
          transform: scale(1.08);
        }
      `}</style>

      <div ref={sectionRef} style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h2
          className="text-gradient animate-fade-in"
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 800,
            marginBottom: '16px',
            opacity: sectionInView ? 1 : 0,
            transform: sectionInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          Why CarbonSense?
        </h2>
        <p
          style={{
            fontSize: '1.1rem',
            color: '#94a3b8',
            maxWidth: '560px',
            margin: '0 auto',
            opacity: sectionInView ? 1 : 0,
            transform: sectionInView ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
          }}
        >
          Data-driven insights that make sustainability personal and actionable.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '28px',
          marginBottom: '80px',
        }}
      >
        {featureData.map((d, i) => (
          <FeatureCard key={i} data={d} index={i} inView={sectionInView} />
        ))}
      </div>

      <div
        ref={statsRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
          textAlign: 'center',
        }}
      >
        {statsData.map((s, i) => (
          <div
            key={i}
            className="glass-panel"
            style={{
              padding: '40px 24px',
              borderRadius: '20px',
              opacity: statsInView ? 1 : 0,
              transform: statsInView ? 'translateY(0)' : 'translateY(24px)',
              transition: `opacity 0.6s ease ${i * 150}ms, transform 0.6s ease ${i * 150}ms`,
            }}
          >
            <AnimatedCounter
              target={s.value}
              suffix={s.suffix}
              inView={statsInView}
            />
            <p
              style={{
                fontSize: '0.9rem',
                color: '#94a3b8',
                marginTop: '12px',
                lineHeight: 1.5,
              }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
