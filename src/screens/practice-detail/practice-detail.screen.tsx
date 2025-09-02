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

interface PracticeDetailScreenProps {
  navigation: any;
  route: any;
}

const PracticeDetailScreen: React.FC<PracticeDetailScreenProps> = ({ navigation, route }) => {
  const { problem }: { problem: Problem } = route.params;
  const [solution, setSolution] = useState('');

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

        {/* Check Solution Button */}
        <TouchableOpacity style={styles.checkButton} onPress={handleCheckSolution}>
          <Text style={styles.checkButtonText}>Check Solution</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PracticeDetailScreen;
