import { AnalysisData, PredictionResult } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const checkServerHealth = async (): Promise<{ status: string; modelLoaded: boolean }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    if (!response.ok) {
      throw new Error('Server health check failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Health check error:', error);
    throw error;
  }
};

export const submitAnalysis = async (analysisData: AnalysisData): Promise<PredictionResult[]> => {
  try {
    const formData = new FormData();

    if (analysisData.mri) {
      formData.append('mri', analysisData.mri);
    }

    if (analysisData.eeg) {
      formData.append('eeg', analysisData.eeg);
    }

    formData.append('clinicalNotes', analysisData.clinicalNotes);

    const response = await fetch(`${API_BASE_URL}/api/predict`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Prediction request failed');
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error('Prediction was not successful');
    }

    return result.predictions;
  } catch (error) {
    console.error('Analysis submission error:', error);
    throw error;
  }
};

export const loadModel = async (modelPath?: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/load-model`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ modelPath }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Model loading failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Model loading error:', error);
    throw error;
  }
};
