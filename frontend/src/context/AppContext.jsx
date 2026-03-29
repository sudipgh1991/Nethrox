import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

const ANALYTICS_OPTIONS = [
  {
    id: 'fcpa',
    label: 'FCPA Analytics',
    description: 'Foreign Corrupt Practices Act compliance analytics for AP, T&E, and Sales',
    subOptions: ['Accounts Payable', 'Time & Expense', 'Sales'],
  },
  {
    id: 'aml',
    label: 'Anti Money Laundering',
    description: 'AML transaction analytics and transaction monitoring',
    subOptions: [],
  },
  {
    id: 'custom',
    label: 'Miscellaneous Data Analytics',
    description: 'Customized analytics for miscellaneous datasets',
    subOptions: [],
  },
];

const RULES_BY_CATEGORY = {
  fcpa: [
    { id: 'fcpa-1', name: 'Duplicate Invoice Detection', description: 'Identify duplicate invoices by amount, vendor, and date' },
    { id: 'fcpa-2', name: 'Round Amount Payments', description: 'Flag payments with suspiciously round amounts' },
    { id: 'fcpa-3', name: 'Vendor in High-Risk Country', description: 'Payments to vendors in high-risk FCPA jurisdictions' },
    { id: 'fcpa-4', name: 'Ghost Vendor Detection', description: 'Vendors with no purchase orders or matching addresses' },
    { id: 'fcpa-5', name: 'Split Payment Analysis', description: 'Detect payments split to stay under approval thresholds' },
    { id: 'fcpa-6', name: 'Weekend/Holiday Payments', description: 'Transactions processed on non-business days' },
    { id: 'fcpa-7', name: 'Excessive T&E Claims', description: 'Expense claims exceeding policy thresholds' },
    { id: 'fcpa-8', name: 'Unusual Sales Commissions', description: 'Commission payments outside normal ranges' },
  ],
  aml: [
    { id: 'aml-1', name: 'Structuring Detection', description: 'Transactions structured to avoid reporting thresholds' },
    { id: 'aml-2', name: 'Rapid Movement of Funds', description: 'Funds received and transferred within short timeframes' },
    { id: 'aml-3', name: 'High-Risk Jurisdiction Transfers', description: 'Transactions involving high-risk AML countries' },
    { id: 'aml-4', name: 'Unusual Transaction Patterns', description: 'Deviations from customer baseline behavior' },
    { id: 'aml-5', name: 'Round Trip Transactions', description: 'Funds returning to originator through intermediaries' },
    { id: 'aml-6', name: 'Dormant Account Activity', description: 'Sudden activity in previously inactive accounts' },
    { id: 'aml-7', name: 'PEP Transaction Monitoring', description: 'Enhanced monitoring for politically exposed persons' },
  ],
  custom: [
    { id: 'cust-1', name: 'Outlier Detection', description: 'Statistical outlier analysis on numeric fields' },
    { id: 'cust-2', name: 'Benford\'s Law Analysis', description: 'First-digit distribution analysis for fraud detection' },
    { id: 'cust-3', name: 'Duplicate Record Detection', description: 'Fuzzy matching to find near-duplicate records' },
    { id: 'cust-4', name: 'Gap Analysis', description: 'Detect gaps in sequential data fields' },
    { id: 'cust-5', name: 'Trend Analysis', description: 'Time-series trend detection and anomalies' },
  ],
};

const STANDARD_COLUMNS = {
  fcpa: [
    'Transaction ID', 'Transaction Date', 'Vendor Name', 'Vendor ID', 'Vendor Country',
    'Invoice Number', 'Invoice Amount', 'Currency', 'Payment Method', 'Approver',
    'Department', 'GL Account', 'Description', 'PO Number',
  ],
  aml: [
    'Transaction ID', 'Transaction Date', 'Transaction Amount', 'Currency',
    'Originator Name', 'Originator Account', 'Originator Country',
    'Beneficiary Name', 'Beneficiary Account', 'Beneficiary Country',
    'Transaction Type', 'Channel', 'Reference Number',
  ],
  custom: [
    'Record ID', 'Date', 'Amount', 'Category', 'Description', 'Entity', 'Status',
  ],
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]);
  const [dataSource, setDataSource] = useState(null);
  const [columnMappings, setColumnMappings] = useState({});
  const [customRules, setCustomRules] = useState([]);

  const value = {
    user, setUser,
    selectedCategories, setSelectedCategories,
    selectedRules, setSelectedRules,
    dataSource, setDataSource,
    columnMappings, setColumnMappings,
    customRules, setCustomRules,
    ANALYTICS_OPTIONS,
    RULES_BY_CATEGORY,
    STANDARD_COLUMNS,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
