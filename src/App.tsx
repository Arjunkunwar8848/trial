import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ConditionsSection from './components/ConditionsSection';
import AnalysisSection from './components/AnalysisSection';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const handleStartAnalysis = () => {
    setActiveSection('analysis');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HeroSection onStartAnalysis={handleStartAnalysis} />;
      case 'conditions':
        return <ConditionsSection />;
      case 'analysis':
        return <AnalysisSection />;
      default:
        return <HeroSection onStartAnalysis={handleStartAnalysis} />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-white">
        <Header activeSection={activeSection} setActiveSection={setActiveSection} />
        <main>
          {renderSection()}
        </main>
      </div>
    </AppProvider>
  );
}

export default App;