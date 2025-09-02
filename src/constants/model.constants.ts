/**
 * Model-related constants
 */

// Model file paths
export const MODEL_PATHS = {
  // Bundled model path (in assets)
  BUNDLED: 'phi3-mini.onnx',
  
  // Local model path (in app documents)
  LOCAL: 'phi3-mini.onnx',
} as const;

// Model configuration
export const MODEL_CONFIG = {
  // Model name for display
  NAME: 'Phi-3 Mini',
  
  // Model version
  VERSION: '1.0.0',
  
  // Expected model size (for validation)
  EXPECTED_SIZE: 2.3 * 1024 * 1024 * 1024, // 2.3GB in bytes
  
  // Model input/output configuration
  MAX_INPUT_LENGTH: 2048,
  MAX_OUTPUT_LENGTH: 512,
} as const;

// Model storage keys
export const MODEL_STORAGE_KEYS = {
  MODEL_COPIED: 'model_copied_to_documents',
  MODEL_PATH: 'model_local_path',
} as const;
