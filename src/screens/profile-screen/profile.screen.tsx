import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './profile.styles';
import { StorageUtil } from '@utils/storage.util';
import { useLessonProgress, useQuizProgress, usePracticeProgress } from '@hooks';
import { lessons } from '@data/lessons.data';
import { problems } from '@data/problems.data';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { completedLessons } = useLessonProgress();
  const { lastScore } = useQuizProgress();
  const { solved } = usePracticeProgress();
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Calculate real stats from hooks
  const userStats = {
    lessonsCompleted: completedLessons.length,
    problemsSolved: solved.length,
    quizScore: lastScore > 0 ? Math.round((lastScore / 3) * 100) : 0, // Assuming 3 questions
    totalLessons: lessons.length,
    totalProblems: problems.length,
    totalQuizzes: 1,
  };

  const handleResetProgress = () => {
    Alert.alert(
      'Reset All Progress',
      'Are you sure you want to reset all your progress? This will clear:\n• Completed lessons\n• Quiz scores\n• Solved problems\n\nThis action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              // Clear all progress data
              await StorageUtil.delete('completed_lessons');
              await StorageUtil.delete('quiz_score');
              await StorageUtil.delete('solved_problems');
              
              // Refresh UI by updating the refresh key
              setRefreshKey(prev => prev + 1);
              
              Alert.alert('Progress Reset', 'All your progress has been reset successfully.');
            } catch (error) {
              console.error('Error resetting progress:', error);
              Alert.alert('Error', 'Failed to reset progress. Please try again.');
            }
          },
        },
      ]
    );
  };

  const getProgressPercentage = (completed: number, total: number) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#F44336';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* User Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>K</Text>
          </View>
          <Text style={styles.userName}>Karan's Progress</Text>
          <Text style={styles.userSubtitle}>DSA Learning Journey</Text>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Learning Statistics</Text>
          
          {/* Lessons Progress */}
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statTitle}>Lessons Completed</Text>
              <Text style={styles.statValue}>
                {userStats.lessonsCompleted}/{userStats.totalLessons}
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${getProgressPercentage(userStats.lessonsCompleted, userStats.totalLessons)}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {getProgressPercentage(userStats.lessonsCompleted, userStats.totalLessons)}% Complete
            </Text>
          </View>

          {/* Problems Solved */}
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statTitle}>Problems Solved</Text>
              <Text style={styles.statValue}>
                {userStats.problemsSolved}/{userStats.totalProblems}
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${getProgressPercentage(userStats.problemsSolved, userStats.totalProblems)}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {getProgressPercentage(userStats.problemsSolved, userStats.totalProblems)}% Complete
            </Text>
          </View>

          {/* Quiz Score */}
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statTitle}>Average Quiz Score</Text>
              <Text style={[styles.statValue, { color: getScoreColor(userStats.quizScore) }]}>
                {userStats.quizScore}%
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${userStats.quizScore}%`,
                    backgroundColor: getScoreColor(userStats.quizScore)
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {userStats.quizScore >= 80 ? 'Excellent!' : userStats.quizScore >= 60 ? 'Good!' : 'Keep practicing!'}
            </Text>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsContainer}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <View style={styles.achievementCard}>
            <Text style={styles.achievementIcon}>🏆</Text>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>First Lesson Completed</Text>
              <Text style={styles.achievementDescription}>Completed your first DSA lesson</Text>
            </View>
          </View>
          <View style={styles.achievementCard}>
            <Text style={styles.achievementIcon}>💡</Text>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>Problem Solver</Text>
              <Text style={styles.achievementDescription}>Solved your first coding problem</Text>
            </View>
          </View>
          <View style={styles.achievementCard}>
            <Text style={styles.achievementIcon}>📚</Text>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>Knowledge Seeker</Text>
              <Text style={styles.achievementDescription}>Completed 3+ lessons</Text>
            </View>
          </View>
        </View>

        {/* Reset Progress Button */}
        <TouchableOpacity style={styles.resetButton} onPress={handleResetProgress}>
          <Text style={styles.resetButtonText}>Reset All Progress</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
