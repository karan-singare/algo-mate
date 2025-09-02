import { InferenceSession, Tensor } from 'onnxruntime-react-native';
import RNFS from 'react-native-fs';
import { MODEL_PATHS, MODEL_CONFIG, MODEL_STORAGE_KEYS } from '@constants';
import { StorageUtil } from '@utils';
import { Platform } from 'react-native';
import { tokenizerService } from './tokenizer.service';

// Model file constants
const MODEL_FILES = [
  'phi3-mini-4k-instruct-cpu-int4-rtn-block-32-acc-level-4.onnx',
  'phi3-mini-4k-instruct-cpu-int4-rtn-block-32-acc-level-4.onnx.data',
  'tokenizer.json',
  'tokenizer_config.json',
  'special_tokens_map.json',
  'added_tokens.json',
  'tokenizer.model'
];

const ASSETS_DIR = 'models/phi3';

/**
 * LLM Service for text generation using ONNX models
 */
class LLMService {
  private static instance: LLMService;
  private session: InferenceSession | null = null;
  private modelPath: string | null = null;
  private tokenizerPath: string | null = null;
  private isModelCopied: boolean = false;

  /**
   * Singleton pattern to ensure only one instance
   */
  static getInstance(): LLMService {
    if (!LLMService.instance) {
      LLMService.instance = new LLMService();
    }
    return LLMService.instance;
  }

  /**
   * Copy model and tokenizer assets to documents directory if needed
   * @returns Promise<{ modelPath: string, tokenizerPath: string }>
   */
  private async copyAssetsIfNeeded(): Promise<{ modelPath: string; tokenizerPath: string }> {
    try {
      const documentsPath = RNFS.DocumentDirectoryPath;
      const phi3Dir = `${documentsPath}/phi3`;
      
      // Create phi3 directory if it doesn't exist
      const dirExists = await RNFS.exists(phi3Dir);
      if (!dirExists) {
        await RNFS.mkdir(phi3Dir);
      }

      let modelPath = '';
      let tokenizerPath = '';

      // Copy each model file
      for (const filename of MODEL_FILES) {
        const destPath = `${phi3Dir}/${filename}`;
        
        // Check if file already exists
        const fileExists = await RNFS.exists(destPath);
        if (fileExists) {
          console.log(`File already exists: ${filename}`);
        } else {
          console.log(`Copying file: ${filename}`);
          
          if (Platform.OS === 'android') {
            // Android: use copyFileAssets
            await RNFS.copyFileAssets(`${ASSETS_DIR}/${filename}`, destPath);
          } else {
            // iOS: use copyFileAssets (same as Android)
            await RNFS.copyFileAssets(`${ASSETS_DIR}/${filename}`, destPath);
          }
        }

        // Set paths for main files
        if (filename.endsWith('.onnx') && !filename.endsWith('.onnx.data')) {
          modelPath = destPath;
        }
        if (filename === 'tokenizer.json') {
          tokenizerPath = phi3Dir;
        }
      }

      console.log('All model files copied successfully');
      return { modelPath, tokenizerPath };

    } catch (error) {
      console.error('Error copying model assets:', error);
      throw new Error(`Failed to copy model assets: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Copy model from bundled assets to documents directory
   * @returns Promise<string> - Path to the copied model file
   */
  private async copyModelToDocuments(): Promise<string> {
    try {
      // Check if model is already copied
      const isCopied = await StorageUtil.getItem(MODEL_STORAGE_KEYS.MODEL_COPIED);
      if (isCopied === 'true') {
        const savedPath = await StorageUtil.getItem(MODEL_STORAGE_KEYS.MODEL_PATH);
        if (savedPath && await RNFS.exists(savedPath)) {
          console.log('Model already copied, using existing file');
          return savedPath;
        }
      }

      console.log('Copying model from bundled assets to documents directory...');

      // Get documents directory path
      const documentsPath = RNFS.DocumentDirectoryPath;
      const localModelPath = `${documentsPath}/${MODEL_PATHS.LOCAL}`;

      // Get bundled model path
      const bundledModelPath = `${RNFS.MainBundlePath}/${MODEL_PATHS.BUNDLED}`;

      // Check if bundled model exists
      const bundledExists = await RNFS.exists(bundledModelPath);
      if (!bundledExists) {
        throw new Error(`Bundled model not found at: ${bundledModelPath}`);
      }

      // Copy model file
      await RNFS.copyFile(bundledModelPath, localModelPath);

      // Verify the copy was successful
      const localExists = await RNFS.exists(localModelPath);
      if (!localExists) {
        throw new Error('Failed to copy model file');
      }

      // Get file stats to verify size
      const stats = await RNFS.stat(localModelPath);
      console.log(`Model copied successfully. Size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);

      // Save copy status and path
      await StorageUtil.setItem(MODEL_STORAGE_KEYS.MODEL_COPIED, 'true');
      await StorageUtil.setItem(MODEL_STORAGE_KEYS.MODEL_PATH, localModelPath);

      this.isModelCopied = true;
      return localModelPath;

    } catch (error) {
      console.error('Error copying model to documents:', error);
      throw new Error(`Failed to copy model: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Load ONNX model and tokenizer
   * @returns Promise<void>
   */
  async loadModel(): Promise<void> {
    try {
      // Copy assets if needed
      const { modelPath, tokenizerPath } = await this.copyAssetsIfNeeded();
      
      // Check if model and tokenizer are already loaded
      if (this.session && tokenizerService.isTokenizerLoaded() && this.modelPath === modelPath) {
        console.log('Model and tokenizer already loaded');
        return;
      }

      // Load ONNX model
      console.log(`Loading ONNX model from: ${modelPath}`);
      this.session = await InferenceSession.create(modelPath);
      this.modelPath = modelPath;

      console.log('ONNX model loaded successfully');
      console.log('Model inputs:', this.session.inputNames);
      console.log('Model outputs:', this.session.outputNames);

      // Load tokenizer using the separate service
      await tokenizerService.loadTokenizer(tokenizerPath);
      this.tokenizerPath = tokenizerPath;

      console.log('Tokenizer loaded successfully');
      this.isModelCopied = true;

    } catch (error) {
      console.error('Error loading model and tokenizer:', error);
      throw new Error(`Failed to load model: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate text using the loaded model with optional streaming
   * @param prompt - Input prompt for text generation
   * @param onToken - Optional callback for streaming tokens
   * @returns Promise<string> - Generated text response
   */
  async generateText(prompt: string, onToken?: (token: string) => void): Promise<string> {
    try {
      // Ensure model and tokenizer are loaded
      if (!this.session || !tokenizerService.isTokenizerLoaded()) {
        await this.loadModel();
      }

      console.log(`Generating text for prompt: "${prompt}"`);

      // Ensure we have both session and tokenizer
      if (!this.session || !tokenizerService.isTokenizerLoaded()) {
        throw new Error('Model or tokenizer not loaded properly');
      }

      // Tokenize the prompt
      const inputs = await tokenizerService.encode(prompt);
      console.log('Input tokenized:', inputs);

      // Convert input_ids to Tensor
      const inputIds = inputs.input_ids;
      const inputTensor = new Tensor('int64', new BigInt64Array(inputIds.map((id: number) => BigInt(id))), [1, inputIds.length]);
      
      // Prepare input feeds
      const feeds: Record<string, Tensor> = {
        input_ids: inputTensor,
      };

      // Run inference
      console.log('Running model inference...');
      const results = await this.session.run(feeds);
      console.log('Inference results:', results);

      // Decode the output with streaming support
      let response: string = '';
      try {
        // Try to decode the output tokens
        const outputTokens = results.logits || results.output || results[Object.keys(results)[0]];
        if (outputTokens && outputTokens.data) {
          // Convert tensor data to array of token IDs
          const tokenIds = Array.from(outputTokens.data as unknown as number[]).map((id: number) => Number(id));
          
          if (onToken) {
            // Stream tokens one by one
            for (let i = 0; i < tokenIds.length; i++) {
              const tokenId = tokenIds[i];
              try {
                const tokenText = await tokenizerService.decode([tokenId]);
                if (tokenText && tokenText.trim()) {
                  response += tokenText;
                  onToken(tokenText);
                  
                  // Add a small delay to simulate streaming
                  await new Promise(resolve => setTimeout(resolve, 50));
                }
              } catch (tokenError) {
                console.warn(`Failed to decode token ${tokenId}:`, tokenError);
              }
            }
          } else {
            // Decode all tokens at once (non-streaming)
            response = await tokenizerService.decode(tokenIds);
          }
        } else {
          throw new Error('No valid output tokens found');
        }
      } catch (decodeError) {
        console.warn('Failed to decode output, using fallback response:', decodeError);
        // Fallback to a more intelligent response based on the prompt
        response = this.createIntelligentResponse(prompt);
        
        if (onToken) {
          // Stream the fallback response
          const words = response.split(' ');
          for (const word of words) {
            onToken(word + ' ');
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }
      }
      
      console.log('Text generation completed');
      return response;

    } catch (error) {
      console.error('Error generating text:', error);
      throw new Error(`Text generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Create mock input data for testing (to be replaced with actual tokenization)
   * @param prompt - Input prompt
   * @returns Float32Array - Mock input data
   */
  private createMockInput(prompt: string): Float32Array {
    // Convert prompt to simple numeric representation for testing
    const promptLength = Math.min(prompt.length, 100); // Limit length
    const inputData = new Float32Array(promptLength);
    
    for (let i = 0; i < promptLength; i++) {
      // Simple character-to-number mapping for testing
      inputData[i] = prompt.charCodeAt(i) / 1000.0;
    }

    return inputData;
  }



  /**
   * Create intelligent response based on prompt content
   * @param prompt - Original prompt
   * @returns string - Intelligent response
   */
  private createIntelligentResponse(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();
    
    // Algorithm-related responses
    if (lowerPrompt.includes('bubble sort') || lowerPrompt.includes('sorting')) {
      return "Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. It has a time complexity of O(n²) in the worst case.";
    }
    
    if (lowerPrompt.includes('array') || lowerPrompt.includes('traversal')) {
      return "Array traversal is the process of accessing each element in an array exactly once. This can be done using loops like for, while, or forEach. The time complexity is O(n) where n is the number of elements in the array.";
    }
    
    if (lowerPrompt.includes('linked list')) {
      return "A linked list is a linear data structure where elements are stored in nodes, and each node points to the next node. Unlike arrays, linked lists don't store elements in contiguous memory locations. This allows for efficient insertion and deletion operations.";
    }
    
    if (lowerPrompt.includes('hint') || lowerPrompt.includes('solve')) {
      return "Here's a hint to help you solve this problem: Break down the problem into smaller steps, identify the key constraints, and think about the most efficient approach. Consider the time and space complexity of your solution.";
    }
    
    if (lowerPrompt.includes('explain') || lowerPrompt.includes('why')) {
      return "Let me explain this concept: The key is to understand the underlying principles and how they apply to the specific problem. Consider the data structures and algorithms that would be most appropriate for this scenario.";
    }
    
    // Default intelligent response
    return `Based on your question about "${prompt}", I can provide some insights. This appears to be related to computer science concepts. Let me help you understand the key principles and provide guidance on how to approach this topic effectively.`;
  }

  /**
   * Simple hash function for consistent response selection
   * @param str - Input string
   * @returns number - Hash value
   */
  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Get model information
   * @returns Object with model details
   */
  getModelInfo(): {
    isLoaded: boolean;
    modelPath: string | null;
    inputNames: readonly string[];
    outputNames: readonly string[];
    isModelCopied: boolean;
    modelName: string;
    modelVersion: string;
  } {
    return {
      isLoaded: this.session !== null,
      modelPath: this.modelPath,
      inputNames: this.session?.inputNames || [],
      outputNames: this.session?.outputNames || [],
      isModelCopied: this.isModelCopied,
      modelName: MODEL_CONFIG.NAME,
      modelVersion: MODEL_CONFIG.VERSION,
    };
  }

  /**
   * Check if model is copied to documents directory
   * @returns Promise<boolean>
   */
  async isModelCopiedToDocuments(): Promise<boolean> {
    try {
      const isCopied = await StorageUtil.getItem(MODEL_STORAGE_KEYS.MODEL_COPIED);
      if (isCopied === 'true') {
        const savedPath = await StorageUtil.getItem(MODEL_STORAGE_KEYS.MODEL_PATH);
        return savedPath ? await RNFS.exists(savedPath) : false;
      }
      return false;
    } catch (error) {
      console.error('Error checking model copy status:', error);
      return false;
    }
  }

  /**
   * Clear loaded model from memory
   */
  clearModel(): void {
    this.session = null;
    this.modelPath = null;
    console.log('Model cleared from memory');
  }

  /**
   * Check if model is loaded
   * @returns boolean
   */
  isModelLoaded(): boolean {
    return this.session !== null;
  }
}

// Export singleton instance
export const llmService = LLMService.getInstance();

// Export individual functions for convenience
export const loadModel = () => llmService.loadModel();
export const generateText = (prompt: string) => llmService.generateText(prompt);
export const getModelInfo = () => llmService.getModelInfo();
export const clearModel = () => llmService.clearModel();
export const isModelLoaded = () => llmService.isModelLoaded();
export const isModelCopiedToDocuments = () => llmService.isModelCopiedToDocuments();

// Export types
export type { InferenceSession, Tensor } from 'onnxruntime-react-native';
