import * as ort from 'onnxruntime-react-native';
import RNFS from 'react-native-fs';

/**
 * ONNX Runtime utility functions for machine learning inference
 */
export class ONNXUtil {
  /**
   * Load an ONNX model from the app bundle
   * @param modelPath - Path to the ONNX model file
   * @returns Promise<InferenceSession>
   */
  static async loadModel(modelPath: string): Promise<ort.InferenceSession> {
    try {
      const session = await ort.InferenceSession.create(modelPath);
      console.log('ONNX model loaded successfully');
      return session;
    } catch (error) {
      console.error('Error loading ONNX model:', error);
      throw error;
    }
  }

  /**
   * Load an ONNX model from a remote URL
   * @param modelUrl - URL to the ONNX model file
   * @returns Promise<InferenceSession>
   */
  static async loadModelFromUrl(modelUrl: string): Promise<ort.InferenceSession> {
    try {
      const session = await ort.InferenceSession.create(modelUrl);
      console.log('ONNX model loaded from URL successfully');
      return session;
    } catch (error) {
      console.error('Error loading ONNX model from URL:', error);
      throw error;
    }
  }

  /**
   * Run inference on a model with input data
   * @param session - The loaded ONNX model session
   * @param inputData - Input data for inference
   * @param inputName - Name of the input tensor
   * @returns Promise<any> - Model output
   */
  static async runInference(
    session: ort.InferenceSession,
    inputData: Float32Array,
    inputName: string = 'input'
  ): Promise<any> {
    try {
      // Create input tensor
      const inputTensor = new ort.Tensor('float32', inputData, [inputData.length]);
      
      // Prepare input feeds
      const feeds: Record<string, ort.Tensor> = {};
      feeds[inputName] = inputTensor;

      // Run inference
      const results = await session.run(feeds);
      
      console.log('Inference completed successfully');
      return results;
    } catch (error) {
      console.error('Error running inference:', error);
      throw error;
    }
  }

  /**
   * Get model information
   * @param session - The loaded ONNX model session
   * @returns Object with model input/output information
   */
  static getModelInfo(session: ort.InferenceSession): {
    inputs: readonly string[];
    outputs: readonly string[];
    inputShapes: number[][];
    outputShapes: number[][];
  } {
    const inputs = session.inputNames;
    const outputs = session.outputNames;
    
    // Simplified approach - return empty arrays for shapes to avoid TypeScript issues
    const inputShapes: number[][] = [];
    const outputShapes: number[][] = [];

    return {
      inputs,
      outputs,
      inputShapes,
      outputShapes
    };
  }

  /**
   * Example: Load and run a simple model
   * This is a template function - replace with your actual model
   */
  static async runExampleModel(): Promise<void> {
    try {
      // Example model path (replace with your actual model)
      const modelPath = `${RNFS.MainBundlePath}/example_model.onnx`;
      
      // Check if model file exists
      const exists = await RNFS.exists(modelPath);
      if (!exists) {
        console.log('Example model not found. Please add your ONNX model to the bundle.');
        return;
      }

      // Load model
      const session = await this.loadModel(modelPath);
      
      // Get model info
      const modelInfo = this.getModelInfo(session);
      console.log('Model Info:', modelInfo);

      // Example input data (replace with your actual input)
      const inputData = new Float32Array([1.0, 2.0, 3.0, 4.0]);
      
      // Run inference
      const results = await this.runInference(session, inputData);
      
      console.log('Inference Results:', results);
      
    } catch (error) {
      console.error('Example model execution failed:', error);
    }
  }
}

// Export types for convenience
export type { InferenceSession, Tensor } from 'onnxruntime-react-native';
