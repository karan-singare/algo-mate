import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Layout, 
  Text, 
  Card, 
  Icon,
  useTheme as useUIKittenTheme
} from '@ui-kitten/components';
import { useAppTheme } from '../../theme';
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
  
  return (
    <Card style={styles.progressCard}>
      <View style={styles.progressRow}>
        <Text category="s1">Lessons Completed</Text>
        <Text category="h6" status="primary">3</Text>
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