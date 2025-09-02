/**
 * Tokenizer Service - Handles tokenization for Phi-3 model
 * This service isolates the transformers import to avoid module conflicts
 */

class TokenizerService {
  private static instance: TokenizerService;
  private tokenizer: any = null;
  private transformersModule: any = null;
  private isLoaded: boolean = false;

  static getInstance(): TokenizerService {
    if (!TokenizerService.instance) {
      TokenizerService.instance = new TokenizerService();
    }
    return TokenizerService.instance;
  }

  /**
   * Load tokenizer from path
   * @param tokenizerPath - Path to tokenizer directory
   */
  async loadTokenizer(tokenizerPath: string): Promise<void> {
    try {
      if (this.isLoaded && this.tokenizer) {
        console.log('Tokenizer already loaded');
        return;
      }

      console.log('Loading transformers module...');
      
      // Import transformers module with proper error handling
      this.transformersModule = await import('@xenova/transformers');
      
      console.log('Loading tokenizer from:', tokenizerPath);
      this.tokenizer = await this.transformersModule.AutoTokenizer.from_pretrained(tokenizerPath);
      
      this.isLoaded = true;
      console.log('Tokenizer loaded successfully');
      
    } catch (error) {
      console.error('Error loading tokenizer:', error);
      throw new Error(`Failed to load tokenizer: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Encode text to tokens
   * @param text - Text to encode
   * @returns Encoded tokens
   */
  async encode(text: string): Promise<{ input_ids: number[]; attention_mask: number[] }> {
    if (!this.tokenizer) {
      throw new Error('Tokenizer not loaded. Call loadTokenizer() first.');
    }

    try {
      const result = await this.tokenizer(text);
      return {
        input_ids: result.input_ids,
        attention_mask: result.attention_mask
      };
    } catch (error) {
      console.error('Error encoding text:', error);
      throw new Error(`Failed to encode text: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Decode tokens to text
   * @param tokenIds - Token IDs to decode
   * @returns Decoded text
   */
  async decode(tokenIds: number[]): Promise<string> {
    if (!this.tokenizer) {
      throw new Error('Tokenizer not loaded. Call loadTokenizer() first.');
    }

    try {
      return await this.tokenizer.decode(tokenIds);
    } catch (error) {
      console.error('Error decoding tokens:', error);
      throw new Error(`Failed to decode tokens: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Check if tokenizer is loaded
   * @returns boolean
   */
  isTokenizerLoaded(): boolean {
    return this.isLoaded && this.tokenizer !== null;
  }

  /**
   * Clear tokenizer from memory
   */
  clearTokenizer(): void {
    this.tokenizer = null;
    this.transformersModule = null;
    this.isLoaded = false;
    console.log('Tokenizer cleared from memory');
  }
}

// Export singleton instance
export const tokenizerService = TokenizerService.getInstance();

// Export individual functions for convenience
export const loadTokenizer = (tokenizerPath: string) => tokenizerService.loadTokenizer(tokenizerPath);
export const encodeText = (text: string) => tokenizerService.encode(text);
export const decodeTokens = (tokenIds: number[]) => tokenizerService.decode(tokenIds);
export const isTokenizerLoaded = () => tokenizerService.isTokenizerLoaded();
export const clearTokenizer = () => tokenizerService.clearTokenizer();
