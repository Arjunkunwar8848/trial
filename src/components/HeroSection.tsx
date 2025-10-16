import React from 'react';
import { ArrowRight, Shield, Zap, Target } from 'lucide-react';

interface HeroSectionProps {
  onStartAnalysis: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartAnalysis }) => {
  const features = [
    {
      icon: Shield,
      title: 'Early Detection',
      description: 'Advanced AI for early identification of neurological disorders'
    },
    {
      icon: Zap,
      title: 'Multimodal Analysis',
      description: 'Integrates MRI, EEG, and clinical notes for comprehensive assessment'
    },
    {
      icon: Target,
      title: 'High Accuracy',
      description: 'Deep learning models trained on extensive medical datasets'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-teal-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Advanced
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              {' '}Neurological{' '}
            </span>
            Detection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Our multimodal deep learning system integrates MRI scans, EEG signals, and clinical notes 
            to detect neurological disorders including Alzheimer's, Epilepsy, Parkinson's, Stroke, 
            Brain Tumors, and Depression with unprecedented accuracy.
          </p>
          <button
            onClick={onStartAnalysis}
            className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2 shadow-lg"
          >
            <span>Start Analysis</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 animate-slide-up">
          {features.map(({ icon: Icon, title, description }, index) => (
            <div
              key={title}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="bg-gradient-to-r from-blue-100 to-teal-100 rounded-lg p-3 inline-block mb-4">
                <Icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;