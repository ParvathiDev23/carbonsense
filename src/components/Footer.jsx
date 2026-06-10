import { Leaf, ExternalLink } from 'lucide-react';

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const columns = [
  {
    heading: 'Product',
    links: ['Calculator', 'Dashboard', 'Actions'],
  },
  {
    heading: 'Resources',
    links: ['Carbon Facts', 'Tips', 'Blog'],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'GitHub', icon: GithubIcon },
      { label: 'LinkedIn', icon: LinkedinIcon },
      { label: 'Twitter', icon: TwitterIcon },
    ],
  },
];


const Footer = () => {
  const linkStyle = {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '0.95rem',
    transition: 'color 0.25s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  };

  return (
    <footer
      className="glass-panel"
      style={{
        position: 'relative',
        marginTop: '80px',
        borderRadius: '0',
        borderTop: 'none',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #4ade80, #22d3ee, #a78bfa, #4ade80)',
          backgroundSize: '300% 100%',
          animation: 'gradientSlide 4s linear infinite',
        }}
      />

      <style>{`
        @keyframes gradientSlide {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        .footer-link:hover {
          color: #4ade80 !important;
        }
      `}</style>

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '64px 24px 40px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '48px',
            marginBottom: '56px',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '16px',
              }}
            >
              <Leaf size={28} color="#4ade80" />
              <span
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: '#f1f5f9',
                }}
              >
                CarbonSense
              </span>
            </div>
            <p
              style={{
                color: '#94a3b8',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                maxWidth: '260px',
              }}
            >
              Making sustainability personal.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <h4
                style={{
                  color: '#f1f5f9',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '20px',
                }}
              >
                {col.heading}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {col.links.map((link) => {
                  const isObj = typeof link === 'object';
                  const label = isObj ? link.label : link;
                  const Icon = isObj ? link.icon : null;
                  return (
                    <li key={label}>
                      <a href="#" className="footer-link" style={linkStyle}>
                        {Icon && <Icon size={16} />}
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(148,163,184,0.1)',
            paddingTop: '24px',
            textAlign: 'center',
            color: 'rgba(148,163,184,0.5)',
            fontSize: '0.85rem',
          }}
        >
          Built with purpose
        </div>
      </div>
    </footer>
  );
};

export default Footer;
