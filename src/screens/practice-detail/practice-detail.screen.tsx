import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './practice-detail.styles';
import { Problem } from '../../data/problems.data';
import { usePracticeProgress } from '@hooks';

interface PracticeDetailScreenProps {
  navigation: any;
  route: any;
}

const PracticeDetailScreen: React.FC<PracticeDetailScreenProps> = ({ navigation, route }) => {
  const { problem }: { problem: Problem } = route.params;
  const [solution, setSolution] = useState('');
  const { isSolved, markSolved } = usePracticeProgress();

  // Handle case where problem is not provided
  if (!problem) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Problem Not Found</Text>
          <Text style={styles.errorDescription}>
            The requested problem could not be found.
          </Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleCheckSolution = () => {
    if (solution.trim() === '') {
      Alert.alert('Empty Solution', 'Please enter your solution before checking.');
      return;
    }
    
    Alert.alert(
      'Feature Coming Soon',
      'Solution checking functionality will be available in a future update!',
      [{ text: 'OK' }]
    );
  };

  const handleMarkSolved = async () => {
    if (!isSolved(problem.id)) {
      await markSolved(problem.id);
      Alert.alert('Success', 'Problem marked as solved! 🎉');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '#4CAF50';
      case 'intermediate':
        return '#FF9800';
      case 'advanced':
        return '#F44336';
      default:
        return '#666';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Problem Header */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{problem.title}</Text>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(problem.difficulty) }]}>
              <Text style={styles.difficultyText}>{problem.difficulty.toUpperCase()}</Text>
            </View>
          </View>
          
          <View style={styles.metaInfo}>
            <Text style={styles.category}>{problem.category}</Text>
            <Text style={styles.timeLimit}>⏱️ {problem.timeLimit} min</Text>
          </View>
        </View>

        {/* Problem Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Problem Statement</Text>
          <Text style={styles.description}>{problem.statement}</Text>
        </View>

        {/* Solution Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Solution</Text>
          <TextInput
            style={styles.solutionInput}
            placeholder="Enter your solution here..."
            placeholderTextColor="#999"
            value={solution}
            onChangeText={setSolution}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCheckSolution}>
            <Text style={styles.actionButtonText}>Check Solution</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.actionButton, 
              isSolved(problem.id) ? styles.solvedButton : styles.markSolvedButton
            ]} 
            onPress={handleMarkSolved}
            disabled={isSolved(problem.id)}
          >
            <Text style={[
              styles.actionButtonText,
              isSolved(problem.id) ? styles.solvedButtonText : styles.markSolvedButtonText
            ]}>
              {isSolved(problem.id) ? 'Solved ✅' : 'Mark Solved'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PracticeDetailScreen;
