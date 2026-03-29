import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Shield, BarChart3, Database, ArrowRight, Eye, EyeOff } from 'lucide-react';
import styles from './Home.module.css';

export default function Home() {
  const navigate = useNavigate();
  const { setUser } = useAppContext();
  const [mode, setMode] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ name: form.name || form.email.split('@')[0], email: form.email });
    navigate('/select-analytics');
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Shield size={32} />
          </div>
          <h1 className={styles.appName}>Nethrox</h1>
        </div>
        <p className={styles.tagline}>Intelligent Compliance Analytics Platform</p>
        <h2 className={styles.headline}>
          Uncover risks. <br />
          <span className={styles.gradient}>Ensure compliance.</span>
        </h2>
        <p className={styles.description}>
          Nethrox empowers organizations with advanced analytics for FCPA compliance,
          Anti-Money Laundering monitoring, and customizable data analysis. Upload your
          data, configure rules, and gain actionable insights through interactive dashboards.
        </p>

        <div className={styles.features}>
          <div className={styles.feature}>
            <BarChart3 size={20} className={styles.featureIcon} />
            <div>
              <h4>FCPA Analytics</h4>
              <p>Accounts Payable, Time & Expense, and Sales analytics</p>
            </div>
          </div>
          <div className={styles.feature}>
            <Database size={20} className={styles.featureIcon} />
            <div>
              <h4>AML Monitoring</h4>
              <p>Transaction monitoring and suspicious activity detection</p>
            </div>
          </div>
          <div className={styles.feature}>
            <BarChart3 size={20} className={styles.featureIcon} />
            <div>
              <h4>Custom Analytics</h4>
              <p>Flexible analytics for any dataset with customizable rules</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.formCard}>
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
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
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
        </div>
      </div>
    </div>
  );
}
