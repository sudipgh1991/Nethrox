import { useMemo, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  AlertTriangle, ShieldCheck, TrendingUp, FileWarning, Activity,
  ArrowLeft, Download, RefreshCw, CheckCircle2,
} from 'lucide-react';
import styles from './Dashboard.module.css';

const COLORS = ['#6C63FF', '#00D9A6', '#FF6584', '#F59E0B', '#3B82F6', '#8B5CF6', '#EC4899', '#14B8A6'];

export default function Dashboard() {
  const navigate = useNavigate();
  const { selectedCategories, selectedRules, RULES_BY_CATEGORY, ANALYTICS_OPTIONS, customRules } = useAppContext();
  const { theme } = useTheme();
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const isDark = theme === 'dark';
  const gridColor = isDark ? '#2A2F45' : '#E0E2EB';
  const tickColor = isDark ? '#8B8FA3' : '#5A5E73';
  const tooltipBg = isDark ? '#131724' : '#FFFFFF';
  const tooltipBorder = isDark ? '#2A2F45' : '#E0E2EB';
  const tooltipLabel = isDark ? '#EAEAF0' : '#1A1D2E';

  // Simulate running analytics
  const runAnalytics = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 2000);
  };

  // Generate mock data based on selected rules
  const ruleResults = useMemo(() => {
    if (!hasRun) return [];
    const allRules = [
      ...selectedCategories.flatMap((cat) =>
        (RULES_BY_CATEGORY[cat] || []).filter((r) => selectedRules.includes(r.id))
      ),
      ...customRules.filter((r) => selectedRules.includes(r.id)),
    ];
    return allRules.map((rule) => ({
      ...rule,
      flagged: Math.floor(Math.random() * 120) + 5,
      total: Math.floor(Math.random() * 5000) + 500,
      severity: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
    }));
  }, [hasRun, selectedCategories, selectedRules, RULES_BY_CATEGORY, customRules]);

  const totalFlagged = ruleResults.reduce((s, r) => s + r.flagged, 0);
  const totalRecords = ruleResults.reduce((s, r) => s + r.total, 0);
  const highSev = ruleResults.filter((r) => r.severity === 'High').length;
  const flagRate = totalRecords > 0 ? ((totalFlagged / totalRecords) * 100).toFixed(2) : 0;

  // Charts data
  const barData = ruleResults.slice(0, 8).map((r) => ({
    name: r.name.length > 20 ? r.name.slice(0, 20) + '…' : r.name,
    flagged: r.flagged,
  }));

  const pieData = useMemo(() => {
    const groups = {};
    ruleResults.forEach((r) => {
      const sev = r.severity;
      groups[sev] = (groups[sev] || 0) + r.flagged;
    });
    return Object.entries(groups).map(([name, value]) => ({ name, value }));
  }, [ruleResults]);

  const trendData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((m) => ({
      month: m,
      alerts: Math.floor(Math.random() * 80) + 10,
      resolved: Math.floor(Math.random() * 60) + 5,
    }));
  }, [hasRun]);

  const categoryBreakdown = useMemo(() => {
    return selectedCategories.map((cat) => {
      const label = ANALYTICS_OPTIONS.find((o) => o.id === cat)?.label || cat;
      const rules = ruleResults.filter((r) =>
        (RULES_BY_CATEGORY[cat] || []).some((cr) => cr.id === r.id)
      );
      return {
        name: label,
        value: rules.reduce((s, r) => s + r.flagged, 0),
      };
    });
  }, [ruleResults, selectedCategories, ANALYTICS_OPTIONS, RULES_BY_CATEGORY]);

  if (!hasRun) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1>Analytics Dashboard</h1>
            <p>{selectedRules.length} rules configured across {selectedCategories.length} categories</p>
          </div>
        </header>
        <div className={styles.runPrompt}>
          <Activity size={64} className={styles.runIcon} />
          <h2>Ready to Run Analytics</h2>
          <p>Click below to execute {selectedRules.length} selected rules against your data</p>
          <button className={styles.runBtn} onClick={runAnalytics} disabled={isRunning}>
            {isRunning ? (
              <>
                <RefreshCw size={20} className={styles.spinning} />
                Running Analytics...
              </>
            ) : (
              <>
                <Activity size={20} />
                Run Analytics Now
              </>
            )}
          </button>
          <button className={styles.backLink} onClick={() => navigate('/configure-rules')}>
            <ArrowLeft size={16} /> Back to Rules
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Analytics Dashboard</h1>
          <p>Results from {selectedRules.length} rules across {selectedCategories.length} categories</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.exportBtn}>
            <Download size={16} /> Export Report
          </button>
          <button className={styles.rerunBtn} onClick={() => { setHasRun(false); runAnalytics(); }}>
            <RefreshCw size={16} /> Re-run
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className={styles.kpis}>
        <div className={`${styles.kpiCard} ${styles.kpiPrimary}`}>
          <div className={styles.kpiIcon}><AlertTriangle size={24} /></div>
          <div className={styles.kpiContent}>
            <span className={styles.kpiValue}>{totalFlagged.toLocaleString()}</span>
            <span className={styles.kpiLabel}>Total Flagged Items</span>
          </div>
        </div>
        <div className={`${styles.kpiCard} ${styles.kpiSecondary}`}>
          <div className={styles.kpiIcon}><ShieldCheck size={24} /></div>
          <div className={styles.kpiContent}>
            <span className={styles.kpiValue}>{totalRecords.toLocaleString()}</span>
            <span className={styles.kpiLabel}>Total Records Analyzed</span>
          </div>
        </div>
        <div className={`${styles.kpiCard} ${styles.kpiDanger}`}>
          <div className={styles.kpiIcon}><FileWarning size={24} /></div>
          <div className={styles.kpiContent}>
            <span className={styles.kpiValue}>{highSev}</span>
            <span className={styles.kpiLabel}>High Severity Rules</span>
          </div>
        </div>
        <div className={`${styles.kpiCard} ${styles.kpiSuccess}`}>
          <div className={styles.kpiIcon}><TrendingUp size={24} /></div>
          <div className={styles.kpiContent}>
            <span className={styles.kpiValue}>{flagRate}%</span>
            <span className={styles.kpiLabel}>Flag Rate</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <h3>Flagged Items by Rule</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" tick={{ fill: tickColor, fontSize: 11 }} angle={-20} textAnchor="end" height={60} />
              <YAxis tick={{ fill: tickColor, fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: 8 }}
                labelStyle={{ color: tooltipLabel }}
              />
              <Bar dataKey="flagged" radius={[6, 6, 0, 0]}>
                {barData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h3>Severity Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={['#EF4444', '#F59E0B', '#22C55E'][i] || COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: 8 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.chartCard}>
          <h3>Monthly Alert Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" tick={{ fill: tickColor, fontSize: 12 }} />
              <YAxis tick={{ fill: tickColor, fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: 8 }}
                labelStyle={{ color: tooltipLabel }}
              />
              <Legend />
              <Area type="monotone" dataKey="alerts" stroke="#6C63FF" fill="rgba(108, 99, 255, 0.15)" strokeWidth={2} />
              <Area type="monotone" dataKey="resolved" stroke="#00D9A6" fill="rgba(0, 217, 166, 0.1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h3>Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={categoryBreakdown}
                cx="50%"
                cy="50%"
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {categoryBreakdown.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: 8 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Rule Results Table */}
      <div className={styles.tableSection}>
        <h3>Detailed Rule Results</h3>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Rule</th>
                <th>Flagged</th>
                <th>Total</th>
                <th>Flag %</th>
                <th>Severity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ruleResults.map((r) => (
                <tr key={r.id}>
                  <td className={styles.ruleName}>{r.name}</td>
                  <td className={styles.flagged}>{r.flagged}</td>
                  <td>{r.total.toLocaleString()}</td>
                  <td>{((r.flagged / r.total) * 100).toFixed(2)}%</td>
                  <td>
                    <span className={`${styles.sevBadge} ${styles[`sev${r.severity}`]}`}>
                      {r.severity}
                    </span>
                  </td>
                  <td>
                    <span className={styles.statusDone}>
                      <CheckCircle2 size={14} /> Complete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
