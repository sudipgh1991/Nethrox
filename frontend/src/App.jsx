import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import SelectAnalytics from './pages/SelectAnalytics';
import ChooseData from './pages/ChooseData';
import DataMapping from './pages/DataMapping';
import ConfigureRules from './pages/ConfigureRules';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Routes>
          {/* Public landing page — no ThemeToggle */}
          <Route path="/" element={<LandingPage />} />
          {/* App routes — include ThemeToggle */}
          <Route path="/app" element={<><ThemeToggle /><Home /></>} />
          <Route path="/select-analytics" element={<><ThemeToggle /><SelectAnalytics /></>} />
          <Route path="/choose-data" element={<><ThemeToggle /><ChooseData /></>} />
          <Route path="/data-mapping" element={<><ThemeToggle /><DataMapping /></>} />
          <Route path="/configure-rules" element={<><ThemeToggle /><ConfigureRules /></>} />
          <Route path="/dashboard" element={<><ThemeToggle /><Dashboard /></>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App
