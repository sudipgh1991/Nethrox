import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowLeft, Play, Plus, X, CheckSquare, Square, Settings, Sparkles } from 'lucide-react';
import styles from './ConfigureRules.module.css';

export default function ConfigureRules() {
  const navigate = useNavigate();
  const {
    selectedCategories,
    selectedRules,
    setSelectedRules,
    RULES_BY_CATEGORY,
    ANALYTICS_OPTIONS,
    customRules,
    setCustomRules,
  } = useAppContext();

  const [showModal, setShowModal] = useState(false);
  const [newRule, setNewRule] = useState({ name: '', description: '', condition: '', threshold: '' });

  const allRules = selectedCategories.flatMap((cat) => {
    const catLabel = ANALYTICS_OPTIONS.find((o) => o.id === cat)?.label || cat;
    return (RULES_BY_CATEGORY[cat] || []).map((r) => ({ ...r, category: catLabel }));
  });

  const toggleRule = (ruleId) => {
    setSelectedRules((prev) =>
      prev.includes(ruleId) ? prev.filter((r) => r !== ruleId) : [...prev, ruleId]
    );
  };

  const addCustomRule = () => {
    if (!newRule.name.trim()) return;
    const rule = {
      id: `custom-${Date.now()}`,
      name: newRule.name,
      description: newRule.description,
      condition: newRule.condition,
      threshold: newRule.threshold,
      category: 'Custom',
    };
    setCustomRules((prev) => [...prev, rule]);
    setSelectedRules((prev) => [...prev, rule.id]);
    setNewRule({ name: '', description: '', condition: '', threshold: '' });
    setShowModal(false);
  };

  const removeCustomRule = (id) => {
    setCustomRules((prev) => prev.filter((r) => r.id !== id));
    setSelectedRules((prev) => prev.filter((r) => r !== id));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Configure Rules</h1>
          <p>Review the rules that will be executed and create custom rules</p>
        </div>
        <div className={styles.headerActions}>
          <span className={styles.count}>
            {selectedRules.length} rule{selectedRules.length !== 1 ? 's' : ''} selected
          </span>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.rulesSection}>
          <div className={styles.sectionHeader}>
            <Settings size={18} />
            <h3>Standard Rules</h3>
          </div>
          <div className={styles.ruleCards}>
            {allRules.map((rule) => (
              <div
                key={rule.id}
                className={`${styles.ruleCard} ${selectedRules.includes(rule.id) ? styles.ruleCardActive : ''}`}
                onClick={() => toggleRule(rule.id)}
              >
                <div className={styles.ruleTop}>
                  <div className={styles.ruleCheck}>
                    {selectedRules.includes(rule.id) ? (
                      <CheckSquare size={18} className={styles.checked} />
                    ) : (
                      <Square size={18} />
                    )}
                  </div>
                  <span className={styles.catBadge}>{rule.category}</span>
                </div>
                <h4 className={styles.ruleName}>{rule.name}</h4>
                <p className={styles.ruleDesc}>{rule.description}</p>
              </div>
            ))}
          </div>
        </div>

        {customRules.length > 0 && (
          <div className={styles.rulesSection}>
            <div className={styles.sectionHeader}>
              <Sparkles size={18} />
              <h3>Custom Rules</h3>
            </div>
            <div className={styles.ruleCards}>
              {customRules.map((rule) => (
                <div
                  key={rule.id}
                  className={`${styles.ruleCard} ${styles.ruleCardActive} ${styles.customCard}`}
                >
                  <div className={styles.ruleTop}>
                    <CheckSquare size={18} className={styles.checked} />
                    <span className={styles.catBadge}>Custom</span>
                    <button className={styles.removeBtn} onClick={() => removeCustomRule(rule.id)}>
                      <X size={14} />
                    </button>
                  </div>
                  <h4 className={styles.ruleName}>{rule.name}</h4>
                  <p className={styles.ruleDesc}>{rule.description}</p>
                  {rule.condition && (
                    <div className={styles.conditionTag}>Condition: {rule.condition}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <button className={styles.backBtn} onClick={() => navigate('/data-mapping')}>
          <ArrowLeft size={18} />
          Back
        </button>
        <div className={styles.footerRight}>
          <button className={styles.customBtn} onClick={() => setShowModal(true)}>
            <Plus size={18} />
            Create Custom Rule
          </button>
          <button
            className={styles.startBtn}
            disabled={selectedRules.length === 0}
            onClick={() => navigate('/dashboard')}
          >
            <Play size={18} />
            Start Analytics
          </button>
        </div>
      </div>

      {/* Custom Rule Modal */}
      {showModal && (
        <div className={styles.overlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Create Custom Rule</h3>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.field}>
                <label>Rule Name</label>
                <input
                  className={styles.input}
                  placeholder="e.g., High-Value Transaction Alert"
                  value={newRule.name}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                />
              </div>
              <div className={styles.field}>
                <label>Description</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Describe what this rule checks..."
                  value={newRule.description}
                  onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className={styles.field}>
                <label>Condition / Logic</label>
                <input
                  className={styles.input}
                  placeholder="e.g., amount > 10000 AND country IN ('high_risk_list')"
                  value={newRule.condition}
                  onChange={(e) => setNewRule({ ...newRule, condition: e.target.value })}
                />
              </div>
              <div className={styles.field}>
                <label>Threshold (optional)</label>
                <input
                  className={styles.input}
                  placeholder="e.g., 10000"
                  value={newRule.threshold}
                  onChange={(e) => setNewRule({ ...newRule, threshold: e.target.value })}
                />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
              <button className={styles.addBtn} onClick={addCustomRule} disabled={!newRule.name.trim()}>
                <Plus size={16} />
                Add Rule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
