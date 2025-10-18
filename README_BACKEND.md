# Multi-Modal Neurological Disorder Detection System - Backend

This is the Node.js backend server for the multi-modal AI system that detects neurological disorders using late fusion techniques.

## Architecture

The backend is built with:
- **Node.js** with Express.js
- **Multer** for handling multi-modal file uploads (MRI, EEG)
- **CORS** enabled for frontend communication
- **Late Fusion Model** loading and inference

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Place Your Trained Model

Place your trained late fusion model file at:
```
server/models/late_fusion_model.json
```

See `server/models/README.md` for the expected model structure.

### 3. Run the Backend Server

To run only the backend:
```bash
npm run server
```

To run both frontend and backend simultaneously:
```bash
npm run dev:all
```

The server will start on `http://localhost:3001`

## API Endpoints

### Health Check
```
GET /api/health
```
Returns server status and whether the model is loaded.

**Response:**
```json
{
  "status": "ok",
  "modelLoaded": true,
  "timestamp": "2025-10-18T..."
}
```

### Predict
```
POST /api/predict
```
Submits multi-modal data for analysis and receives predictions.

**Request:**
- Content-Type: `multipart/form-data`
- Fields:
  - `mri`: MRI scan file (image format: .jpg, .png, .dcm)
  - `eeg`: EEG data file (formats: .csv, .txt, .edf)
  - `clinicalNotes`: Clinical notes text

**Response:**
```json
{
  "success": true,
  "predictions": [
    {
      "condition": "Alzheimer's Disease",
      "confidence": 0.87,
      "riskLevel": "High",
      "recommendations": [
        "Urgent specialist consultation recommended",
        "Cognitive behavioral therapy assessment",
        "Memory care specialist consultation"
      ]
    }
  ],
  "metadata": {
    "modelType": "Late Fusion Multi-Modal",
    "timestamp": "2025-10-18T...",
    "modalitiesProcessed": ["MRI", "EEG", "Clinical Notes"]
  }
}
```

### Load Model
```
POST /api/load-model
```
Loads or reloads the trained model.

**Request:**
```json
{
  "modelPath": "models/late_fusion_model.json"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Model loaded successfully",
  "modelInfo": {
    "architecture": "Late Fusion",
    "version": "1.0"
  }
}
```

## Model Loading

The system expects a trained late fusion model in JSON format. When the server starts:

1. It automatically attempts to load the model from `server/models/late_fusion_model.json`
2. If the model file is found, it loads the weights and configuration
3. If not found, the server will use mock predictions for demonstration purposes

## Late Fusion Process

The backend implements the following late fusion pipeline:

1. **MRI Processing**: Extracts features from brain MRI images using CNN
2. **EEG Processing**: Processes neural signal data using CNN+LSTM
3. **Clinical Notes Processing**: Analyzes text data using Transformer models
4. **Feature Fusion**: Concatenates features from all modalities
5. **Prediction**: Uses the fused features to predict neurological conditions

## Model Integration Guide

To integrate your trained model:

1. **Export your model** to JSON format with the structure shown in `late_fusion_model.example.json`
2. **Include weights** for all model branches:
   - MRI branch (CNN)
   - EEG branch (CNN+LSTM)
   - Clinical branch (Transformer)
   - Fusion layer
   - Output layer
3. **Save the file** as `late_fusion_model.json` in `server/models/`
4. **Restart the server** or call the `/api/load-model` endpoint

## File Upload Limits

- Maximum file size: 50 MB per file
- Supported MRI formats: .jpg, .jpeg, .png, .dcm
- Supported EEG formats: .csv, .txt, .edf

## Environment Variables

The backend uses the following environment variable (optional):

```
PORT=3001
```

## Development

The backend runs on port 3001 by default, while the frontend runs on port 5173 (Vite default).

For development with hot reload:
```bash
npm run dev:all
```

## Production Considerations

For production deployment:

1. Set appropriate CORS origins (currently set to allow all)
2. Add authentication/authorization
3. Implement rate limiting
4. Add request validation middleware
5. Set up proper logging
6. Use environment variables for sensitive configuration
7. Implement model caching for better performance
8. Add monitoring and health checks

## Troubleshooting

**Model not loading:**
- Check that `late_fusion_model.json` exists in `server/models/`
- Verify the JSON structure matches the expected format
- Check server logs for specific error messages

**File upload errors:**
- Ensure files are within the 50MB limit
- Verify file formats are supported
- Check that all three modalities are provided

**CORS errors:**
- Verify the frontend is running on the expected port
- Check CORS configuration in `server/index.js`
