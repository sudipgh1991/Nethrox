import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ArrowRight, ArrowLeft, ArrowDown, Check, AlertTriangle } from 'lucide-react';
import styles from './DataMapping.module.css';

export default function DataMapping() {
  const navigate = useNavigate();
  const { selectedCategories, STANDARD_COLUMNS, columnMappings, setColumnMappings } = useAppContext();

  // Simulate detected columns from uploaded data
  const detectedColumns = useMemo(() => [
    'trans_id', 'txn_date', 'vendor_name', 'vendor_id', 'country',
    'inv_number', 'amount', 'curr', 'pay_method', 'approved_by',
    'dept', 'gl_acct', 'desc', 'po_num', 'orig_name', 'orig_acct',
    'benef_name', 'benef_acct', 'txn_type', 'channel', 'ref_no',
    'category', 'status', 'entity', 'record_id',
  ], []);

  // Build required standard columns from selected categories
  const standardCols = useMemo(() => {
    const cols = [];
    selectedCategories.forEach((cat) => {
      (STANDARD_COLUMNS[cat] || []).forEach((col) => {
        if (!cols.includes(col)) cols.push(col);
      });
    });
    return cols;
  }, [selectedCategories, STANDARD_COLUMNS]);

  // Initialize mappings with best-guess auto-mapping
  const [mappings, setMappings] = useState(() => {
    const initial = {};
    const autoMap = {
      'Transaction ID': 'trans_id',
      'Transaction Date': 'txn_date',
      'Vendor Name': 'vendor_name',
      'Vendor ID': 'vendor_id',
      'Vendor Country': 'country',
      'Invoice Number': 'inv_number',
      'Invoice Amount': 'amount',
      'Transaction Amount': 'amount',
      'Currency': 'curr',
      'Payment Method': 'pay_method',
      'Approver': 'approved_by',
      'Department': 'dept',
      'GL Account': 'gl_acct',
      'Description': 'desc',
      'PO Number': 'po_num',
      'Originator Name': 'orig_name',
      'Originator Account': 'orig_acct',
      'Originator Country': 'country',
      'Beneficiary Name': 'benef_name',
      'Beneficiary Account': 'benef_acct',
      'Beneficiary Country': 'country',
      'Transaction Type': 'txn_type',
      'Channel': 'channel',
      'Reference Number': 'ref_no',
      'Record ID': 'record_id',
      'Date': 'txn_date',
      'Amount': 'amount',
      'Category': 'category',
      'Entity': 'entity',
      'Status': 'status',
    };
    standardCols.forEach((col) => {
      initial[col] = autoMap[col] || '';
    });
    return initial;
  });

  const handleMappingChange = (stdCol, detectedCol) => {
    setMappings((prev) => ({ ...prev, [stdCol]: detectedCol }));
  };

  const unmappedCount = Object.values(mappings).filter((v) => !v).length;

  const handleNext = () => {
    setColumnMappings(mappings);
    navigate('/configure-rules');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Data Mapping</h1>
          <p>Verify and update the field-level mappings between your data and the standard schema</p>
        </div>
        {unmappedCount > 0 && (
          <div className={styles.warningBadge}>
            <AlertTriangle size={16} />
            {unmappedCount} unmapped field{unmappedCount > 1 ? 's' : ''}
          </div>
        )}
      </header>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thStatus}></th>
              <th>Standard Field</th>
              <th className={styles.thArrow}></th>
              <th>Mapped Source Column</th>
            </tr>
          </thead>
          <tbody>
            {standardCols.map((col) => (
              <tr key={col} className={mappings[col] ? styles.rowMapped : styles.rowUnmapped}>
                <td className={styles.statusCell}>
                  {mappings[col] ? (
                    <Check size={16} className={styles.checkIcon} />
                  ) : (
                    <AlertTriangle size={16} className={styles.warnIcon} />
                  )}
                </td>
                <td className={styles.stdCol}>{col}</td>
                <td className={styles.arrowCell}>
                  <ArrowDown size={16} className={styles.arrowIcon} />
                </td>
                <td>
                  <select
                    className={styles.select}
                    value={mappings[col] || ''}
                    onChange={(e) => handleMappingChange(col, e.target.value)}
                  >
                    <option value="">-- Select Column --</option>
                    {detectedColumns.map((dc) => (
                      <option key={dc} value={dc}>{dc}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.footer}>
        <button className={styles.backBtn} onClick={() => navigate('/choose-data')}>
          <ArrowLeft size={18} />
          Back
        </button>
        <button className={styles.nextBtn} onClick={handleNext}>
          Next: Configure Rules
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
