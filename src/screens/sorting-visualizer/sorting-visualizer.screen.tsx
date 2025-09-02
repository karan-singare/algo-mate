import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { Visualizer } from '@components';
import { styles } from './sorting-visualizer.styles';

interface SortingVisualizerScreenProps {
  navigation: any;
}

type SortingAlgorithm = 'bubble' | 'insertion' | 'selection';

interface AlgorithmInfo {
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
}

const ALGORITHMS: Record<SortingAlgorithm, AlgorithmInfo> = {
  bubble: {
    name: 'Bubble Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Compare adjacent elements and swap if they are in wrong order. Repeat until no more swaps are needed.'
  },
  insertion: {
    name: 'Insertion Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Build the final sorted array one item at a time. Take elements from unsorted portion and insert into correct position.'
  },
  selection: {
    name: 'Selection Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Find the minimum element in unsorted array and swap it with the first element. Repeat for remaining elements.'
  }
};

const SortingVisualizerScreen: React.FC<SortingVisualizerScreenProps> = ({ navigation }) => {
  const [array, setArray] = useState<number[]>([5, 3, 8, 4, 2]);
  const [highlightIndices, setHighlightIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [sortingComplete, setSortingComplete] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithm>('bubble');
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const stepsRef = useRef<Array<{ array: number[]; highlight: number[]; description: string }>>([]);

  // Generate bubble sort steps
  const generateBubbleSortSteps = (arr: number[]) => {
    const steps: Array<{ array: number[]; highlight: number[]; description: string }> = [];
    const arrayCopy = [...arr];
    
    steps.push({
      array: [...arrayCopy],
      highlight: [],
      description: 'Starting bubble sort...'
    });

    const n = arrayCopy.length;
    
    for (let i = 0; i < n - 1; i++) {
      steps.push({
        array: [...arrayCopy],
        highlight: [],
        description: `Pass ${i + 1}: Comparing adjacent elements`
      });
      
      for (let j = 0; j < n - i - 1; j++) {
        // Highlight the two elements being compared
        steps.push({
          array: [...arrayCopy],
          highlight: [j, j + 1],
          description: `Comparing ${arrayCopy[j]} and ${arrayCopy[j + 1]}`
        });
        
        if (arrayCopy[j] > arrayCopy[j + 1]) {
          // Swap elements
          [arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]];
          
          steps.push({
            array: [...arrayCopy],
            highlight: [j, j + 1],
            description: `Swapped ${arrayCopy[j + 1]} and ${arrayCopy[j]}`
          });
        } else {
          steps.push({
            array: [...arrayCopy],
            highlight: [j, j + 1],
            description: `${arrayCopy[j]} ≤ ${arrayCopy[j + 1]}, no swap needed`
          });
        }
      }
      
      // Highlight the largest element in its final position
      steps.push({
        array: [...arrayCopy],
        highlight: [n - i - 1],
        description: `Element ${arrayCopy[n - i - 1]} is in its final position`
      });
    }
    
    steps.push({
      array: [...arrayCopy],
      highlight: [],
      description: 'Sorting complete!'
    });
    
    return steps;
  };

  // Generate insertion sort steps
  const generateInsertionSortSteps = (arr: number[]) => {
    const steps: Array<{ array: number[]; highlight: number[]; description: string }> = [];
    const arrayCopy = [...arr];
    
    steps.push({
      array: [...arrayCopy],
      highlight: [],
      description: 'Starting insertion sort...'
    });

    const n = arrayCopy.length;
    
    for (let i = 1; i < n; i++) {
      const key = arrayCopy[i];
      let j = i - 1;
      
      steps.push({
        array: [...arrayCopy],
        highlight: [i],
        description: `Selecting element ${key} at position ${i} to insert`
      });
      
      // Move elements greater than key one position ahead
      while (j >= 0 && arrayCopy[j] > key) {
        steps.push({
          array: [...arrayCopy],
          highlight: [j, j + 1],
          description: `Comparing ${arrayCopy[j]} with ${key}, shifting ${arrayCopy[j]} right`
        });
        
        arrayCopy[j + 1] = arrayCopy[j];
        j--;
        
        steps.push({
          array: [...arrayCopy],
          highlight: [j + 1],
          description: `Shifted ${arrayCopy[j + 1]} to position ${j + 1}`
        });
      }
      
      // Insert key at correct position
      arrayCopy[j + 1] = key;
      
      steps.push({
        array: [...arrayCopy],
        highlight: [j + 1],
        description: `Inserted ${key} at position ${j + 1}`
      });
    }
    
    steps.push({
      array: [...arrayCopy],
      highlight: [],
      description: 'Sorting complete!'
    });
    
    return steps;
  };

  // Generate selection sort steps
  const generateSelectionSortSteps = (arr: number[]) => {
    const steps: Array<{ array: number[]; highlight: number[]; description: string }> = [];
    const arrayCopy = [...arr];
    
    steps.push({
      array: [...arrayCopy],
      highlight: [],
      description: 'Starting selection sort...'
    });

    const n = arrayCopy.length;
    
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      
      steps.push({
        array: [...arrayCopy],
        highlight: [i],
        description: `Pass ${i + 1}: Finding minimum element starting from position ${i}`
      });
      
      // Find minimum element in remaining array
      for (let j = i + 1; j < n; j++) {
        steps.push({
          array: [...arrayCopy],
          highlight: [minIndex, j],
          description: `Comparing ${arrayCopy[minIndex]} with ${arrayCopy[j]}`
        });
        
        if (arrayCopy[j] < arrayCopy[minIndex]) {
          minIndex = j;
          steps.push({
            array: [...arrayCopy],
            highlight: [minIndex],
            description: `New minimum found: ${arrayCopy[minIndex]} at position ${minIndex}`
          });
        }
      }
      
      // Swap minimum element with first element
      if (minIndex !== i) {
        steps.push({
          array: [...arrayCopy],
          highlight: [i, minIndex],
          description: `Swapping ${arrayCopy[i]} with minimum ${arrayCopy[minIndex]}`
        });
        
        [arrayCopy[i], arrayCopy[minIndex]] = [arrayCopy[minIndex], arrayCopy[i]];
        
        steps.push({
          array: [...arrayCopy],
          highlight: [i],
          description: `Swapped! ${arrayCopy[i]} is now in its correct position`
        });
      } else {
        steps.push({
          array: [...arrayCopy],
          highlight: [i],
          description: `${arrayCopy[i]} is already in correct position`
        });
      }
    }
    
    steps.push({
      array: [...arrayCopy],
      highlight: [],
      description: 'Sorting complete!'
    });
    
    return steps;
  };

  const startSorting = () => {
    if (isSorting) return;
    
    setIsSorting(true);
    setSortingComplete(false);
    setCurrentStep(0);
    
    // Generate steps based on selected algorithm
    let steps: Array<{ array: number[]; highlight: number[]; description: string }>;
    
    switch (selectedAlgorithm) {
      case 'bubble':
        steps = generateBubbleSortSteps(array);
        break;
      case 'insertion':
        steps = generateInsertionSortSteps(array);
        break;
      case 'selection':
        steps = generateSelectionSortSteps(array);
        break;
      default:
        steps = generateBubbleSortSteps(array);
    }
    
    stepsRef.current = steps;
    setTotalSteps(steps.length);
    
    // Start animation
    animateStep(0);
  };

  const animateStep = (stepIndex: number) => {
    if (stepIndex >= stepsRef.current.length) {
      // Animation complete
      setIsSorting(false);
      setSortingComplete(true);
      setHighlightIndices([]);
      return;
    }
    
    const step = stepsRef.current[stepIndex];
    setArray(step.array);
    setHighlightIndices(step.highlight);
    setCurrentStep(stepIndex + 1);
    
    // Schedule next step
    animationRef.current = setTimeout(() => {
      animateStep(stepIndex + 1);
    }, 500);
  };

  const resetArray = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
    
    setArray([5, 3, 8, 4, 2]);
    setHighlightIndices([]);
    setIsSorting(false);
    setSortingComplete(false);
    setCurrentStep(0);
    setTotalSteps(0);
    stepsRef.current = [];
  };

  const pauseAnimation = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
    setIsSorting(false);
  };

  const resumeAnimation = () => {
    if (currentStep < totalSteps) {
      setIsSorting(true);
      animateStep(currentStep);
    }
  };

  const handleAlgorithmSelect = (index: IndexPath | IndexPath[]) => {
    const selectedIdx = Array.isArray(index) ? index[0] : index;
    setSelectedIndex(selectedIdx);
    
    const algorithmKeys = Object.keys(ALGORITHMS) as SortingAlgorithm[];
    setSelectedAlgorithm(algorithmKeys[selectedIdx.row]);
  };

  const getCurrentDescription = () => {
    if (stepsRef.current.length === 0) return `Ready to start ${ALGORITHMS[selectedAlgorithm].name}`;
    if (currentStep === 0) return `Click "Start ${ALGORITHMS[selectedAlgorithm].name}" to begin`;
    if (currentStep > stepsRef.current.length) return 'Sorting complete!';
    return stepsRef.current[currentStep - 1]?.description || '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Sorting Algorithm Visualizer</Text>
          <Text style={styles.description}>
            Watch how different sorting algorithms work step by step
          </Text>
        </View>

        {/* Algorithm Selector */}
        <View style={styles.algorithmSelector}>
          <Text style={styles.selectorLabel}>Choose Algorithm:</Text>
          <Select
            selectedIndex={selectedIndex}
            onSelect={handleAlgorithmSelect}
            value={ALGORITHMS[selectedAlgorithm].name}
            style={styles.select}
          >
            <SelectItem title="Bubble Sort" />
            <SelectItem title="Insertion Sort" />
            <SelectItem title="Selection Sort" />
          </Select>
        </View>

        {/* Visualizer */}
        <View style={styles.visualizerContainer}>
          <Visualizer 
            data={array} 
            highlightIndices={highlightIndices} 
          />
        </View>

        {/* Step Information */}
        <View style={styles.stepInfo}>
          <Text style={styles.stepDescription}>
            {getCurrentDescription()}
          </Text>
          {totalSteps > 0 && (
            <Text style={styles.stepCounter}>
              Step {currentStep} of {totalSteps}
            </Text>
          )}
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          {!isSorting && !sortingComplete && (
            <TouchableOpacity 
              style={[styles.button, styles.startButton]} 
              onPress={startSorting}
            >
              <Text style={styles.buttonText}>Start {ALGORITHMS[selectedAlgorithm].name}</Text>
            </TouchableOpacity>
          )}
          
          {isSorting && (
            <TouchableOpacity 
              style={[styles.button, styles.pauseButton]} 
              onPress={pauseAnimation}
            >
              <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
          )}
          
          {!isSorting && currentStep > 0 && currentStep < totalSteps && (
            <TouchableOpacity 
              style={[styles.button, styles.resumeButton]} 
              onPress={resumeAnimation}
            >
              <Text style={styles.buttonText}>Resume</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={[styles.button, styles.resetButton]} 
            onPress={resetArray}
          >
            <Text style={styles.buttonText}>Reset Array</Text>
          </TouchableOpacity>
        </View>

        {/* Algorithm Info */}
        <View style={styles.algorithmInfo}>
          <Text style={styles.algorithmTitle}>{ALGORITHMS[selectedAlgorithm].name} Algorithm</Text>
          <Text style={styles.algorithmDescription}>
            {ALGORITHMS[selectedAlgorithm].description}{'\n'}
            • Time Complexity: {ALGORITHMS[selectedAlgorithm].timeComplexity}{'\n'}
            • Space Complexity: {ALGORITHMS[selectedAlgorithm].spaceComplexity}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SortingVisualizerScreen;
