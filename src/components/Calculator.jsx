import { useState } from 'react';
import { ArrowRight, ArrowLeft, Leaf, Car, Zap, Utensils } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'diet',
    icon: Utensils,
    title: "What is your typical diet?",
    options: [
      { label: 'Meat in most meals', value: 3.3, desc: 'High carbon impact' },
      { label: 'Meat occasionally', value: 2.5, desc: 'Medium carbon impact' },
      { label: 'Vegetarian', value: 1.7, desc: 'Low carbon impact' },
      { label: 'Vegan', value: 1.5, desc: 'Lowest carbon impact' }
    ]
  },
  {
    id: 'transport',
    icon: Car,
    title: "How do you usually commute?",
    options: [
      { label: 'Drive alone (Gas)', value: 4.5, desc: 'Daily driving' },
      { label: 'Drive (Electric/Hybrid)', value: 2.0, desc: 'Lower emissions' },
      { label: 'Public Transit', value: 1.2, desc: 'Bus or train' },
      { label: 'Walk / Bike', value: 0.0, desc: 'Zero emissions' }
    ]
  },
  {
    id: 'energy',
    icon: Zap,
    title: "What best describes your home energy use?",
    options: [
      { label: 'Large home, standard grid', value: 5.0, desc: 'High consumption' },
      { label: 'Medium home/apt, standard grid', value: 3.0, desc: 'Average consumption' },
      { label: 'Energy efficient/renewable mix', value: 1.5, desc: 'Low consumption' },
      { label: '100% Renewable energy', value: 0.0, desc: 'Zero emissions' }
    ]
  }
];

export default function Calculator({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleSelect = (value) => {
    setAnswers({ ...answers, [QUESTIONS[step].id]: value });
  };

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const diet = answers.diet || 2.5;
      const transport = answers.transport || 2.0;
      const energy = answers.energy || 3.0;
      const totalFootprint = Math.round((diet + transport + energy) * 10) / 10;
      
      onComplete({
        totalFootprint,
        breakdown: { diet, transport, energy }
      });
    }
  };

  const currentQ = QUESTIONS[step];
  const Icon = currentQ.icon;
  const isSelected = (val) => answers[currentQ.id] === val;

  return (
    <div className="glass-panel animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
      
      {/* Progress Bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'rgba(255,255,255,0.1)' }}>
        <div style={{ 
          height: '100%', 
          background: 'var(--accent-primary)', 
          width: `${((step + 1) / QUESTIONS.length) * 100}%`,
          transition: 'width 0.3s ease'
        }} />
      </div>

      <div className="flex flex-col items-center" style={{ padding: '2rem 1rem' }}>
        <div style={{ 
          background: 'rgba(59, 130, 246, 0.1)', 
          padding: '1rem', 
          borderRadius: '50%', 
          marginBottom: '1.5rem',
          color: 'var(--accent-secondary)'
        }}>
          <Icon size={48} strokeWidth={1.5} />
        </div>
        
        <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', textAlign: 'center' }}>
          {currentQ.title}
        </h2>

        <div className="flex flex-col gap-4 w-full" style={{ marginBottom: '2rem' }}>
          {currentQ.options.map((opt, i) => (
            <button 
              key={i}
              onClick={() => handleSelect(opt.value)}
              style={{
                background: isSelected(opt.value) ? 'rgba(16, 185, 129, 0.1)' : 'rgba(0,0,0,0.2)',
                border: `1px solid ${isSelected(opt.value) ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.2s ease',
                color: 'var(--text-primary)',
                textAlign: 'left'
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{opt.label}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{opt.desc}</div>
              </div>
              {isSelected(opt.value) && <Leaf color="var(--accent-primary)" size={20} />}
            </button>
          ))}
        </div>

        <div className="flex justify-between w-full" style={{ marginTop: 'auto' }}>
          <button 
            className="btn-secondary" 
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            style={{ opacity: step === 0 ? 0 : 1 }}
          >
            <ArrowLeft size={18} /> Back
          </button>
          
          <button 
            className="btn-primary" 
            onClick={handleNext}
            disabled={answers[currentQ.id] === undefined}
          >
            {step === QUESTIONS.length - 1 ? 'See Results' : 'Next'} <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
