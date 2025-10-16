import React from 'react';
import { useAppContext } from '../context/AppContext';
import ModalityInputs from './ModalityInputs';
import AnalysisProgress from './AnalysisProgress';
import ResultsDisplay from './ResultsDisplay';

const AnalysisSection: React.FC = () => {
  const { currentStep, isAnalyzing, predictions } = useAppContext();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <ModalityInputs />;
       case 1:
        return <AnalysisProgress />;
      case 2:
        return <ResultsDisplay />;
      default:
        return <ModalityInputs />;
    }
  };

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Multimodal Analysis</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your medical data across three modalities for comprehensive neurological assessment.
          </p>
        </div>

        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default AnalysisSection;