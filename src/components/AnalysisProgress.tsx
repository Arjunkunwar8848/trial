import React, { useEffect, useState } from 'react';
import { Brain, Activity, FileText, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { submitAnalysis } from '../services/apiService';

const AnalysisProgress: React.FC = () => {
  const { analysisData, setCurrentStep, setPredictions } = useAppContext();
  const [currentStage, setCurrentStage] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const stages = [
    {
      id: 'preprocessing',
      title: 'Preprocessing Data',
      description: 'Normalizing and preparing multimodal inputs',
      icon: Brain,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'mri-analysis',
      title: 'MRI Analysis',
      description: 'CNN processing of structural brain images',
      icon: Brain,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'eeg-analysis',
      title: 'EEG Analysis',
      description: 'CNN+LSTM processing of neural signals',
      icon: Activity,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'clinical-analysis',
      title: 'Clinical Notes Analysis',
      description: 'Transformer processing of clinical text',
      icon: FileText,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'fusion',
      title: 'Multimodal Fusion',
      description: 'Integrating results from all modalities',
      icon: Zap,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  useEffect(() => {
    let isMounted = true;
    let timer: NodeJS.Timeout;

    const runAnalysis = async () => {
      timer = setInterval(() => {
        setCurrentStage(prev => {
          if (prev < stages.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 2000);

      try {
        const results = await submitAnalysis(analysisData);

        if (isMounted) {
          clearInterval(timer);
          setCurrentStage(stages.length - 1);

          setTimeout(() => {
            if (isMounted) {
              setPredictions(results);
              setCurrentStep(2);
            }
          }, 1500);
        }
      } catch (err) {
        if (isMounted) {
          clearInterval(timer);
          setError(err instanceof Error ? err.message : 'Analysis failed');
          console.error('Analysis error:', err);
        }
      }
    };

    runAnalysis();

    return () => {
      isMounted = false;
      if (timer) clearInterval(timer);
    };
  }, [analysisData, setCurrentStep, setPredictions]);

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-red-900 mb-4">Analysis Error</h3>
          <p className="text-red-700 mb-6">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setCurrentStep(0);
            }}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Your Data</h3>
        <p className="text-gray-600">
          Our AI models are processing your multimodal data through our advanced pipeline
        </p>
      </div>

      <div className="space-y-6">
        {stages.map((stage, index) => {
          const isActive = index === currentStage;
          const isCompleted = index < currentStage;
          
          return (
            <div
              key={stage.id}
              className={`relative flex items-center p-6 rounded-xl transition-all duration-500 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-50 to-teal-50 border-2 border-blue-200 transform scale-105'
                  : isCompleted
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? `bg-gradient-to-r ${stage.color} shadow-lg animate-pulse`
                  : isCompleted
                  ? 'bg-green-500'
                  : 'bg-gray-300'
              }`}>
                <stage.icon className="h-8 w-8 text-white" />
              </div>

              <div className="ml-6 flex-grow">
                <h4 className={`text-lg font-semibold transition-colors ${
                  isActive ? 'text-blue-900' : isCompleted ? 'text-green-900' : 'text-gray-600'
                }`}>
                  {stage.title}
                </h4>
                <p className={`transition-colors ${
                  isActive ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-500'
                }`}>
                  {stage.description}
                </p>
              </div>

              {isActive && (
                <div className="ml-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}

              {isCompleted && (
                <div className="ml-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-blue-900">Analysis Progress</h4>
            <p className="text-blue-700">Processing stage {currentStage + 1} of {stages.length}</p>
          </div>
          <div className="w-32 bg-blue-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-teal-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisProgress;