import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Layout, 
  Text, 
  Card, 
  Icon,
  Button,
  useTheme as useUIKittenTheme
} from '@ui-kitten/components';
import { useAppTheme } from '../../theme';
import { useLessonProgress } from '@hooks';
import { lessons } from '@data/lessons.data';
import { ProgressBar } from '@components';
import { styles } from './home.styles';
import { COLORS, ROUTES } from '../../constants';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { themeName, toggleTheme } = useAppTheme();

  // Main JSX return on top
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <WelcomeSection />
        <ProgressCard />
        <ContinueLearningCard navigation={navigation} />
        <NavigationGrid menuItems={getMenuItems(navigation)} />
      </ScrollView>
    </SafeAreaView>
  );

  // Functions defined below return
  function getMenuItems(navigation: any) {
    return [
      {
        title: 'Lessons',
        icon: 'book-outline',
        onPress: () => navigation.navigate(ROUTES.LEARN_TAB),
      },
      {
        title: 'Practice',
        icon: 'checkmark-circle-outline',
        onPress: () => navigation.navigate(ROUTES.PRACTICE_TAB),
      },
      {
        title: 'Quiz',
        icon: 'question-mark-circle-outline',
        onPress: () => navigation.navigate(ROUTES.QUIZ_TAB),
      },
      {
        title: 'Profile',
        icon: 'person-outline',
        onPress: () => navigation.navigate(ROUTES.PROFILE_TAB),
      },
      {
        title: 'Sorting Visualizer',
        icon: 'bar-chart-outline',
        onPress: () => navigation.navigate(ROUTES.SORTING_VISUALIZER),
      },
      {
        title: 'Tree Visualizer',
        icon: 'layers-outline',
        onPress: () => navigation.navigate(ROUTES.TREE_VISUALIZER),
      },
      {
        title: 'Graph Visualizer',
        icon: 'share-outline',
        onPress: () => navigation.navigate(ROUTES.GRAPH_VISUALIZER),
      },
    ];
  }
};

// Helper components placed at bottom after main component
function WelcomeSection() {
  return (
    <View style={styles.welcomeSection}>
      <Text category="h6" style={styles.welcomeText}>Welcome, Karan!</Text>
    </View>
  );
}

function ProgressCard() {
  const uiKittenTheme = useUIKittenTheme();
  const { completedLessons } = useLessonProgress();
  
  const totalLessons = lessons.length;
  const completed = completedLessons.length;
  const progressPercentage = totalLessons > 0 ? (completed / totalLessons) * 100 : 0;
  
  return (
    <Card style={styles.progressCard}>
      <Text category="h6" style={styles.progressTitle}>Learning Progress</Text>
      
      <View style={styles.progressContainer}>
        <ProgressBar value={completed} total={totalLessons} />
        <Text category="s1" style={styles.progressText}>
          {completed} of {totalLessons} Lessons Completed
        </Text>
      </View>
      
      <View style={styles.progressRow}>
        <Text category="s1">Streak</Text>
        <View style={styles.streakContainer}>
          <Icon name="flash-outline" fill={uiKittenTheme['color-warning-500']} style={styles.streakIcon} />
        </View>
      </View>
    </Card>
  );
}

function ContinueLearningCard({ navigation }: { navigation: any }) {
  const { completedLessons, isCompleted } = useLessonProgress();
  
  // Find the first lesson that's not completed
  const nextLesson = lessons.find(lesson => !isCompleted(lesson.id));
  
  if (!nextLesson) {
    // All lessons completed
    return (
      <Card style={styles.continueCard}>
        <View style={styles.continueContent}>
          <Icon name="checkmark-circle" style={styles.completedIcon} fill="#4CAF50" />
          <Text category="h6" style={styles.continueTitle}>All Lessons Completed!</Text>
          <Text category="s1" style={styles.continueDescription}>
            Great job! You've completed all available lessons. Check back for new content soon!
          </Text>
        </View>
      </Card>
    );
  }
  
  return (
    <Card style={styles.continueCard}>
      <View style={styles.continueContent}>
        <Text category="h6" style={styles.continueTitle}>Continue Learning</Text>
        <Text category="s1" style={styles.continueDescription}>
          Next: {nextLesson.title}
        </Text>
        <Button
          size="small"
          status="primary"
          onPress={() => navigation.navigate('LessonDetail', { lessonId: nextLesson.id })}
          style={styles.continueButton}
        >
          Go to Lesson
        </Button>
      </View>
    </Card>
  );
}

function NavigationItem({ item, index }: { item: any; index: number }) {
  const uiKittenTheme = useUIKittenTheme();
  
  return (
    <Card
      key={index}
      style={styles.navigationItem}
      onPress={item.onPress}
    >
      <View style={styles.navigationItemContent}>
        <Icon
          name={item.icon}
          style={styles.navigationIcon}
          fill={uiKittenTheme['color-primary-500']}
        />
        <Text category="s1" style={styles.navigationTitle}>{item.title}</Text>
      </View>
    </Card>
  );
}

function NavigationGrid({ menuItems }: { menuItems: any[] }) {
  return (
    <View style={styles.navigationGrid}>
      {menuItems.map((item, index) => (
        <NavigationItem key={index} item={item} index={index} />
      ))}
    </View>
  );
}

export default HomeScreen;