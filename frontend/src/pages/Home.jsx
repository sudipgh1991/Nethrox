import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Shield, BarChart3, Database, ArrowRight, Eye, EyeOff, TrendingUp, ShieldCheck, Sliders } from 'lucide-react';
import styles from './Home.module.css';

const STATS = [
  { value: '10M+', label: 'Transactions Analyzed' },
  { value: '99.9%', label: 'Detection Accuracy' },
  { value: '500+', label: 'Compliance Rules' },
];

const FEATURES = [
  {
    icon: <BarChart3 size={20} />,
    title: 'FCPA Analytics',
    desc: 'Accounts Payable, Time & Expense, and Sales analytics',
  },
  {
    icon: <ShieldCheck size={20} />,
    title: 'AML Monitoring',
    desc: 'Transaction monitoring and suspicious activity detection',
  },
  {
    icon: <Sliders size={20} />,
    title: 'Custom Analytics',
    desc: 'Flexible analytics for any dataset with customizable rules',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { setUser } = useAppContext();
  const [mode, setMode] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [logoError, setLogoError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ name: form.name || form.email.split('@')[0], email: form.email });
    navigate('/select-analytics');
  };

  return (
    <div className={styles.container}>
      {/* Decorative blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className={styles.left}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            {logoError ? (
              <Shield size={64} />
            ) : (
              <img
                src="/logo.jpg"
                alt="Nethrox"
                className={styles.logoImg}
                onError={() => setLogoError(true)}
              />
            )}
          </div>
          <h1 className={styles.appName}>Nethrox</h1>
        </div>

        <p className={styles.tagline}>Intelligent Compliance Analytics Platform</p>

        <h2 className={styles.headline}>
          Uncover risks.<br />
          <span className={styles.gradient}>Ensure compliance.</span>
        </h2>

        <p className={styles.description}>
          Nethrox empowers organizations with advanced analytics for FCPA compliance,
          AML monitoring, and customizable data analysis — turning complex data into
          actionable insights.
        </p>

        <div className={styles.stats}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.features}>
          {FEATURES.map((f) => (
            <div key={f.title} className={styles.feature}>
              <div className={styles.featureIconWrap}>{f.icon}</div>
              <div>
                <h4>{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h3 className={styles.formTitle}>
              {mode === 'signin' ? 'Welcome back' : 'Get started'}
            </h3>
            <p className={styles.formSubtitle}>
              {mode === 'signin'
                ? 'Sign in to your Nethrox account'
                : 'Create your Nethrox account'}
            </p>
          </div>

          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${mode === 'signin' ? styles.tabActive : ''}`}
              onClick={() => setMode('signin')}
            >
              Sign In
            </button>
            <button
              className={`${styles.tab} ${mode === 'create' ? styles.tabActive : ''}`}
              onClick={() => setMode('create')}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {mode === 'create' && (
              <div className={styles.field}>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
            )}
            <div className={styles.field}>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label>Password</label>
              <div className={styles.passwordWrap}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn}>
              <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <p className={styles.footerText}>
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              className={styles.switchBtn}
              onClick={() => setMode(mode === 'signin' ? 'create' : 'signin')}
            >
              {mode === 'signin' ? 'Create one' : 'Sign in'}
            </button>
          </p>

          <div className={styles.trustRow}>
            <ShieldCheck size={14} />
            <span>SOC 2 compliant · End-to-end encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
