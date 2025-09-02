import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';
import { styles } from './graph-visualizer.styles';

interface GraphVisualizerScreenProps {
  navigation: any;
}

interface Node {
  id: number;
  x: number;
  y: number;
  label: string;
}

interface Edge {
  from: number;
  to: number;
}

const GraphVisualizerScreen: React.FC<GraphVisualizerScreenProps> = ({ navigation }) => {
  // Hardcoded graph with 5 nodes
  const [nodes] = useState<Node[]>([
    { id: 0, x: 100, y: 80, label: 'A' },
    { id: 1, x: 200, y: 80, label: 'B' },
    { id: 2, x: 300, y: 80, label: 'C' },
    { id: 3, x: 150, y: 160, label: 'D' },
    { id: 4, x: 250, y: 160, label: 'E' }
  ]);

  // Hardcoded edges (undirected graph)
  const [edges] = useState<Edge[]>([
    { from: 0, to: 1 }, // A - B
    { from: 1, to: 2 }, // B - C
    { from: 0, to: 3 }, // A - D
    { from: 1, to: 3 }, // B - D
    { from: 1, to: 4 }, // B - E
    { from: 2, to: 4 }, // C - E
    { from: 3, to: 4 }  // D - E
  ]);

  const [visitedNodes, setVisitedNodes] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [traversalType, setTraversalType] = useState<string>('');
  
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const traversalStepsRef = useRef<number[]>([]);

  // Graph layout configuration
  const NODE_RADIUS = 20;
  const GRAPH_WIDTH = 400;
  const GRAPH_HEIGHT = 240;

  // BFS implementation
  const generateBFSSteps = (startNode: number): number[] => {
    const steps: number[] = [];
    const visited = new Set<number>();
    const queue: number[] = [startNode];
    
    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      
      if (!visited.has(currentNode)) {
        visited.add(currentNode);
        steps.push(currentNode);
        
        // Add unvisited neighbors to queue
        const neighbors = edges
          .filter(edge => edge.from === currentNode || edge.to === currentNode)
          .map(edge => edge.from === currentNode ? edge.to : edge.from)
          .filter(neighbor => !visited.has(neighbor));
        
        queue.push(...neighbors);
      }
    }
    
    return steps;
  };

  // DFS implementation
  const generateDFSSteps = (startNode: number): number[] => {
    const steps: number[] = [];
    const visited = new Set<number>();
    
    const dfs = (node: number) => {
      if (visited.has(node)) return;
      
      visited.add(node);
      steps.push(node);
      
      // Get neighbors and recursively visit them
      const neighbors = edges
        .filter(edge => edge.from === node || edge.to === node)
        .map(edge => edge.from === node ? edge.to : edge.from)
        .filter(neighbor => !visited.has(neighbor));
      
      for (const neighbor of neighbors) {
        dfs(neighbor);
      }
    };
    
    dfs(startNode);
    return steps;
  };

  // Start traversal animation
  const startTraversal = (type: 'bfs' | 'dfs') => {
    if (isAnimating) return;

    setIsAnimating(true);
    setVisitedNodes([]);
    setCurrentStep(0);
    setTraversalType(type.toUpperCase());

    const startNode = 0; // Start from node A
    const steps = type === 'bfs' ? generateBFSSteps(startNode) : generateDFSSteps(startNode);
    
    traversalStepsRef.current = steps;
    setTotalSteps(steps.length);

    animateStep(0);
  };

  // Animate traversal steps
  const animateStep = (stepIndex: number) => {
    if (stepIndex >= traversalStepsRef.current.length) {
      setIsAnimating(false);
      return;
    }

    const currentNode = traversalStepsRef.current[stepIndex];
    setVisitedNodes(prev => [...prev, currentNode]);
    setCurrentStep(stepIndex + 1);

    // Schedule next step
    animationRef.current = setTimeout(() => {
      animateStep(stepIndex + 1);
    }, 800);
  };

  // Reset visualization
  const resetVisualization = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
    
    setVisitedNodes([]);
    setIsAnimating(false);
    setCurrentStep(0);
    setTotalSteps(0);
    setTraversalType('');
    traversalStepsRef.current = [];
  };

  // Render graph edges
  const renderEdges = () => {
    return edges.map((edge, index) => {
      const fromNode = nodes.find(n => n.id === edge.from);
      const toNode = nodes.find(n => n.id === edge.to);
      
      if (!fromNode || !toNode) return null;

      return (
        <Line
          key={`edge-${index}`}
          x1={fromNode.x}
          y1={fromNode.y}
          x2={toNode.x}
          y2={toNode.y}
          stroke="#666"
          strokeWidth="2"
        />
      );
    });
  };

  // Render graph nodes
  const renderNodes = () => {
    return nodes.map((node) => {
      const isVisited = visitedNodes.includes(node.id);
      const fillColor = isVisited ? '#FF6B6B' : '#4ECDC4';
      const strokeColor = isVisited ? '#FF4444' : '#3BA99C';

      return (
        <React.Fragment key={`node-${node.id}`}>
          <Circle
            cx={node.x}
            cy={node.y}
            r={NODE_RADIUS}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="2"
          />
          <SvgText
            x={node.x}
            y={node.y + 5}
            fontSize="12"
            fontWeight="bold"
            fill="#FFFFFF"
            textAnchor="middle"
          >
            {node.label}
          </SvgText>
        </React.Fragment>
      );
    });
  };

  const getTraversalDescription = () => {
    if (!traversalType) return 'Select a traversal algorithm to begin';
    if (isAnimating) return `Traversing ${traversalType}...`;
    if (currentStep > 0 && currentStep === totalSteps) return `${traversalType} traversal complete!`;
    return `Ready to start ${traversalType} traversal`;
  };

  const getTraversalOrder = () => {
    if (visitedNodes.length === 0) return '';
    return visitedNodes.map(nodeId => nodes.find(n => n.id === nodeId)?.label).join(' → ');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Graph Traversal Visualizer</Text>
          <Text style={styles.description}>
            Visualize BFS and DFS algorithms on an undirected graph
          </Text>
        </View>

        {/* Graph Visualization */}
        <View style={styles.graphContainer}>
          <Svg width={GRAPH_WIDTH} height={GRAPH_HEIGHT} style={styles.graph}>
            {renderEdges()}
            {renderNodes()}
          </Svg>
        </View>

        {/* Traversal Info */}
        <View style={styles.traversalInfo}>
          <Text style={styles.traversalDescription}>
            {getTraversalDescription()}
          </Text>
          {totalSteps > 0 && (
            <Text style={styles.stepCounter}>
              Step {currentStep} of {totalSteps}
            </Text>
          )}
          {visitedNodes.length > 0 && (
            <Text style={styles.traversalOrder}>
              Order: {getTraversalOrder()}
            </Text>
          )}
        </View>

        {/* Traversal Buttons */}
        <View style={styles.controls}>
          <TouchableOpacity 
            style={[styles.button, styles.bfsButton]} 
            onPress={() => startTraversal('bfs')}
            disabled={isAnimating}
          >
            <Text style={styles.buttonText}>BFS</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.dfsButton]} 
            onPress={() => startTraversal('dfs')}
            disabled={isAnimating}
          >
            <Text style={styles.buttonText}>DFS</Text>
          </TouchableOpacity>
        </View>

        {/* Reset Button */}
        <View style={styles.resetContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.resetButton]} 
            onPress={resetVisualization}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Algorithm Info */}
        <View style={styles.algorithmInfo}>
          <Text style={styles.algorithmTitle}>Graph Traversal Algorithms</Text>
          <Text style={styles.algorithmDescription}>
            <Text style={styles.bold}>BFS (Breadth-First Search):</Text> Explores all neighbors at current level before moving to next level{'\n'}
            <Text style={styles.bold}>DFS (Depth-First Search):</Text> Explores as far as possible along each branch before backtracking{'\n\n'}
            <Text style={styles.bold}>Time Complexity:</Text> O(V + E) where V is vertices and E is edges{'\n'}
            <Text style={styles.bold}>Space Complexity:</Text> O(V) for visited set and queue/stack
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GraphVisualizerScreen;
