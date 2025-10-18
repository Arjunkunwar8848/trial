# Frontend-Backend Integration Guide

## Overview

This multi-modal AI system consists of:
- **Frontend**: React + TypeScript + Vite (port 5173)
- **Backend**: Node.js + Express (port 3001)

## Quick Start

### 1. Start Both Servers

Run both frontend and backend together:
```bash
npm run dev:all
```

Or run them separately:

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 2. Access the Application

Open your browser and navigate to: `http://localhost:5173`

## Data Flow

### User Journey

1. **Upload Modalities**
   - User uploads MRI scan (image file)
   - User uploads EEG data (signal file)
   - User enters clinical notes (text)

2. **Analysis Request**
   - Frontend validates all three modalities are present
   - User clicks "Start Analysis"
   - Frontend sends data to backend via API

3. **Backend Processing**
   - Backend receives multipart form data
   - Processes each modality:
     - MRI → Feature extraction via CNN
     - EEG → Feature extraction via CNN+LSTM
     - Clinical → Feature extraction via Transformer
   - Performs late fusion of all features
   - Generates predictions using trained model

4. **Results Display**
   - Backend returns predictions with confidence scores
   - Frontend displays top 3 conditions with recommendations

## API Communication

### Frontend Service: `src/services/apiService.ts`

The frontend communicates with the backend through three main functions:

```typescript
// Check if backend server is running and model is loaded
checkServerHealth()

// Submit analysis data and receive predictions
submitAnalysis(analysisData)

// Manually reload the trained model
loadModel(modelPath?)
```

### Backend Endpoints: `server/index.js`

- `GET /api/health` - Server health check
- `POST /api/predict` - Submit analysis and get predictions
- `POST /api/load-model` - Load/reload the trained model

## Model Integration

### Current State (Demo Mode)

Without a trained model, the system uses mock predictions for demonstration:
- Random confidence scores
- All 5 neurological conditions evaluated
- Risk levels assigned based on confidence
- Contextual recommendations generated

### Production State (With Trained Model)

To use your actual trained model:

1. **Export Model**: Convert your trained late fusion model to JSON format
2. **Place Model**: Save as `server/models/late_fusion_model.json`
3. **Restart Server**: The model will be automatically loaded

Expected model structure:
```json
{
  "architecture": "Late Fusion",
  "version": "1.0",
  "weights": {
    "mri_branch": { ... },
    "eeg_branch": { ... },
    "clinical_branch": { ... },
    "fusion_layer": { ... }
  },
  "config": { ... }
}
```

See `server/models/late_fusion_model.example.json` for full structure.

## Late Fusion Implementation

### Model Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Input Modalities                    │
├──────────────┬──────────────┬─────────────────────┤
│   MRI Scan   │   EEG Data   │  Clinical Notes      │
│   (Image)    │   (Signal)   │     (Text)          │
└──────┬───────┴──────┬───────┴──────┬──────────────┘
       │              │              │
       ▼              ▼              ▼
   ┌────────┐    ┌────────┐    ┌────────────┐
   │  CNN   │    │CNN+LSTM│    │Transformer │
   │ Branch │    │ Branch │    │   Branch   │
   └───┬────┘    └───┬────┘    └─────┬──────┘
       │             │               │
       └─────────────┴───────────────┘
                     │
              ┌──────▼──────┐
              │    Fusion   │
              │    Layer    │
              └──────┬──────┘
                     │
              ┌──────▼──────┐
              │   Output    │
              │ Predictions │
              └─────────────┘
```

### Processing Steps

1. **Preprocessing**: Each modality is normalized and prepared
2. **Feature Extraction**: Branch-specific models extract features
3. **Late Fusion**: Features are concatenated/combined
4. **Classification**: Fused features predict neurological conditions

## Environment Configuration

### `.env` File

```env
VITE_API_URL=http://localhost:3001
```

This tells the frontend where to find the backend API.

## Type Definitions

### Frontend Types: `src/types/index.ts`

```typescript
interface AnalysisData {
  mri: File | null;
  eeg: File | null;
  clinicalNotes: string;
}

interface PredictionResult {
  condition: string;
  confidence: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  recommendations: string[];
}
```

## Error Handling

The system handles various error scenarios:

- **Network errors**: Connection to backend fails
- **Validation errors**: Missing or invalid input data
- **Processing errors**: Backend fails to process data
- **Model errors**: Model loading or inference fails

All errors are displayed to the user with clear messages and retry options.

## Development Tips

### Testing the Integration

1. **Health Check**: Visit `http://localhost:3001/api/health` to verify backend is running
2. **Console Logs**: Check browser and terminal logs for debugging
3. **Network Tab**: Monitor API requests in browser DevTools

### Common Issues

**Backend not responding:**
- Ensure backend is running on port 3001
- Check CORS configuration
- Verify `.env` file has correct API URL

**File upload fails:**
- Check file size (max 50MB)
- Verify file format is supported
- Ensure all three modalities are provided

**Model not loading:**
- Verify model file exists at `server/models/late_fusion_model.json`
- Check JSON structure matches expected format
- Review server logs for specific errors

## Next Steps for Production

1. **Implement Real Model Inference**
   - Replace feature extraction placeholders with actual CNN/LSTM/Transformer implementations
   - Use TensorFlow.js or ONNX Runtime for JavaScript
   - Or call Python backend service for model inference

2. **Add Authentication**
   - Implement user authentication
   - Add API key validation
   - Set up session management

3. **Optimize Performance**
   - Add model caching
   - Implement request queuing
   - Use worker threads for heavy processing

4. **Deploy**
   - Set up production environment variables
   - Configure reverse proxy (nginx)
   - Implement HTTPS
   - Set up monitoring and logging

## File Structure

```
project/
├── src/                          # Frontend code
│   ├── components/               # React components
│   ├── context/                  # React context
│   ├── services/                 # API service layer
│   │   └── apiService.ts         # Backend API calls
│   └── types/                    # TypeScript types
├── server/                       # Backend code
│   ├── index.js                  # Express server
│   └── models/                   # Model directory
│       ├── README.md             # Model documentation
│       └── late_fusion_model.example.json
├── .env                          # Environment variables
├── package.json                  # Dependencies & scripts
├── README_BACKEND.md             # Backend documentation
└── INTEGRATION_GUIDE.md          # This file
```

## Support

For issues or questions:
1. Check server logs in terminal
2. Check browser console for frontend errors
3. Review API responses in Network tab
4. Verify all required files are in place
