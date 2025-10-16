import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, TrendingUp } from 'lucide-react';
import { NeurologicalCondition } from '../types';

const ConditionsSection: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  
  // Global one 
  // const conditions: NeurologicalCondition[] = [
  //   {
  //     id: 'alzheimers',
  //     name: "Alzheimer's Disease",
  //     description: 'A progressive neurodegenerative disorder that affects memory, thinking, and behavior.',
  //     symptoms: ['Memory loss', 'Confusion', 'Difficulty with language', 'Changes in mood and behavior'],
  //     prevalence: '6.7 million Americans',
  //     earlyDetectionBenefits: ['Slower progression with treatment', 'Better quality of life', 'Family planning opportunities'],
  //     color: 'from-purple-500 to-pink-500'
  //   },
  //   {
  //     id: 'epilepsy',
  //     name: 'Epilepsy',
  //     description: 'A neurological disorder characterized by recurrent seizures due to abnormal brain activity.',
  //     symptoms: ['Seizures', 'Temporary confusion', 'Loss of consciousness', 'Psychic symptoms'],
  //     prevalence: '3.4 million Americans',
  //     earlyDetectionBenefits: ['Effective seizure control', 'Reduced injury risk', 'Improved social function'],
  //     color: 'from-yellow-500 to-orange-500'
  //   },
  //   {
  //     id: 'parkinsons',
  //     name: "Parkinson's Disease",
  //     description: 'A progressive disorder affecting movement, often including tremors and stiffness.',
  //     symptoms: ['Tremor', 'Bradykinesia', 'Muscle rigidity', 'Postural instability'],
  //     prevalence: '1 million Americans',
  //     earlyDetectionBenefits: ['Symptom management', 'Lifestyle modifications', 'Treatment planning'],
  //     color: 'from-green-500 to-teal-500'
  //   },
  //   {
  //     id: 'stroke',
  //     name: 'Stroke',
  //     description: 'Occurs when blood supply to part of the brain is interrupted or reduced.',
  //     symptoms: ['Sudden numbness', 'Confusion', 'Trouble speaking', 'Severe headache'],
  //     prevalence: '795,000 annually',
  //     earlyDetectionBenefits: ['Immediate treatment', 'Reduced brain damage', 'Better recovery outcomes'],
  //     color: 'from-red-500 to-pink-500'
  //   },
  //   {
  //     id: 'brain-tumor',
  //     name: 'Brain Tumor',
  //     description: 'Abnormal growth of cells within the brain or central spinal canal.',
  //     symptoms: ['Headaches', 'Nausea', 'Vision problems', 'Cognitive changes'],
  //     prevalence: '700,000 Americans',
  //     earlyDetectionBenefits: ['Surgical options', 'Treatment effectiveness', 'Survival rates improvement'],
  //     color: 'from-indigo-500 to-blue-500'
  //   },
  //   {
  //     id: 'depression',
  //     name: 'Depression',
  //     description: 'A mental health disorder characterized by persistent sadness and loss of interest.',
  //     symptoms: ['Persistent sadness', 'Loss of interest', 'Fatigue', 'Concentration problems'],
  //     prevalence: '21 million adults',
  //     earlyDetectionBenefits: ['Effective treatments', 'Prevent worsening', 'Improved functioning'],
  //     color: 'from-teal-500 to-cyan-500'
  //   }

  // Nepal context 
  const conditions: NeurologicalCondition[] = [
    {
      id: 'alzheimers',
      name: "Alzheimer's Disease",
      description: 'A progressive neurodegenerative disorder that affects memory, thinking, and behavior.',
      symptoms: ['Memory loss', 'Confusion', 'Difficulty with language', 'Changes in mood and behavior'],
      prevalence: '135,000+ Nepalis', // Based on dementia studies showing over 135,000 people living with dementia in Nepal
      earlyDetectionBenefits: ['Slower progression with treatment', 'Better quality of life', 'Family planning opportunities'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'epilepsy',
      name: 'Epilepsy',
      description: 'A neurological disorder characterized by recurrent seizures due to abnormal brain activity.',
      symptoms: ['Seizures', 'Temporary confusion', 'Loss of consciousness', 'Psychic symptoms'],
      prevalence: '150,000-210,000 Nepalis', // Estimated 5-7 per 1000 population based on South Asian studies
      earlyDetectionBenefits: ['Effective seizure control', 'Reduced injury risk', 'Improved social function'],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'parkinsons',
      name: "Parkinson's Disease",
      description: 'A progressive disorder affecting movement, often including tremors and stiffness.',
      symptoms: ['Tremor', 'Bradykinesia', 'Muscle rigidity', 'Postural instability'],
      prevalence: '15,000-30,000 Nepalis', // Estimated 0.5-1 per 1000 population based on regional data
      earlyDetectionBenefits: ['Symptom management', 'Lifestyle modifications', 'Treatment planning'],
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'stroke',
      name: 'Stroke',
      description: 'Occurs when blood supply to part of the brain is interrupted or reduced.',
      symptoms: ['Sudden numbness', 'Confusion', 'Trouble speaking', 'Severe headache'],
      prevalence: '90,000-120,000 annually', // High stroke prevalence noted in regional studies
      earlyDetectionBenefits: ['Immediate treatment', 'Reduced brain damage', 'Better recovery outcomes'],
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'brain-tumor',
      name: 'Brain Tumor',
      description: 'Abnormal growth of cells within the brain or central spinal canal.',
      symptoms: ['Headaches', 'Nausea', 'Vision problems', 'Cognitive changes'],
      prevalence: '6,000-9,000 Nepalis', // Estimated based on global rates adjusted for population
      earlyDetectionBenefits: ['Surgical options', 'Treatment effectiveness', 'Survival rates improvement'],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'depression',
      name: 'Depression',
      description: 'A mental health disorder characterized by persistent sadness and loss of interest.',
      symptoms: ['Persistent sadness', 'Loss of interest', 'Fatigue', 'Concentration problems'],
      prevalence: '3.6 million adults', // Estimated 12-15% of adult population based on mental health studies
      earlyDetectionBenefits: ['Effective treatments', 'Prevent worsening', 'Improved functioning'],
      color: 'from-teal-500 to-cyan-500'
    }
];

  const toggleExpanded = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Neurological Conditions We Detect</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI system is trained to identify six major neurological disorders, each requiring specialized attention and early intervention.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {conditions.map((condition, index) => (
            <div
              key={condition.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`bg-gradient-to-r ${condition.color} p-6 text-white`}>
                <h3 className="text-xl font-semibold mb-2">{condition.name}</h3>
                <div className="flex items-center space-x-2 text-white/90">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">{condition.prevalence}</span>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-4">{condition.description}</p>

                <button
                  onClick={() => toggleExpanded(condition.id)}
                  className="w-full flex items-center justify-between text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  <span>Learn More</span>
                  {expandedCard === condition.id ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>

                {expandedCard === condition.id && (
                  <div className="mt-4 space-y-4 animate-fade-in">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-orange-500" />
                        Key Symptoms
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {condition.symptoms.map((symptom, i) => (
                          <li key={i} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Early Detection Benefits</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {condition.earlyDetectionBenefits.map((benefit, i) => (
                          <li key={i} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Early Detection Matters</h3>
          <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed">
            Early detection of neurological disorders can significantly improve treatment outcomes, 
            quality of life, and long-term prognosis. Our multimodal AI system combines the power 
            of medical imaging, neurophysiological signals, and clinical expertise to provide 
            comprehensive assessments that support healthcare professionals in making informed decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConditionsSection;