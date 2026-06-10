import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { steps } from '../data/calculatorSteps';


function ProgressRing({ step, total }) {
  const size = 72;
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = ((step + 1) / total) * circumference;

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(148,163,184,0.15)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#4ade80"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.16,1,0.3,1)' }}
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#f1f5f9"
        fontSize="14"
        fontWeight="700"
        style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}
      >
        {step + 1}/{total}
      </text>
    </svg>
  );
}

function ResultView({ selections, onComplete }) {
  const [countVal, setCountVal] = useState(0);
  const [showBar, setShowBar] = useState(false);

  const breakdown = {};
  let total = 0;
  steps.forEach((s) => {
    const val = selections[s.key] ?? 0;
    breakdown[s.key] = val;
    total += val;
  });
  total = Math.round(total * 10) / 10;

  useEffect(() => {
    let start = 0;
    const duration = 2200;
    const stepTime = 16;
    const numSteps = duration / stepTime;
    const inc = total / numSteps;
    const timer = setInterval(() => {
      start += inc;
      if (start >= total) {
        setCountVal(total);
        clearInterval(timer);
        setTimeout(() => setShowBar(true), 400);
      } else {
        setCountVal(Math.round(start * 10) / 10);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [total]);

  useEffect(() => {
    if (showBar && onComplete) {
      onComplete({ totalFootprint: total, breakdown });
    }
  }, [showBar]);

  const globalAvg = 4.5;
  const diff = total - globalAvg;
  const maxBar = Math.max(total, globalAvg, 6);

  return (
    <div style={{ textAlign: 'center', padding: '40px 0' }}>
      <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '8px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        Your Estimated Annual Footprint
      </p>
      <div
        className="text-gradient"
        style={{
          fontSize: 'clamp(3rem, 8vw, 5rem)',
          fontWeight: 900,
          lineHeight: 1,
          marginBottom: '8px',
        }}
      >
        {countVal.toFixed(1)}
      </div>
      <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '40px' }}>
        tons of CO2 per year
      </p>

      <div
        style={{
          opacity: showBar ? 1 : 0,
          transform: showBar ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)',
          maxWidth: '480px',
          margin: '0 auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <span style={{ color: '#f1f5f9', fontSize: '0.9rem', minWidth: '80px', textAlign: 'right' }}>You</span>
          <div style={{ flex: 1, height: '28px', borderRadius: '8px', background: 'rgba(148,163,184,0.1)', overflow: 'hidden' }}>
            <div
              style={{
                width: `${(total / maxBar) * 100}%`,
                height: '100%',
                borderRadius: '8px',
                background: diff > 0 ? 'linear-gradient(90deg, #f59e0b, #ef4444)' : 'linear-gradient(90deg, #22c55e, #4ade80)',
                transition: 'width 1s cubic-bezier(0.16,1,0.3,1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '10px',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#020617',
              }}
            >
              {total.toFixed(1)}t
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.9rem', minWidth: '80px', textAlign: 'right' }}>Global Avg</span>
          <div style={{ flex: 1, height: '28px', borderRadius: '8px', background: 'rgba(148,163,184,0.1)', overflow: 'hidden' }}>
            <div
              style={{
                width: `${(globalAvg / maxBar) * 100}%`,
                height: '100%',
                borderRadius: '8px',
                background: 'linear-gradient(90deg, rgba(148,163,184,0.3), rgba(148,163,184,0.5))',
                transition: 'width 1s cubic-bezier(0.16,1,0.3,1) 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '10px',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#94a3b8',
              }}
            >
              {globalAvg}t
            </div>
          </div>
        </div>
        <p style={{ marginTop: '24px', fontSize: '1rem', color: diff > 0 ? '#fbbf24' : '#4ade80', fontWeight: 600 }}>
          {diff > 0
            ? `${Math.abs(diff).toFixed(1)} tons above the global average`
            : `${Math.abs(diff).toFixed(1)} tons below the global average`}
        </p>
      </div>
    </div>
  );
}

const Calculator = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [finished, setFinished] = useState(false);

  const step = steps[currentStep];

  const handleSelect = useCallback(
    (key, value) => {
      setSelections((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const goNext = useCallback(() => {
    if (currentStep === steps.length - 1) {
      setDirection(1);
      setAnimating(true);
      setTimeout(() => {
        setFinished(true);
        setAnimating(false);
      }, 350);
      return;
    }
    setDirection(1);
    setAnimating(true);
    setTimeout(() => {
      setCurrentStep((s) => s + 1);
      setAnimating(false);
    }, 350);
  }, [currentStep]);

  const goBack = useCallback(() => {
    if (finished) {
      setDirection(-1);
      setAnimating(true);
      setTimeout(() => {
        setFinished(false);
        setCurrentStep(steps.length - 1);
        setAnimating(false);
      }, 350);
      return;
    }
    if (currentStep === 0) return;
    setDirection(-1);
    setAnimating(true);
    setTimeout(() => {
      setCurrentStep((s) => s - 1);
      setAnimating(false);
    }, 350);
  }, [currentStep, finished]);

  const selected = selections[step?.key];

  return (
    <section
      style={{
        padding: 'clamp(60px, 8vw, 100px) 24px',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <style>{`
        .calc-option:hover {
          border-color: rgba(74,222,128,0.4) !important;
          background: rgba(74,222,128,0.06) !important;
        }
        .calc-nav:hover:not(:disabled) {
          background: rgba(74,222,128,0.15) !important;
          border-color: rgba(74,222,128,0.4) !important;
        }
        .calc-nav:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}</style>

      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2
          className="text-gradient"
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 800,
            marginBottom: '12px',
          }}
        >
          Carbon Footprint Calculator
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
          Answer 5 quick questions to estimate your annual carbon footprint.
        </p>
      </div>

      <div className="glass-panel" style={{ borderRadius: '24px', padding: 'clamp(24px, 4vw, 48px)', overflow: 'hidden' }}>
        {!finished && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                {step && React.createElement(step.icon, { size: 20, color: '#4ade80' })}
                <span style={{ color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                  {step?.label}
                </span>
              </div>
            </div>
            <ProgressRing step={currentStep} total={steps.length} />
          </div>
        )}

        <div
          style={{
            transform: animating
              ? `translateX(${direction * -60}px)`
              : 'translateX(0)',
            opacity: animating ? 0 : 1,
            transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease',
          }}
        >
          {finished ? (
            <ResultView selections={selections} onComplete={onComplete} />
          ) : (
            <>
              <h3
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: '#f1f5f9',
                  marginBottom: '28px',
                }}
              >
                {step?.question}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {step?.options.map((opt) => {
                  const isSelected = selected === opt.value;
                  return (
                    <button
                      key={opt.title}
                      className="calc-option"
                      onClick={() => handleSelect(step.key, opt.value)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '18px 22px',
                        borderRadius: '16px',
                        border: isSelected
                          ? '2px solid #4ade80'
                          : '2px solid rgba(148,163,184,0.12)',
                        background: isSelected
                          ? 'rgba(74,222,128,0.08)'
                          : 'rgba(15,23,42,0.4)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                        boxShadow: isSelected
                          ? '0 0 20px rgba(74,222,128,0.15)'
                          : 'none',
                        color: '#f1f5f9',
                      }}
                    >
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          border: isSelected
                            ? '2px solid #4ade80'
                            : '2px solid rgba(148,163,184,0.25)',
                          background: isSelected ? '#4ade80' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {isSelected && <Check size={16} color="#020617" strokeWidth={3} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '2px' }}>
                          {opt.title}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                          {opt.desc}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          color: opt.value === 0 ? '#4ade80' : '#fbbf24',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {opt.value}t
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '36px' }}>
          <button
            className="calc-nav"
            onClick={goBack}
            disabled={currentStep === 0 && !finished}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '12px',
              border: '1px solid rgba(148,163,184,0.2)',
              background: 'rgba(15,23,42,0.4)',
              color: '#f1f5f9',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
          >
            <ChevronLeft size={18} />
            Back
          </button>
          {!finished && (
            <button
              className="calc-nav"
              onClick={goNext}
              disabled={selected === undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '12px',
                border: '1px solid rgba(74,222,128,0.3)',
                background: selected !== undefined ? 'rgba(74,222,128,0.12)' : 'rgba(15,23,42,0.4)',
                color: '#4ade80',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {currentStep === steps.length - 1 ? 'See Results' : 'Next'}
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};



Calculator.propTypes = {
};

export default Calculator;
