export interface NeurologicalCondition {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  prevalence: string;
  earlyDetectionBenefits: string[];
  color: string;
}

export interface AnalysisData {
  mri: File | null;
  eeg: File | null;
  clinicalNotes: string;
}

export interface PredictionResult {
  condition: string;
  confidence: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  recommendations: string[];
}

export interface ModalityStatus {
  mri: boolean;
  eeg: boolean;
  clinicalNotes: boolean;
}