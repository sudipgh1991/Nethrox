import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { CheckSquare, Square, ChevronRight, ArrowRight, Info } from 'lucide-react';
import styles from './SelectAnalytics.module.css';

export default function SelectAnalytics() {
  const navigate = useNavigate();
  const {
    ANALYTICS_OPTIONS,
    RULES_BY_CATEGORY,
    selectedCategories,
    setSelectedCategories,
    selectedRules,
    setSelectedRules,
  } = useAppContext();

  const toggleCategory = (id) => {
    setSelectedCategories((prev) => {
      const next = prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id];
      // auto-select all rules for newly added categories
      if (!prev.includes(id)) {
        const newRules = (RULES_BY_CATEGORY[id] || []).map((r) => r.id);
        setSelectedRules((sr) => [...new Set([...sr, ...newRules])]);
      } else {
        const removedRules = (RULES_BY_CATEGORY[id] || []).map((r) => r.id);
        setSelectedRules((sr) => sr.filter((r) => !removedRules.includes(r)));
      }
      return next;
    });
  };

  const toggleRule = (ruleId) => {
    setSelectedRules((prev) =>
      prev.includes(ruleId) ? prev.filter((r) => r !== ruleId) : [...prev, ruleId]
    );
  };

  const allRules = selectedCategories.flatMap((cat) => RULES_BY_CATEGORY[cat] || []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Select Analytics</h1>
        <p>Choose the compliance categories you want to analyze</p>
      </header>

      <div className={styles.content}>
        <div className={styles.left}>
          <h3 className={styles.sectionTitle}>Analytics Categories</h3>
          <div className={styles.categories}>
            {ANALYTICS_OPTIONS.map((opt) => (
              <div
                key={opt.id}
                className={`${styles.categoryCard} ${selectedCategories.includes(opt.id) ? styles.categoryActive : ''}`}
                onClick={() => toggleCategory(opt.id)}
              >
                <div className={styles.checkIcon}>
                  {selectedCategories.includes(opt.id) ? (
                    <CheckSquare size={22} className={styles.checked} />
                  ) : (
                    <Square size={22} />
                  )}
                </div>
                <div className={styles.categoryInfo}>
                  <h4>{opt.label}</h4>
                  <p>{opt.description}</p>
                  {opt.subOptions.length > 0 && (
                    <div className={styles.subTags}>
                      {opt.subOptions.map((s) => (
                        <span key={s} className={styles.subTag}>{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.right}>
          <h3 className={styles.sectionTitle}>
            Predefined Rules
            {allRules.length > 0 && (
              <span className={styles.badge}>{selectedRules.length}/{allRules.length}</span>
            )}
          </h3>

          {allRules.length === 0 ? (
            <div className={styles.empty}>
              <Info size={40} className={styles.emptyIcon} />
              <p>Select one or more categories to see available rules</p>
            </div>
          ) : (
            <div className={styles.rulesList}>
              {selectedCategories.map((cat) => {
                const rules = RULES_BY_CATEGORY[cat] || [];
                const catLabel = ANALYTICS_OPTIONS.find((o) => o.id === cat)?.label;
                return (
                  <div key={cat} className={styles.ruleGroup}>
                    <h5 className={styles.ruleGroupTitle}>{catLabel}</h5>
                    {rules.map((rule) => (
                      <div
                        key={rule.id}
                        className={`${styles.ruleItem} ${selectedRules.includes(rule.id) ? styles.ruleActive : ''}`}
                        onClick={() => toggleRule(rule.id)}
                      >
                        <div className={styles.ruleCheck}>
                          {selectedRules.includes(rule.id) ? (
                            <CheckSquare size={16} className={styles.checked} />
                          ) : (
                            <Square size={16} />
                          )}
                        </div>
                        <div>
                          <span className={styles.ruleName}>{rule.name}</span>
                          <span className={styles.ruleDesc}>{rule.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <button
          className={styles.nextBtn}
          disabled={selectedCategories.length === 0}
          onClick={() => navigate('/choose-data')}
        >
          Next: Choose Data Source
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
