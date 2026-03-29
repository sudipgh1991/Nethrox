import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Upload, Globe, Database, ArrowRight, ArrowLeft, FileSpreadsheet, X, Plus } from 'lucide-react';
import styles from './ChooseData.module.css';

export default function ChooseData() {
  const navigate = useNavigate();
  const { setDataSource } = useAppContext();
  const [method, setMethod] = useState('upload');
  const [files, setFiles] = useState([]);
  const [url, setUrl] = useState('');
  const [dbConfig, setDbConfig] = useState({ host: '', port: '', database: '', username: '', password: '', table: '' });
  const fileRef = useRef();

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (method === 'upload') {
      setDataSource({ type: 'file', files: files.map((f) => f.name) });
    } else if (method === 'url') {
      setDataSource({ type: 'url', url });
    } else {
      setDataSource({ type: 'database', config: dbConfig });
    }
    navigate('/data-mapping');
  };

  const isValid =
    (method === 'upload' && files.length > 0) ||
    (method === 'url' && url.trim()) ||
    (method === 'database' && dbConfig.host && dbConfig.database);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Choose Data Source</h1>
        <p>Select how you want to provide your data for analysis</p>
      </header>

      <div className={styles.methods}>
        <button
          className={`${styles.methodCard} ${method === 'upload' ? styles.methodActive : ''}`}
          onClick={() => setMethod('upload')}
        >
          <Upload size={28} />
          <h4>Upload File(s)</h4>
          <p>CSV, Excel, or JSON files</p>
        </button>
        <button
          className={`${styles.methodCard} ${method === 'url' ? styles.methodActive : ''}`}
          onClick={() => setMethod('url')}
        >
          <Globe size={28} />
          <h4>URL / File Path</h4>
          <p>Remote URL or local path</p>
        </button>
        <button
          className={`${styles.methodCard} ${method === 'database' ? styles.methodActive : ''}`}
          onClick={() => setMethod('database')}
        >
          <Database size={28} />
          <h4>Database</h4>
          <p>Connect to a database</p>
        </button>
      </div>

      <div className={styles.panel}>
        {method === 'upload' && (
          <div className={styles.uploadArea}>
            <div
              className={styles.dropzone}
              onClick={() => fileRef.current?.click()}
            >
              <Upload size={40} className={styles.dropIcon} />
              <p className={styles.dropText}>Click to browse or drag files here</p>
              <p className={styles.dropHint}>Supports CSV, XLSX, XLS, JSON (max 100MB)</p>
              <input
                ref={fileRef}
                type="file"
                multiple
                accept=".csv,.xlsx,.xls,.json"
                onChange={handleFileChange}
                className={styles.fileInput}
              />
            </div>
            {files.length > 0 && (
              <div className={styles.fileList}>
                {files.map((file, i) => (
                  <div key={i} className={styles.fileItem}>
                    <FileSpreadsheet size={18} className={styles.fileIcon} />
                    <span className={styles.fileName}>{file.name}</span>
                    <span className={styles.fileSize}>{(file.size / 1024).toFixed(1)} KB</span>
                    <button className={styles.removeFile} onClick={() => removeFile(i)}>
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {method === 'url' && (
          <div className={styles.urlArea}>
            <label className={styles.label}>Data URL or File Path</label>
            <input
              type="text"
              className={styles.input}
              placeholder="https://example.com/data.csv or /path/to/file.csv"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <p className={styles.hint}>Enter a publicly accessible URL or a server file path</p>
          </div>
        )}

        {method === 'database' && (
          <div className={styles.dbArea}>
            <div className={styles.dbGrid}>
              <div className={styles.field}>
                <label className={styles.label}>Host</label>
                <input
                  className={styles.input}
                  placeholder="localhost"
                  value={dbConfig.host}
                  onChange={(e) => setDbConfig({ ...dbConfig, host: e.target.value })}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Port</label>
                <input
                  className={styles.input}
                  placeholder="5432"
                  value={dbConfig.port}
                  onChange={(e) => setDbConfig({ ...dbConfig, port: e.target.value })}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Database Name</label>
                <input
                  className={styles.input}
                  placeholder="my_database"
                  value={dbConfig.database}
                  onChange={(e) => setDbConfig({ ...dbConfig, database: e.target.value })}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Table / Schema</label>
                <input
                  className={styles.input}
                  placeholder="public.transactions"
                  value={dbConfig.table}
                  onChange={(e) => setDbConfig({ ...dbConfig, table: e.target.value })}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Username</label>
                <input
                  className={styles.input}
                  placeholder="db_user"
                  value={dbConfig.username}
                  onChange={(e) => setDbConfig({ ...dbConfig, username: e.target.value })}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Password</label>
                <input
                  className={styles.input}
                  type="password"
                  placeholder="••••••••"
                  value={dbConfig.password}
                  onChange={(e) => setDbConfig({ ...dbConfig, password: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <button className={styles.backBtn} onClick={() => navigate('/select-analytics')}>
          <ArrowLeft size={18} />
          Back
        </button>
        <button className={styles.nextBtn} disabled={!isValid} onClick={handleNext}>
          Next: Data Mapping
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
