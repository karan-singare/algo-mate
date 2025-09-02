import React, { useState, useEffect } from 'react';
import { generateText, loadModel } from '@services';

/**
 * Custom hook for AI tutor functionality
 * Provides a clean interface for asking questions to the AI tutor
 */
export const useTutor = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>('');
  const [ready, setReady] = useState<boolean>(false);
  const [modelLoading, setModelLoading] = useState<boolean>(true);
  const [cancelled, setCancelled] = useState<boolean>(false);

  // Load model on hook initialization
  useEffect(() => {
    const initializeModel = async () => {
      try {
        console.log('Loading Phi-3 model and tokenizer...');
        setModelLoading(true);
        await loadModel();
        setReady(true);
        console.log('Model loaded successfully');
      } catch (error) {
        console.error('Error loading model:', error);
        setResponse('Failed to load AI model. Please restart the app.');
      } finally {
        setModelLoading(false);
      }
    };

    initializeModel();
  }, []);

  /**
   * Ask a question to the AI tutor with streaming support
   * @param prompt - The question or prompt to ask the tutor
   */
  const askTutor = async (prompt: string): Promise<void> => {
    if (!prompt.trim()) {
      setResponse('Please enter a valid question.');
      return;
    }

    if (!ready) {
      setResponse('AI model is still loading. Please wait...');
      return;
    }

    try {
      setLoading(true);
      setResponse(''); // Clear previous response
      setCancelled(false);
      
      console.log('Asking tutor:', prompt);
      
      // Use streaming to update response in real-time
      const tutorResponse = await generateText(prompt, (token: string) => {
        if (!cancelled) {
          setResponse(prev => prev + token);
        }
      });
      
      if (!cancelled) {
        console.log('Tutor response completed');
      }
      
    } catch (error) {
      console.error('Error asking tutor:', error);
      if (!cancelled) {
        setResponse('Sorry, I encountered an error while processing your question. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clear the current response
   */
  const clearResponse = (): void => {
    setResponse('');
  };

  /**
   * Cancel the current generation
   */
  const cancelGeneration = (): void => {
    setCancelled(true);
    setLoading(false);
  };

  /**
   * Reset the hook state
   */
  const reset = (): void => {
    setLoading(false);
    setResponse('');
    setCancelled(false);
  };

  return {
    askTutor,
    response,
    loading,
    ready,
    modelLoading,
    cancelled,
    clearResponse,
    cancelGeneration,
    reset,
  };
};
