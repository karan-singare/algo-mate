import React, { useState, useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Layout, 
  Text, 
  Input, 
  ButtonGroup,
  Icon
} from '@ui-kitten/components';
import { TopicCard } from '@components';
import { lessons } from '@data';
import { useLessonProgress } from '@hooks';
import { styles } from './lessons.styles';

interface LessonsScreenProps {
  navigation: any;
}

const DIFFICULTY_OPTIONS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const LessonsScreen: React.FC<LessonsScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficultyIndex, setSelectedDifficultyIndex] = useState(0);
  const { isCompleted } = useLessonProgress();

  const filteredLessons = useMemo(() => {
    let filtered = lessons;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(lesson =>
        lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lesson.topic.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by difficulty
    const selectedDifficulty = DIFFICULTY_OPTIONS[selectedDifficultyIndex];
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(lesson =>
        lesson.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
      );
    }

    return filtered;
  }, [searchQuery, selectedDifficultyIndex]);

  const handleLessonPress = (lesson: any) => {
    navigation.navigate('LessonDetail', { lessonId: lesson.id });
  };

  const renderLesson = ({ item }: { item: any }) => {
    const completed = isCompleted(item.id);
    
    return (
      <View style={styles.lessonCardContainer}>
        <TopicCard
          title={item.title}
          topic={item.topic}
          difficulty={item.difficulty}
          onPress={() => handleLessonPress(item)}
        />
        {completed && (
          <View style={styles.completedOverlay}>
            <Icon 
              name="checkmark-circle" 
              style={styles.completedIcon}
              fill="#4CAF50"
            />
          </View>
        )}
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon 
        name="search-outline" 
        style={styles.emptyIcon}
        fill="#8F9BB3"
      />
      <Text category="h6" style={styles.emptyTitle}>
        No lessons found
      </Text>
      <Text category="s1" style={styles.emptyDescription}>
        Try adjusting your search or filter criteria
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text category="h4" style={styles.title}>
            DSA Lessons
          </Text>
          <Text category="s1" style={styles.description}>
            Master Data Structures and Algorithms through interactive lessons
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Input
            placeholder="Search lessons..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            accessoryLeft={(props) => (
              <Icon {...props} name="search-outline" />
            )}
            style={styles.searchInput}
          />
        </View>

        {/* Difficulty Filter */}
        <View style={styles.filterContainer}>
          <Text category="s1" style={styles.filterLabel}>
            Difficulty:
          </Text>
          <ButtonGroup
            style={styles.difficultyFilter}
            onSelect={setSelectedDifficultyIndex}
          >
            {DIFFICULTY_OPTIONS.map((option) => (
              <Text key={option} category="c1">
                {option}
              </Text>
            ))}
          </ButtonGroup>
        </View>

        {/* Results Count */}
        <View style={styles.resultsContainer}>
          <Text category="c1" style={styles.resultsText}>
            {filteredLessons.length} lesson{filteredLessons.length !== 1 ? 's' : ''} found
          </Text>
        </View>

        {/* Lessons List */}
        <FlatList
          data={filteredLessons}
          renderItem={renderLesson}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
        />
      </Layout>
    </SafeAreaView>
  );
};

export default LessonsScreen;
