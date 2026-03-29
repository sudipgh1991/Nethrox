import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import SelectAnalytics from './pages/SelectAnalytics';
import ChooseData from './pages/ChooseData';
import DataMapping from './pages/DataMapping';
import ConfigureRules from './pages/ConfigureRules';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select-analytics" element={<SelectAnalytics />} />
        <Route path="/choose-data" element={<ChooseData />} />
        <Route path="/data-mapping" element={<DataMapping />} />
        <Route path="/configure-rules" element={<ConfigureRules />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  );
}

export default App
