# Model Directory

Place your trained late fusion model file here.

## Expected Model File

**Filename:** `late_fusion_model.json`

## Model Structure

Your trained model should be exported as a JSON file with the following structure:

```json
{
  "architecture": "Late Fusion",
  "version": "1.0",
  "modalities": ["MRI", "EEG", "Clinical"],
  "weights": {
    "mri_branch": [...],
    "eeg_branch": [...],
    "clinical_branch": [...],
    "fusion_layer": [...]
  },
  "config": {
    "input_shapes": {
      "mri": [224, 224, 3],
      "eeg": [1000],
      "clinical": [64]
    },
    "output_classes": [
      "Alzheimer's Disease",
      "Parkinson's Disease",
      "Epilepsy",
      "Multiple Sclerosis",
      "Brain Tumor"
    ]
  },
  "training_info": {
    "accuracy": 0.95,
    "trained_date": "2025-10-18"
  }
}
```

## Notes

- The model will be automatically loaded when the server starts
- If the model file is not found, the API will use mock predictions for demonstration
- You can reload the model without restarting the server using the `/api/load-model` endpoint
