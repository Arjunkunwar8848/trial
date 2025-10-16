import React from 'react';
import { Upload, Brain, Activity, FileText, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ModalityInputs: React.FC = () => {
  const { 
    analysisData, 
    setAnalysisData, 
    modalityStatus, 
    setModalityStatus, 
    setCurrentStep, 
    setIsAnalyzing 
  } = useAppContext();

  const handleFileUpload = (modality: 'mri' | 'eeg', file: File) => {
    setAnalysisData({
      ...analysisData,
      [modality]: file
    });
    setModalityStatus({
      ...modalityStatus,
      [modality]: true
    });
  };

  const handleClinicalNotesChange = (notes: string) => {
    setAnalysisData({
      ...analysisData,
      clinicalNotes: notes
    });
    setModalityStatus({
      ...modalityStatus,
      clinicalNotes: notes.trim().length > 10
    });
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setCurrentStep(1);
  };

  const canStartAnalysis = modalityStatus.mri && modalityStatus.eeg && modalityStatus.clinicalNotes;

  const modalities = [
    {
      id: 'mri',
      title: 'MRI Scan',
      description: 'Upload brain MRI images for structural analysis',
      icon: Brain,
      accept: '.jpg,.jpeg,.png,.dcm',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'eeg',
      title: 'EEG Data',
      description: 'Upload EEG signal data for neurophysiological analysis',
      icon: Activity,
      accept: '.csv,.txt,.edf',
      color: 'from-green-500 to-teal-500'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {modalities.map(({ id, title, description, icon: Icon, accept, color }) => (
          <div
            key={id}
            className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-8 hover:border-gray-400 transition-all duration-300"
          >
            <div className="text-center">
              <div className={`bg-gradient-to-r ${color} rounded-full p-4 inline-block mb-4`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 mb-6">{description}</p>

              <div className="relative">
                <input
                  type="file"
                  accept={accept}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileUpload(id as 'mri' | 'eeg', file);
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  {modalityStatus[id as keyof typeof modalityStatus] ? (
                    <div className="flex items-center justify-center text-green-600">
                      <CheckCircle className="h-6 w-6 mr-2" />
                      <span className="font-medium">File uploaded</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center text-gray-500">
                      <Upload className="h-6 w-6 mr-2" />
                      <span>Click to upload file</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-8">
        <div className="flex items-center mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 mr-4">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Clinical Notes</h3>
            <p className="text-gray-600">Enter relevant clinical observations and patient history</p>
          </div>
        </div>
        
        <textarea
          value={analysisData.clinicalNotes}
          onChange={(e) => handleClinicalNotesChange(e.target.value)}
          placeholder="Enter clinical notes, patient history, symptoms, and relevant medical observations..."
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        
        {modalityStatus.clinicalNotes && (
          <div className="mt-2 flex items-center text-green-600">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span className="text-sm">Clinical notes added</span>
          </div>
        )}
      </div>

      <div className="text-center pt-8">
        <button
          onClick={startAnalysis}
          disabled={!canStartAnalysis}
          className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform ${
            canStartAnalysis
              ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:from-blue-700 hover:to-teal-700 hover:scale-105 shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {canStartAnalysis ? 'Start Analysis' : 'Upload All Modalities to Continue'}
        </button>
      </div>
    </div>
  );
};

export default ModalityInputs;