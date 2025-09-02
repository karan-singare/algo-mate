import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './practice.styles';
import { problems, Problem } from '../../data/problems.data';

interface PracticeScreenProps {
  navigation: any;
}

const PracticeScreen: React.FC<PracticeScreenProps> = ({ navigation }) => {
  const handleProblemPress = (problem: Problem) => {
    navigation.navigate('PracticeDetail', { problem });
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

  const renderProblem = ({ item }: { item: Problem }) => (
    <TouchableOpacity
      style={styles.problemCard}
      onPress={() => handleProblemPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.problemHeader}>
        <Text style={styles.problemTitle}>{item.title}</Text>
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
          <Text style={styles.difficultyText}>{item.difficulty.toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={styles.problemDescription} numberOfLines={3}>
        {item.description}
      </Text>
      
      <View style={styles.problemFooter}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.timeLimit}>⏱️ {item.timeLimit} min</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Practice Problems</Text>
        <Text style={styles.description}>
          Solve coding problems and improve your algorithmic thinking
        </Text>
      </View>
      
      <FlatList
        data={problems}
        renderItem={renderProblem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default PracticeScreen;
