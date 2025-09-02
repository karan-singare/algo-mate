import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';
import { styles } from './tree-visualizer.styles.tsx';

interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

interface TreeVisualizerScreenProps {
  navigation: any;
}

interface NodePosition {
  x: number;
  y: number;
  value: number;
}

const TreeVisualizerScreen: React.FC<TreeVisualizerScreenProps> = ({ navigation }) => {
  // Hardcoded binary tree
  const [tree] = useState<TreeNode>({
    value: 10,
    left: { value: 5 },
    right: { value: 15 }
  });

  const [highlightedNodes, setHighlightedNodes] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [traversalType, setTraversalType] = useState<string>('');
  
  const animationRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const traversalStepsRef = useRef<number[]>([]);

  // Tree layout configuration
  const NODE_RADIUS = 25;
  const LEVEL_HEIGHT = 80;
  const NODE_SPACING = 120;
  const TREE_WIDTH = 300;
  const TREE_HEIGHT = 200;

  // Calculate node positions for the tree
  const calculateNodePositions = (root: TreeNode, level: number = 0, offset: number = 0): NodePosition[] => {
    const positions: NodePosition[] = [];
    const x = TREE_WIDTH / 2 + offset;
    const y = 50 + level * LEVEL_HEIGHT;

    positions.push({ x, y, value: root.value });

    if (root.left) {
      const leftOffset = offset - NODE_SPACING / (level + 1);
      positions.push(...calculateNodePositions(root.left, level + 1, leftOffset));
    }

    if (root.right) {
      const rightOffset = offset + NODE_SPACING / (level + 1);
      positions.push(...calculateNodePositions(root.right, level + 1, rightOffset));
    }

    return positions;
  };

  // Get all node positions
  const nodePositions = calculateNodePositions(tree);

  // Generate traversal steps
  const generateTraversalSteps = (root: TreeNode, type: 'preorder' | 'inorder' | 'postorder'): number[] => {
    const steps: number[] = [];

    const traverse = (node: TreeNode) => {
      if (type === 'preorder') {
        steps.push(node.value);
      }
      
      if (node.left) {
        traverse(node.left);
      }
      
      if (type === 'inorder') {
        steps.push(node.value);
      }
      
      if (node.right) {
        traverse(node.right);
      }
      
      if (type === 'postorder') {
        steps.push(node.value);
      }
    };

    traverse(root);
    return steps;
  };

  // Start traversal animation
  const startTraversal = (type: 'preorder' | 'inorder' | 'postorder') => {
    if (isAnimating) return;

    setIsAnimating(true);
    setHighlightedNodes([]);
    setCurrentStep(0);
    setTraversalType(type);

    const steps = generateTraversalSteps(tree, type);
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

    const currentValue = traversalStepsRef.current[stepIndex];
    setHighlightedNodes(prev => [...prev, currentValue]);
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
    
    setHighlightedNodes([]);
    setIsAnimating(false);
    setCurrentStep(0);
    setTotalSteps(0);
    setTraversalType('');
    traversalStepsRef.current = [];
  };

  // Render tree edges
  const renderEdges = () => {
    const edges: React.ReactElement[] = [];
    
    const addEdges = (node: TreeNode, parentX?: number, parentY?: number) => {
      const nodePos = nodePositions.find(pos => pos.value === node.value);
      if (!nodePos) return;

      // Draw edge from parent to current node
      if (parentX !== undefined && parentY !== undefined) {
        edges.push(
          <Line
            key={`edge-${parentX}-${parentY}-${nodePos.x}-${nodePos.y}`}
            x1={parentX}
            y1={parentY}
            x2={nodePos.x}
            y2={nodePos.y}
            stroke="#666"
            strokeWidth="2"
          />
        );
      }

      // Recursively add edges for children
      if (node.left) {
        addEdges(node.left, nodePos.x, nodePos.y);
      }
      if (node.right) {
        addEdges(node.right, nodePos.x, nodePos.y);
      }
    };

    addEdges(tree);
    return edges;
  };

  // Render tree nodes
  const renderNodes = () => {
    return nodePositions.map((pos, index) => {
      const isHighlighted = highlightedNodes.includes(pos.value);
      const fillColor = isHighlighted ? '#FF6B6B' : '#4ECDC4';
      const strokeColor = isHighlighted ? '#FF4444' : '#3BA99C';

      return (
        <React.Fragment key={`node-${pos.value}-${index}`}>
          <Circle
            cx={pos.x}
            cy={pos.y}
            r={NODE_RADIUS}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="2"
          />
          <SvgText
            x={pos.x}
            y={pos.y + 5}
            fontSize="14"
            fontWeight="bold"
            fill="#FFFFFF"
            textAnchor="middle"
          >
            {pos.value}
          </SvgText>
        </React.Fragment>
      );
    });
  };

  const getTraversalDescription = () => {
    if (!traversalType) return 'Select a traversal type to begin';
    if (isAnimating) return `Traversing ${traversalType}...`;
    if (currentStep > 0 && currentStep === totalSteps) return `${traversalType} traversal complete!`;
    return `Ready to start ${traversalType} traversal`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Binary Tree Visualizer</Text>
          <Text style={styles.description}>
            Visualize tree traversal algorithms step by step
          </Text>
        </View>

        {/* Tree Visualization */}
        <View style={styles.treeContainer}>
          <Svg width={TREE_WIDTH} height={TREE_HEIGHT} style={styles.tree}>
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
        </View>

        {/* Traversal Buttons */}
        <View style={styles.controls}>
          <TouchableOpacity 
            style={[styles.button, styles.preorderButton]} 
            onPress={() => startTraversal('preorder')}
            disabled={isAnimating}
          >
            <Text style={styles.buttonText}>Preorder</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.inorderButton]} 
            onPress={() => startTraversal('inorder')}
            disabled={isAnimating}
          >
            <Text style={styles.buttonText}>Inorder</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.postorderButton]} 
            onPress={() => startTraversal('postorder')}
            disabled={isAnimating}
          >
            <Text style={styles.buttonText}>Postorder</Text>
          </TouchableOpacity>
        </View>

        {/* Reset Button */}
        <View style={styles.resetContainer}>
          <TouchableOpacity 
            style={styles.resetButton} 
            onPress={resetVisualization}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Algorithm Info */}
        <View style={styles.algorithmInfo}>
          <Text style={styles.algorithmTitle}>Tree Traversal Algorithms</Text>
          <Text style={styles.algorithmDescription}>
            <Text style={styles.bold}>Preorder:</Text> Root → Left → Right{'\n'}
            <Text style={styles.bold}>Inorder:</Text> Left → Root → Right{'\n'}
            <Text style={styles.bold}>Postorder:</Text> Left → Right → Root{'\n\n'}
            <Text style={styles.bold}>Time Complexity:</Text> O(n) where n is the number of nodes{'\n'}
            <Text style={styles.bold}>Space Complexity:</Text> O(h) where h is the height of the tree
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TreeVisualizerScreen;
