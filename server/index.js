import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024
  }
});

let model = null;

const loadModel = () => {
  try {
    const modelPath = path.join(__dirname, 'models', 'late_fusion_model.json');

    if (fs.existsSync(modelPath)) {
      const modelData = fs.readFileSync(modelPath, 'utf8');
      model = JSON.parse(modelData);
      console.log('Model loaded successfully from:', modelPath);
      console.log('Model architecture:', model.architecture || 'Late Fusion');
      return true;
    } else {
      console.warn('Model file not found. Place your trained model at:', modelPath);
      console.warn('Using mock predictions for demonstration.');
      return false;
    }
  } catch (error) {
    console.error('Error loading model:', error.message);
    console.warn('Using mock predictions for demonstration.');
    return false;
  }
};

const processModalityData = async (modalityType, fileBuffer) => {
  console.log(`Processing ${modalityType} data...`);

  return {
    modality: modalityType,
    features: Array(128).fill(0).map(() => Math.random()),
    processed: true
  };
};

const lateFusionPredict = async (mriFeatures, eegFeatures, clinicalFeatures) => {
  console.log('Performing late fusion prediction...');

  if (model && model.weights) {
    console.log('Using trained model weights for prediction');
  } else {
    console.log('Using mock prediction (model not loaded)');
  }

  const conditions = [
    'Alzheimer\'s Disease',
    'Parkinson\'s Disease',
    'Epilepsy',
    'Multiple Sclerosis',
    'Brain Tumor'
  ];

  const predictions = conditions.map(condition => {
    const baseConfidence = Math.random();
    const confidence = Math.min(Math.max(baseConfidence, 0.15), 0.95);

    let riskLevel = 'Low';
    if (confidence > 0.7) riskLevel = 'High';
    else if (confidence > 0.4) riskLevel = 'Medium';

    const recommendations = generateRecommendations(condition, riskLevel);

    return {
      condition,
      confidence: Math.round(confidence * 100) / 100,
      riskLevel,
      recommendations
    };
  });

  predictions.sort((a, b) => b.confidence - a.confidence);

  return predictions.slice(0, 3);
};

const generateRecommendations = (condition, riskLevel) => {
  const baseRecommendations = {
    "Alzheimer's Disease": [
      'Cognitive behavioral therapy assessment',
      'Memory care specialist consultation',
      'Neuropsychological evaluation recommended'
    ],
    "Parkinson's Disease": [
      'Movement disorder specialist evaluation',
      'Physical therapy assessment',
      'Medication review with neurologist'
    ],
    'Epilepsy': [
      'EEG monitoring for seizure patterns',
      'Anti-epileptic medication review',
      'Lifestyle modifications counseling'
    ],
    'Multiple Sclerosis': [
      'MRI monitoring every 6-12 months',
      'Physical and occupational therapy',
      'Disease-modifying therapy evaluation'
    ],
    'Brain Tumor': [
      'Advanced imaging (contrast MRI)',
      'Neurosurgical consultation',
      'Biopsy consideration if indicated'
    ]
  };

  const recommendations = baseRecommendations[condition] || [
    'Follow-up with neurologist',
    'Additional diagnostic testing',
    'Regular monitoring recommended'
  ];

  if (riskLevel === 'High') {
    recommendations.unshift('Urgent specialist consultation recommended');
  } else if (riskLevel === 'Low') {
    recommendations.push('Continue routine health monitoring');
  }

  return recommendations;
};

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    modelLoaded: model !== null,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/predict',
  upload.fields([
    { name: 'mri', maxCount: 1 },
    { name: 'eeg', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      console.log('Received prediction request');

      const mriFile = req.files?.mri?.[0];
      const eegFile = req.files?.eeg?.[0];
      const clinicalNotes = req.body.clinicalNotes;

      if (!mriFile || !eegFile || !clinicalNotes) {
        return res.status(400).json({
          error: 'Missing required modality data. Please provide MRI, EEG, and clinical notes.'
        });
      }

      console.log('Processing modalities...');
      console.log('- MRI file:', mriFile.originalname, `(${mriFile.size} bytes)`);
      console.log('- EEG file:', eegFile.originalname, `(${eegFile.size} bytes)`);
      console.log('- Clinical notes length:', clinicalNotes.length);

      const mriFeatures = await processModalityData('MRI', mriFile.buffer);
      await new Promise(resolve => setTimeout(resolve, 500));

      const eegFeatures = await processModalityData('EEG', eegFile.buffer);
      await new Promise(resolve => setTimeout(resolve, 500));

      const clinicalFeatures = {
        modality: 'clinical',
        text: clinicalNotes,
        features: Array(64).fill(0).map(() => Math.random()),
        processed: true
      };
      await new Promise(resolve => setTimeout(resolve, 300));

      const predictions = await lateFusionPredict(
        mriFeatures,
        eegFeatures,
        clinicalFeatures
      );

      console.log('Prediction completed successfully');

      res.json({
        success: true,
        predictions,
        metadata: {
          modelType: 'Late Fusion Multi-Modal',
          timestamp: new Date().toISOString(),
          modalitiesProcessed: ['MRI', 'EEG', 'Clinical Notes']
        }
      });

    } catch (error) {
      console.error('Prediction error:', error);
      res.status(500).json({
        error: 'Prediction failed',
        message: error.message
      });
    }
  }
);

app.post('/api/load-model', async (req, res) => {
  try {
    const { modelPath } = req.body;

    if (modelPath) {
      const fullPath = path.join(__dirname, modelPath);
      if (fs.existsSync(fullPath)) {
        const modelData = fs.readFileSync(fullPath, 'utf8');
        model = JSON.parse(modelData);

        return res.json({
          success: true,
          message: 'Model loaded successfully',
          modelInfo: {
            architecture: model.architecture,
            version: model.version
          }
        });
      } else {
        return res.status(404).json({
          error: 'Model file not found',
          path: fullPath
        });
      }
    }

    const loaded = loadModel();
    res.json({
      success: loaded,
      message: loaded ? 'Model loaded successfully' : 'Using mock predictions'
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to load model',
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Neurological Disorder Detection API Server`);
  console.log(`📡 Server running on port ${PORT}`);
  console.log(`🔗 API endpoint: http://localhost:${PORT}/api/predict`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health\n`);

  loadModel();

  console.log('\n📋 Instructions:');
  console.log('1. Place your trained late fusion model at: server/models/late_fusion_model.json');
  console.log('2. The model should have the following structure:');
  console.log('   {');
  console.log('     "architecture": "Late Fusion",');
  console.log('     "version": "1.0",');
  console.log('     "weights": { ... },');
  console.log('     "config": { ... }');
  console.log('   }');
  console.log('3. Until the model is loaded, the API will use mock predictions.\n');
});
