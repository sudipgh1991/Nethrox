import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3, Shield, Settings, CheckCircle, Zap, Lock, TrendingUp, Globe, Clock,
  Mail, Phone, MapPin, ArrowRight, Bot, User,
  DollarSign, Layers, Sun, Moon,
} from 'lucide-react';

/* ── Typewriter ─────────────────────────────────────── */
const PHRASES = [
  'building the AI brain for global risk, compliance, and fraud prevention—transforming data into decisions',
  'customizable analytics turning complex data into actionable intelligence',
];

function TypewriterText() {
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const phrase = PHRASES[phraseIdx];
    let timer;
    if (!deleting && charIdx < phrase.length) {
      timer = setTimeout(() => { setDisplayed(phrase.slice(0, charIdx + 1)); setCharIdx(i => i + 1); }, 40);
    } else if (!deleting && charIdx === phrase.length) {
      timer = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => { setDisplayed(phrase.slice(0, charIdx - 1)); setCharIdx(i => i - 1); }, 18);
    } else {
      setDeleting(false);
      setPhraseIdx(i => (i + 1) % PHRASES.length);
    }
    return () => clearTimeout(timer);
  }, [charIdx, deleting, phraseIdx]);

  return (
    <div style={{ background: 'linear-gradient(135deg, #0a1929 0%, #0f1d42 100%)', borderRadius: 16, padding: '22px 26px', border: '1px solid rgba(201,169,97,0.2)', boxShadow: '0 8px 32px rgba(10,25,41,0.35)' }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: '#c9a961', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>
        Nethrox AI
      </div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.9)', lineHeight: 1.65, minHeight: 50 }}>
        <span style={{ color: 'rgba(255,255,255,0.45)' }}>Nethrox is </span>
        <span style={{ color: '#c9a961' }}>{displayed}</span>
        <span style={{ opacity: cursor ? 1 : 0, color: '#4a9fb5', fontWeight: 300, transition: 'opacity 0.1s' }}>|</span>
      </div>
    </div>
  );
}

/* ── AI Mini Player ─────────────────────────────────── */
const AI_SCENES = [
  {
    tag: 'FCPA Analytics', tagColor: '#c9a961',
    prompt: 'Run the Duplicate Payment Detection test',
    statusEmoji: '✅', status: 'Test executed successfully!',
    bullets: ['Found 23 duplicate invoices totaling $45,230', 'Impact: $45,230 in overpayments', 'Vendors affected: 8', 'Recovery potential: 100%'],
    footer: "Detailed report generated. You'll be notified when analysis is complete.",
  },
  {
    tag: 'AML Monitoring', tagColor: '#4a9fb5',
    prompt: 'Show suspicious AML transactions — last 24h',
    statusEmoji: '🔍', status: 'Analysis complete!',
    bullets: ['7 anomalous patterns detected', 'Highest risk score: 94 / 100', 'Flagged amount: $2.1M', 'Jurisdictions flagged: 3 high-risk'],
    footer: 'Real-time alerts dispatched to compliance team.',
  },
  {
    tag: 'Compliance Report', tagColor: '#2d5a4a',
    prompt: 'Generate FCPA compliance report for Q1 2026',
    statusEmoji: '📊', status: 'Report generated!',
    bullets: ['Overall compliance rate: 99.2%', 'Transactions reviewed: 1.4M', 'Violations detected: 11', 'Remediation actions: 11'],
    footer: 'Executive summary ready for download.',
  },
];

function AIMiniPlayer() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setSceneIdx(i => (i + 1) % AI_SCENES.length); setVisible(true); }, 300);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const scene = AI_SCENES[sceneIdx];

  return (
    <div style={{ background: 'linear-gradient(160deg, #0a1929 0%, #0f2744 100%)', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(74,159,181,0.2)', boxShadow: '0 16px 48px rgba(10,25,41,0.5)' }}>
      {/* Window chrome */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}>
        <div style={{ display: 'flex', gap: 5 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: 0.5 }}>AI Assistant</span>
        <div style={{ fontSize: 9, fontWeight: 700, color: scene.tagColor, background: `${scene.tagColor}1a`, padding: '2px 8px', borderRadius: 4, letterSpacing: 0.5, opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}>
          {scene.tag}
        </div>
      </div>
      {/* Chat */}
      <div style={{ padding: '14px', opacity: visible ? 1 : 0, transition: 'opacity 0.4s', minHeight: 190 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, #1e3a5f, #4a9fb5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Bot size={13} color="white" />
          </div>
          <div style={{ background: 'rgba(74,159,181,0.12)', border: '1px solid rgba(74,159,181,0.18)', borderRadius: '0 10px 10px 10px', padding: '8px 12px', fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
            Which test would you like me to execute?
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10, justifyContent: 'flex-end' }}>
          <div style={{ background: 'rgba(201,169,97,0.1)', border: '1px solid rgba(201,169,97,0.18)', borderRadius: '10px 0 10px 10px', padding: '8px 12px', fontSize: 12, color: 'rgba(255,255,255,0.8)', maxWidth: '72%' }}>
            {scene.prompt}
          </div>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, #c9a961, #2d5a4a)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <User size={13} color="white" />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, #1e3a5f, #4a9fb5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Bot size={13} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 12, color: '#4a9fb5', marginBottom: 6 }}>{scene.statusEmoji} {scene.status}</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {scene.bullets.map((b, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 11, color: 'rgba(255,255,255,0.7)', marginBottom: 3 }}>
                  <CheckCircle size={10} color={scene.tagColor} style={{ flexShrink: 0, marginTop: 2 }} />
                  {b}
                </li>
              ))}
            </ul>
            {scene.footer && <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 8 }}>{scene.footer}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Navigation ─────────────────────────────────────── */
function Navigation({ onLaunchApp, darkMode, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // Nav background
  const navBg = scrolled
    ? (darkMode ? 'rgba(8,14,26,0.97)' : 'rgba(255,255,255,0.97)')
    : 'transparent';
  const navBorder = scrolled
    ? (darkMode ? '1px solid rgba(201,169,97,0.12)' : '1px solid rgba(15,29,66,0.08)')
    : '1px solid transparent';
  // Text color: in light mode at top hero is light bg so dark text; in dark mode hero is dark so light text
  const navText = darkMode ? 'rgba(255,255,255,0.88)' : '#1a2744';

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 68, zIndex: 1000, background: navBg, backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none', WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none', borderBottom: navBorder, transition: 'all 0.35s ease' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 36px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo — only appears when scrolled */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer', opacity: scrolled ? 1 : 0, transform: scrolled ? 'translateY(0)' : 'translateY(-8px)', transition: 'opacity 0.3s ease, transform 0.3s ease', pointerEvents: scrolled ? 'auto' : 'none' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/logo.jpg" alt="Nethrox" style={{ width: 34, height: 34, objectFit: 'cover', borderRadius: 8 }} />
          <span style={{ fontWeight: 800, fontSize: 18, fontFamily: "'Space Grotesk', sans-serif", color: navText, letterSpacing: '-0.3px' }}>Nethrox</span>
        </div>
        <nav style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {[['why', 'Why Nethrox'], ['enterprise', 'Enterprise'], ['contact', 'Get In Touch']].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)}
              style={{ background: 'none', border: 'none', fontWeight: 600, fontSize: 14, color: navText, cursor: 'pointer', padding: '7px 14px', borderRadius: 8, transition: 'color 0.2s', fontFamily: 'inherit' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#c9a961'; }}
              onMouseLeave={e => { e.currentTarget.style.color = navText; }}>
              {label}
            </button>
          ))}
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{ marginLeft: 6, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: darkMode ? 'rgba(240,192,64,0.1)' : 'rgba(15,29,66,0.07)', border: darkMode ? '1px solid rgba(240,192,64,0.25)' : '1px solid rgba(15,29,66,0.12)', borderRadius: 10, cursor: 'pointer', transition: 'all 0.2s', color: darkMode ? '#f0c040' : '#0f1d42' }}
            onMouseEnter={e => { e.currentTarget.style.background = darkMode ? 'rgba(240,192,64,0.2)' : 'rgba(15,29,66,0.13)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = darkMode ? 'rgba(240,192,64,0.1)' : 'rgba(15,29,66,0.07)'; }}>
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button onClick={onLaunchApp}
            style={{ marginLeft: 8, padding: '8px 18px', fontSize: 13, fontWeight: 700, background: 'linear-gradient(135deg, #c9a961 0%, #e8c96a 100%)', color: '#0a111e', borderRadius: 8, cursor: 'pointer', border: 'none', letterSpacing: 0.3, transition: 'all 0.2s', fontFamily: 'inherit', boxShadow: '0 2px 12px rgba(201,169,97,0.4)' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(201,169,97,0.55)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(201,169,97,0.4)'; }}>
            Book Demo
          </button>
        </nav>
      </div>
    </header>
  );
}

/* ── Hero Section ───────────────────────────────────── */

const KPIS = [
  { value: '10M+', label: 'Transactions Analyzed' },
  { value: '99.9%', label: 'Detection Accuracy' },
  { value: '500+', label: 'Compliance Rules' },
  { value: '50+', label: 'Enterprise Clients' },
];

function Hero({ onLaunchApp, darkMode }) {
  const heroBg = darkMode
    ? 'linear-gradient(160deg, #060d1a 0%, #0a1736 40%, #0d2147 70%, #071228 100%)'
    : 'linear-gradient(160deg, #ffffff 0%, #f0f5ff 45%, #e8f0fe 100%)';
  const gridLine = darkMode ? 'rgba(201,169,97,0.04)' : 'rgba(15,29,66,0.04)';
  const headingColor = darkMode ? '#ffffff' : '#0f1d42';
  const bodyColor = darkMode ? 'rgba(255,255,255,0.6)' : '#64748b';
  const badgeBg = darkMode ? 'rgba(201,169,97,0.12)' : 'rgba(201,169,97,0.1)';
  const badgeBorder = darkMode ? 'rgba(201,169,97,0.35)' : 'rgba(201,169,97,0.3)';
  const badgeText = darkMode ? '#e0c46e' : '#9a7020';
  const learnMoreColor = darkMode ? 'rgba(255,255,255,0.85)' : '#0f1d42';
  const learnMoreBorder = darkMode ? 'rgba(255,255,255,0.22)' : 'rgba(15,29,66,0.2)';
  const logoShadow = darkMode
    ? '0 0 40px rgba(201,169,97,0.35), 0 0 80px rgba(201,169,97,0.12)'
    : '0 8px 36px rgba(15,29,66,0.15), 0 2px 8px rgba(15,29,66,0.1)';

  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: heroBg, paddingTop: 68 }}>
      {/* Orbs */}
      <div style={{ position: 'absolute', top: '5%', left: '3%', width: 420, height: 420, borderRadius: '50%', background: darkMode ? 'radial-gradient(circle, rgba(201,169,97,0.13) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(201,169,97,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '20%', right: '2%', width: 360, height: 360, borderRadius: '50%', background: darkMode ? 'radial-gradient(circle, rgba(74,159,181,0.12) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(74,159,181,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${gridLine} 1px, transparent 1px), linear-gradient(90deg, ${gridLine} 1px, transparent 1px)`, backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      {/* Main content */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 36px', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center', paddingTop: 36, paddingBottom: 36 }}>

          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ marginBottom: 18, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src="/logo.jpg" alt="Nethrox" style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 28, boxShadow: logoShadow, marginBottom: 10 }} />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 30, color: headingColor, letterSpacing: '-0.4px' }}>Nethrox</span>
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: badgeBg, border: `1px solid ${badgeBorder}`, borderRadius: 999, padding: '5px 14px', marginBottom: 16 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#28c840', boxShadow: '0 0 7px #28c840' }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: badgeText, letterSpacing: 1.2, textTransform: 'uppercase' }}>AI-Powered Compliance Platform</span>
            </div>

            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 44, fontWeight: 800, color: headingColor, lineHeight: 1.1, letterSpacing: -1.5, margin: '0 0 14px' }}>
              Uncover risks<br />
              <span style={{ background: 'linear-gradient(135deg, #f0c040 0%, #c9a961 50%, #4ad9b0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Ensure compliance</span>
            </h1>
            <p style={{ fontSize: 14, color: bodyColor, lineHeight: 1.75, marginBottom: 24, maxWidth: 400 }}>
              Advanced analytics for FCPA compliance, AML monitoring, and customisable data analysis — turning complex data into actionable intelligence.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 22px', background: 'linear-gradient(135deg, #c9a961 0%, #e8c96a 100%)', color: '#0a111e', fontWeight: 700, fontSize: 14, borderRadius: 10, cursor: 'pointer', border: 'none', boxShadow: '0 4px 20px rgba(201,169,97,0.45)', transition: 'all 0.22s', fontFamily: 'inherit' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(201,169,97,0.6)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,169,97,0.45)'; }}>
                Book a Demo <ArrowRight size={15} />
              </button>
              <button onClick={onLaunchApp} style={{ padding: '11px 22px', background: 'transparent', color: learnMoreColor, fontWeight: 600, fontSize: 14, borderRadius: 10, cursor: 'pointer', border: `1.5px solid ${learnMoreBorder}`, transition: 'all 0.22s', fontFamily: 'inherit' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,169,97,0.6)'; e.currentTarget.style.color = '#c9a961'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = learnMoreBorder; e.currentTarget.style.color = learnMoreColor; }}>
                Learn More
              </button>
            </div>
          </div>

          {/* Right: AI cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <TypewriterText />
            <AIMiniPlayer />
          </div>

        </div>
      </div>

      {/* Solution cards — between hero and KPI strip */}
      <div style={{ position: 'relative', zIndex: 1, padding: '8px 36px 24px', maxWidth: 1240, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: 18 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.8, textTransform: 'uppercase', color: darkMode ? 'rgba(255,255,255,0.3)' : '#94a3b8' }}>Our Key Solutions</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { icon: <BarChart3 size={24} />, title: 'FCPA Analytics', description: 'Accounts Payable, Time & Expense, and Sales analytics' },
            { icon: <Shield size={24} />, title: 'AML Monitoring', description: 'Transaction monitoring and suspicious activity detection' },
            { icon: <Settings size={24} />, title: 'Custom Analytics', description: 'Flexible analytics for any dataset with customizable rules' },
          ].map(card => (
            <div key={card.title}
              style={{ background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.85)', borderRadius: 16, padding: '22px 20px', border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(15,29,66,0.08)', boxShadow: darkMode ? 'none' : '0 2px 16px rgba(15,29,66,0.06)', textAlign: 'center', transition: 'all 0.25s ease', cursor: 'default', backdropFilter: 'blur(8px)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = darkMode ? '0 8px 32px rgba(99,102,241,0.2)' : '0 8px 32px rgba(99,102,241,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(15,29,66,0.08)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = darkMode ? 'none' : '0 2px 16px rgba(15,29,66,0.06)'; }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: darkMode ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.08)', border: darkMode ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(99,102,241,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: '#6366f1' }}>
                {card.icon}
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: darkMode ? '#ffffff' : '#0f1d42', marginBottom: 6 }}>{card.title}</h3>
              <p style={{ fontSize: 12, color: darkMode ? 'rgba(255,255,255,0.45)' : '#64748b', lineHeight: 1.55 }}>{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* KPI strip — dark bar anchored to hero bottom */}
      <div style={{ position: 'relative', zIndex: 1, background: 'linear-gradient(135deg, #0a1736 0%, #0f1d42 50%, #0a1736 100%)', borderTop: '1px solid rgba(201,169,97,0.12)', padding: '28px 24px' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {KPIS.map((k, i) => (
            <div key={k.label} style={{ textAlign: 'center', padding: '0 20px', borderRight: i < KPIS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 800, color: '#f0c040', letterSpacing: -1, lineHeight: 1.1 }}>{k.value}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 500, marginTop: 5 }}>{k.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── WhyNethrox ─────────────────────────────────────── */
const WHY_FEATURES = [
  { icon: <Zap size={22} color="#d4af37" />, title: 'Real-Time Intelligence', description: 'Detect fraud and compliance violations the moment they occur with our advanced real-time analytics engine.' },
  { icon: <CheckCircle size={22} color="#d4af37" />, title: '99.9% Accuracy', description: 'Industry-leading detection precision that minimizes false positives while catching genuine threats.' },
  { icon: <Lock size={22} color="#d4af37" />, title: 'Enterprise Security', description: 'Bank-grade encryption with full SOC 2 Type II, ISO 27001, and global data protection compliance.' },
  { icon: <TrendingUp size={22} color="#d4af37" />, title: 'Infinite Scalability', description: 'Handle hundreds of millions of transactions daily with elastic enterprise-grade infrastructure.' },
  { icon: <Globe size={22} color="#d4af37" />, title: 'Global Coverage', description: 'Multi-jurisdiction compliance rules aligned with FCPA, GDPR, FinCEN, and regional regulations.' },
  { icon: <Clock size={22} color="#d4af37" />, title: '24/7 Expert Support', description: 'Dedicated compliance engineers and support teams available around the clock for enterprise clients.' },
];

function WhyNethrox({ darkMode }) {
  const bg = darkMode ? 'linear-gradient(180deg, #071228 0%, #0a1736 100%)' : '#ffffff';
  const dotColor = darkMode ? 'rgba(201,169,97,0.08)' : 'rgba(15,29,66,0.04)';
  const badgeText = darkMode ? '#f0c040' : '#9a7020';
  const badgeBg = darkMode ? 'rgba(201,169,97,0.12)' : 'rgba(212,175,55,0.08)';
  const badgeBorder = darkMode ? 'rgba(201,169,97,0.3)' : 'rgba(212,175,55,0.2)';
  const headingColor = darkMode ? '#ffffff' : '#0f1d42';
  const subText = darkMode ? 'rgba(255,255,255,0.5)' : '#64748b';
  const cardBg = darkMode ? 'rgba(255,255,255,0.04)' : '#f8fafc';
  const cardBorder = darkMode ? 'rgba(201,169,97,0.1)' : 'rgba(15,29,66,0.07)';
  const cardHoverBg = darkMode ? 'rgba(255,255,255,0.07)' : '#ffffff';
  const cardHoverBorder = darkMode ? 'rgba(201,169,97,0.35)' : 'rgba(212,175,55,0.3)';
  const cardHoverShadow = darkMode ? '0 8px 40px rgba(201,169,97,0.18)' : '0 8px 32px rgba(15,29,66,0.1)';
  const titleColor = darkMode ? '#ffffff' : '#0f1d42';
  const descColor = darkMode ? 'rgba(255,255,255,0.5)' : '#64748b';
  const iconBg = darkMode ? 'linear-gradient(135deg, rgba(201,169,97,0.15), rgba(74,217,176,0.1))' : 'rgba(212,175,55,0.08)';
  const iconBorder = darkMode ? 'rgba(201,169,97,0.25)' : 'rgba(212,175,55,0.2)';

  return (
    <section id="why" style={{ position: 'relative', overflow: 'hidden', background: bg, padding: '96px 24px' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`, backgroundSize: '32px 32px', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1120, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 68 }}>
          <span style={{ display: 'inline-block', padding: '6px 18px', background: badgeBg, color: badgeText, borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 20, border: `1px solid ${badgeBorder}` }}>
            Why Choose Nethrox
          </span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 42, fontWeight: 800, color: headingColor, marginBottom: 16, lineHeight: 1.12 }}>
            Why Leading Organizations<br />
            <span style={{ background: 'linear-gradient(135deg, #f0c040, #4ad9b0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Choose Nethrox</span>
          </h2>
          <p style={{ fontSize: 17, color: subText, maxWidth: 560, margin: '0 auto', lineHeight: 1.65 }}>
            Combining cutting-edge AI technology with deep compliance expertise to deliver unmatched fraud detection capabilities.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {WHY_FEATURES.map((f, i) => (
            <div key={i} style={{ background: cardBg, borderRadius: 16, padding: '28px', border: `1px solid ${cardBorder}`, transition: 'all 0.3s ease', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = cardHoverShadow; e.currentTarget.style.borderColor = cardHoverBorder; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.background = cardHoverBg; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = cardBorder; e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = cardBg; }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: iconBg, border: `1px solid ${iconBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                {f.icon}
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: titleColor, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: descColor, lineHeight: 1.65 }}>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Enterprise Focus ───────────────────────────────── */
const BENEFITS = [
  { tag: 'FASTER', title: '30x Faster Turnaround', description: 'AI-powered platform that accelerates the entire risk & compliance analytics lifecycle.', icon: <Zap size={18} color="#d4af37" /> },
  { tag: 'COST-EFFECTIVE', title: 'Up to 80% Cost Savings', description: 'Preserve up to 80% of margins by reducing manual effort and inefficiencies.', icon: <DollarSign size={18} color="#d4af37" /> },
  { tag: 'TRUSTED', title: 'Reliable Outcomes at Scale', description: 'AI-driven consistency ensures every result is accurate, explainable, and audit-ready.', icon: <CheckCircle size={18} color="#d4af37" /> },
  { tag: 'UNIFIED', title: 'One Platform. Complete Coverage.', description: 'A secure, unified SaaS platform that brings all your risk & compliance analytics into one place.', icon: <Layers size={18} color="#d4af37" /> },
];

const TESTIMONIALS = [
  { quote: 'Nethrox has transformed our compliance operations. We detect 40% more suspicious activities with half the false positives.', initial: 'J', name: 'James Whitfield', role: 'Chief Compliance Officer, Global Financial Group' },
  { quote: 'Implementing Nethrox cut our KYC turnaround time by 60%. Our analysts now focus on strategic decisions, not data wrangling.', initial: 'S', name: 'Sarah Chen', role: 'VP of Risk Management, Pacific Rim Finance' },
  { quote: 'The explainability of every AI-driven alert has made our regulators far more comfortable. Nethrox truly understands compliance.', initial: 'M', name: 'Marcus Osei', role: 'Head of AML Compliance, Meridian Capital' },
];

function EnterpriseFocus({ darkMode }) {
  const [tIdx, setTIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[tIdx];

  const bg = darkMode
    ? 'linear-gradient(175deg, #0e1e3a 0%, #071228 50%, #0a1a12 100%)'
    : 'linear-gradient(180deg, #f0f5ff 0%, #e8f0fe 100%)';
  const badgeBg = darkMode ? 'rgba(74,217,176,0.1)' : 'rgba(74,159,181,0.08)';
  const badgeBorder = darkMode ? 'rgba(74,217,176,0.25)' : 'rgba(74,159,181,0.2)';
  const badgeText = darkMode ? '#4ad9b0' : '#1a6e64';
  const headingColor = darkMode ? '#ffffff' : '#0f1d42';
  const subText = darkMode ? 'rgba(255,255,255,0.45)' : '#64748b';
  const cardBg = darkMode ? 'rgba(255,255,255,0.04)' : '#ffffff';
  const cardBorder = darkMode ? 'rgba(74,217,176,0.1)' : 'rgba(15,29,66,0.07)';
  const cardHoverBg = darkMode ? 'rgba(74,217,176,0.06)' : '#f8faff';
  const cardHoverBorder = darkMode ? 'rgba(74,217,176,0.3)' : 'rgba(201,169,97,0.3)';
  const tagColor = darkMode ? '#4ad9b0' : '#1a6e64';
  const cardTitle = darkMode ? '#ffffff' : '#0f1d42';
  const cardDesc = darkMode ? 'rgba(255,255,255,0.45)' : '#64748b';
  const quoteColor = darkMode ? '#f0c040' : '#c9a961';
  const quoteText = darkMode ? 'rgba(255,255,255,0.88)' : '#1a2744';
  const testBg = darkMode
    ? 'linear-gradient(145deg, rgba(201,169,97,0.08), rgba(74,217,176,0.06))'
    : 'linear-gradient(145deg, rgba(201,169,97,0.05), rgba(74,159,181,0.04))';
  const testBorder = darkMode ? 'rgba(201,169,97,0.25)' : 'rgba(201,169,97,0.2)';
  const testShadow = darkMode ? '0 0 60px rgba(201,169,97,0.06)' : '0 4px 32px rgba(15,29,66,0.08)';
  const authorName = darkMode ? '#ffffff' : '#0f1d42';
  const authorRole = darkMode ? 'rgba(255,255,255,0.45)' : '#64748b';
  const dotInactive = darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(15,29,66,0.15)';

  return (
    <section id="enterprise" style={{ position: 'relative', overflow: 'hidden', background: bg, padding: '96px 24px' }}>
      <div style={{ position: 'absolute', top: '15%', right: '-8%', width: 500, height: 500, borderRadius: '50%', background: darkMode ? 'radial-gradient(circle, rgba(74,217,176,0.08) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(74,159,181,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: darkMode ? 'radial-gradient(circle, rgba(201,169,97,0.08) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(201,169,97,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1120, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 68 }}>
          <span style={{ display: 'inline-block', padding: '6px 18px', background: badgeBg, color: badgeText, borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 20, border: `1px solid ${badgeBorder}` }}>
            Enterprise Grade
          </span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 42, fontWeight: 800, color: headingColor, marginBottom: 16, lineHeight: 1.12 }}>
            Built for Enterprise Scale
          </h2>
          <p style={{ fontSize: 17, color: subText, maxWidth: 560, margin: '0 auto', lineHeight: 1.65 }}>
            Trusted by Fortune 500 companies and global financial institutions across 10+ industries.
          </p>
        </div>

        {/* Benefits grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 64 }}>
          {BENEFITS.map((b, i) => (
            <div key={i} style={{ background: cardBg, borderRadius: 16, padding: '26px', border: `1px solid ${cardBorder}`, transition: 'all 0.3s', boxShadow: darkMode ? 'none' : '0 1px 4px rgba(15,29,66,0.05)' }}
              onMouseEnter={e => { e.currentTarget.style.background = cardHoverBg; e.currentTarget.style.borderColor = cardHoverBorder; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = cardBg; e.currentTarget.style.borderColor = cardBorder; e.currentTarget.style.transform = 'none'; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                {b.icon}
                <span style={{ fontSize: 10, fontWeight: 700, color: tagColor, letterSpacing: 1.5, textTransform: 'uppercase' }}>{b.tag}</span>
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: cardTitle, marginBottom: 8 }}>{b.title}</h3>
              <p style={{ fontSize: 13, color: cardDesc, lineHeight: 1.65 }}>{b.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', padding: '44px 48px', background: testBg, borderRadius: 24, border: `1px solid ${testBorder}`, boxShadow: testShadow }}>
          <div style={{ fontSize: 52, fontFamily: 'Georgia, serif', color: quoteColor, marginBottom: 8, lineHeight: 1, opacity: 0.8 }}>"</div>
          <p style={{ fontSize: 18, color: quoteText, lineHeight: 1.75, fontStyle: 'italic', marginBottom: 28 }}>{t.quote}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #c9a961, #4ad9b0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#0a111e', fontSize: 17, boxShadow: '0 0 16px rgba(201,169,97,0.35)' }}>{t.initial}</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, color: authorName, fontSize: 14 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: authorRole }}>{t.role}</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 24 }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setTIdx(i)} style={{ width: i === tIdx ? 24 : 8, height: 8, borderRadius: 999, background: i === tIdx ? '#f0c040' : dotInactive, border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s' }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Get In Touch ───────────────────────────────────── */
const CONTACT_ITEMS = [
  { icon: <Mail size={18} />, label: 'Email', value: 'hello@nethrox.com', href: 'mailto:hello@nethrox.com' },
  { icon: <Phone size={18} />, label: 'Phone', value: '+1 (555) 000-0000', href: 'tel:+15550000000' },
  { icon: <MapPin size={18} />, label: 'Headquarters', value: 'New York, NY · Global Operations', href: null },
  { icon: <Clock size={18} />, label: 'Business Hours', value: 'Mon – Fri, 9:00 AM – 6:00 PM EST', href: null },
];

function GetInTouch({ darkMode }) {
  const [form, setForm] = useState({ email: '', name: '', company: '', position: '' });
  const [submitted, setSubmitted] = useState(false);

  const sectionBg = darkMode ? 'linear-gradient(180deg, #060d1a 0%, #071228 100%)' : '#ffffff';
  const badgeText = darkMode ? '#f0c040' : '#9a7020';
  const badgeBg = darkMode ? 'rgba(201,169,97,0.12)' : 'rgba(212,175,55,0.08)';
  const badgeBorder = darkMode ? 'rgba(201,169,97,0.3)' : 'rgba(212,175,55,0.2)';
  const headingColor = darkMode ? '#ffffff' : '#0f1d42';
  const subText = darkMode ? 'rgba(255,255,255,0.45)' : '#64748b';
  const sectionTitle = darkMode ? '#ffffff' : '#0f1d42';
  const labelColor = darkMode ? 'rgba(255,255,255,0.35)' : '#94a3b8';
  const valueColor = darkMode ? 'rgba(255,255,255,0.85)' : '#0f1d42';
  const iconBg = darkMode ? 'rgba(201,169,97,0.1)' : 'rgba(212,175,55,0.08)';
  const iconBorder = darkMode ? 'rgba(201,169,97,0.2)' : 'rgba(212,175,55,0.2)';
  const iconColor = darkMode ? '#f0c040' : '#c9a961';
  const formBg = darkMode
    ? 'linear-gradient(145deg, #0f1d42 0%, #1e3a5f 100%)'
    : 'linear-gradient(145deg, #f8faff 0%, #f0f4ff 100%)';
  const formBorder = darkMode ? 'rgba(201,169,97,0.15)' : 'rgba(15,29,66,0.1)';
  const formShadow = darkMode ? '0 24px 60px rgba(15,29,66,0.2)' : '0 8px 40px rgba(15,29,66,0.08)';
  const formTitle = darkMode ? '#e2e8f0' : '#0f1d42';
  const fieldLabel = darkMode ? '#c9a961' : '#6b7280';
  const inputBg = darkMode ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.9)';
  const inputBorder = darkMode ? 'rgba(201,169,97,0.2)' : 'rgba(15,29,66,0.15)';
  const inputColor = darkMode ? '#e2e8f0' : '#0f1d42';
  const inputStyle = { width: '100%', padding: '13px 16px', fontSize: 14, borderRadius: 10, border: `1px solid ${inputBorder}`, background: inputBg, color: inputColor, fontFamily: 'inherit', outline: 'none', transition: 'box-shadow 0.2s, border-color 0.2s', boxSizing: 'border-box' };

  if (submitted) {
    return (
      <section id="contact" style={{ background: sectionBg, padding: '88px 24px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', padding: '60px 40px', background: formBg, borderRadius: 20, border: `1px solid ${formBorder}` }}>
          <div style={{ fontSize: 48, marginBottom: 16, color: '#c9a961' }}>✓</div>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: formTitle, fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Thank you!</h3>
          <p style={{ color: subText, fontSize: 16, lineHeight: 1.6 }}>We've received your request and will be in touch within 24 hours.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" style={{ position: 'relative', overflow: 'hidden', background: sectionBg, padding: '96px 24px' }}>
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 440, height: 440, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,169,97,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1120, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 68 }}>
          <span style={{ display: 'inline-block', padding: '6px 18px', background: badgeBg, color: badgeText, borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 20, border: `1px solid ${badgeBorder}` }}>
            Get In Touch
          </span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 42, fontWeight: 800, color: headingColor, lineHeight: 1.12, marginBottom: 16 }}>Ready to Get Started?</h2>
          <p style={{ fontSize: 17, color: subText, maxWidth: 520, margin: '0 auto', lineHeight: 1.65 }}>
            Request a demo or reach out to discover how Nethrox can transform your compliance operations.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 52, alignItems: 'start' }}>
          {/* Contact info */}
          <div>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: sectionTitle, marginBottom: 28 }}>Contact Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginBottom: 40 }}>
              {CONTACT_ITEMS.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: iconBg, border: `1px solid ${iconBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: iconColor, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: labelColor, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>{item.label}</div>
                    {item.href ? (
                      <a href={item.href} style={{ fontSize: 15, color: valueColor, textDecoration: 'none', fontWeight: 500 }}>{item.value}</a>
                    ) : (
                      <span style={{ fontSize: 15, color: valueColor, fontWeight: 500 }}>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Demo form */}
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ background: formBg, borderRadius: 20, padding: '36px', border: `1px solid ${formBorder}`, boxShadow: formShadow }}>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: formTitle, marginBottom: 24 }}>Request a Demo</h3>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: fieldLabel, marginBottom: 8, letterSpacing: 0.3 }}>Email *</label>
              <input type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required style={inputStyle}
                onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,169,97,0.3)'; e.currentTarget.style.borderColor = 'rgba(201,169,97,0.5)'; }}
                onBlur={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = inputBorder; }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: fieldLabel, marginBottom: 8, letterSpacing: 0.3 }}>Full Name *</label>
                <input type="text" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={inputStyle}
                  onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,169,97,0.3)'; e.currentTarget.style.borderColor = 'rgba(201,169,97,0.5)'; }}
                  onBlur={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = inputBorder; }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: fieldLabel, marginBottom: 8, letterSpacing: 0.3 }}>Company *</label>
                <input type="text" placeholder="Company name" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} required style={inputStyle}
                  onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,169,97,0.3)'; e.currentTarget.style.borderColor = 'rgba(201,169,97,0.5)'; }}
                  onBlur={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = inputBorder; }} />
              </div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: fieldLabel, marginBottom: 8, letterSpacing: 0.3 }}>Position</label>
              <input type="text" placeholder="Your title" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} style={inputStyle}
                onFocus={e => { e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,169,97,0.3)'; e.currentTarget.style.borderColor = 'rgba(201,169,97,0.5)'; }}
                onBlur={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = inputBorder; }} />
            </div>
            <button type="submit" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #c9a961 0%, #e8c96a 100%)', color: '#0a111e', fontWeight: 700, fontSize: 15, borderRadius: 10, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s', fontFamily: 'inherit' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(201,169,97,0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              Request Demo <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ─────────────────────────────────────────── */
const FOOTER_LINKS = {
  Product: ['FCPA Analytics', 'AML Monitoring', 'Custom Analytics', 'Integrations'],
  Company: ['About Us', 'Careers', 'Blog', 'Press'],
  Resources: ['Documentation', 'API Reference', 'Status', 'Support'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'],
};

function Footer({ darkMode }) {
  const bg = darkMode ? '#07101e' : '#f8faff';
  const border = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(15,29,66,0.08)';
  const logoText = darkMode ? '#ffffff' : '#0f1d42';
  const desc = darkMode ? 'rgba(255,255,255,0.4)' : '#64748b';
  const emailC = darkMode ? 'rgba(255,255,255,0.4)' : '#94a3b8';
  const colHead = darkMode ? 'rgba(255,255,255,0.45)' : '#94a3b8';
  const linkC = darkMode ? 'rgba(255,255,255,0.4)' : '#64748b';
  const bottom = darkMode ? 'rgba(255,255,255,0.28)' : '#94a3b8';

  return (
    <footer style={{ background: bg, borderTop: `1px solid ${border}` }}>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '56px 24px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img src="/logo.jpg" alt="Nethrox" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 10 }} />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: logoText }}>Nethrox</span>
            </div>
            <p style={{ fontSize: 13, color: desc, lineHeight: 1.7, marginBottom: 16, maxWidth: 220 }}>
              Intelligence that protects. Compliance analytics for the modern enterprise.
            </p>
            <a href="mailto:hello@nethrox.com" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: emailC, textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
              onMouseLeave={e => (e.currentTarget.style.color = emailC)}>
              <Mail size={13} /> hello@nethrox.com
            </a>
          </div>
          {Object.entries(FOOTER_LINKS).map(([col, links]) => (
            <div key={col}>
              <h5 style={{ fontSize: 12, fontWeight: 700, color: colHead, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>{col}</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map(link => (
                  <li key={link}>
                    <a href="#" style={{ fontSize: 13, color: linkC, textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#c9a961')}
                      onMouseLeave={e => (e.currentTarget.style.color = linkC)}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${border}`, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Left: copyright + social icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ fontSize: 12, color: bottom }}>© {new Date().getFullYear()} Nethrox. All rights reserved.</span>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { href: 'https://facebook.com', title: 'Facebook', icon: (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                )},
                { href: 'https://instagram.com', title: 'Instagram', icon: (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                )},
                { href: 'https://linkedin.com', title: 'LinkedIn', icon: (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                  </svg>
                )},
                { href: 'https://twitter.com', title: 'X / Twitter', icon: (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                )},
                { href: 'https://github.com', title: 'GitHub', icon: (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                  </svg>
                )},
                { href: 'https://youtube.com', title: 'YouTube', icon: (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                  </svg>
                )},
              ].map(({ href, title, icon }) => (
                <a key={title} href={href} target="_blank" rel="noopener noreferrer" title={title}
                  style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(15,29,66,0.06)', border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(15,29,66,0.1)', color: bottom, textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,169,97,0.15)'; e.currentTarget.style.borderColor = 'rgba(201,169,97,0.4)'; e.currentTarget.style.color = '#c9a961'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(15,29,66,0.06)'; e.currentTarget.style.borderColor = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(15,29,66,0.1)'; e.currentTarget.style.color = bottom; }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
          <span style={{ fontSize: 12, color: bottom }}>Intelligence that protects.</span>
        </div>
      </div>
    </footer>
  );
}

/* ── Main LandingPage ───────────────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const handleLaunchApp = () => navigate('/app');
  const toggleTheme = () => setDarkMode(d => !d);

  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: darkMode ? '#060d1a' : '#ffffff', transition: 'background 0.3s' }}>
      <Navigation onLaunchApp={handleLaunchApp} darkMode={darkMode} toggleTheme={toggleTheme} />
      <Hero onLaunchApp={handleLaunchApp} darkMode={darkMode} />
      <WhyNethrox darkMode={darkMode} />
      <EnterpriseFocus darkMode={darkMode} />
      <GetInTouch darkMode={darkMode} />
      <Footer darkMode={darkMode} />

      {/* Scroll-to-top FAB */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Back to top"
        style={{
          position: 'fixed', bottom: 32, right: 32, zIndex: 2000,
          width: 44, height: 44,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg, #c9a961 0%, #e8c96a 100%)',
          color: '#0a111e',
          border: 'none', borderRadius: 12, cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(201,169,97,0.5)',
          opacity: showTop ? 1 : 0,
          transform: showTop ? 'translateY(0)' : 'translateY(16px)',
          pointerEvents: showTop ? 'auto' : 'none',
          transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(201,169,97,0.7)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,169,97,0.5)'; e.currentTarget.style.transform = showTop ? 'translateY(0)' : 'translateY(16px)'; }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3,10 8,5 13,10" />
        </svg>
      </button>
    </div>
  );
}
