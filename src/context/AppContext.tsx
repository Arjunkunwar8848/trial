import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AnalysisData, PredictionResult, ModalityStatus } from '../types';

interface AppContextType {
  analysisData: AnalysisData;
  setAnalysisData: (data: AnalysisData) => void;
  predictions: PredictionResult[];
  setPredictions: (predictions: PredictionResult[]) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
  modalityStatus: ModalityStatus;
  setModalityStatus: (status: ModalityStatus) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [analysisData, setAnalysisData] = useState<AnalysisData>({
    mri: null,
    eeg: null,
    clinicalNotes: ''
  });
  
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [modalityStatus, setModalityStatus] = useState<ModalityStatus>({
    mri: false,
    eeg: false,
    clinicalNotes: false
  });
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <AppContext.Provider value={{
      analysisData,
      setAnalysisData,
      predictions,
      setPredictions,
      isAnalyzing,
      setIsAnalyzing,
      modalityStatus,
      setModalityStatus,
      currentStep,
      setCurrentStep
    }}>
      {children}
    </AppContext.Provider>
  );
};