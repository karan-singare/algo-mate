import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Layout, 
  Text, 
  Button, 
  Card, 
  Icon,
  useTheme as useUIKittenTheme
} from '@ui-kitten/components';
import { useAppTheme } from '../../theme';
import { styles } from './theme-demo.styles';
import { ROUTES } from '../../constants';

interface ThemeDemoScreenProps {
  navigation: any;
}

const ThemeDemoScreen: React.FC<ThemeDemoScreenProps> = ({ navigation }) => {
  const { themeName, toggleTheme } = useAppTheme();
  const uiKittenTheme = useUIKittenTheme();

  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.container} level="1">
        <ScrollView contentContainerStyle={styles.scrollContent}>

          {/* Theme Toggle Card */}
          <Card style={styles.themeCard}>
            <View style={styles.themeCardContent}>
              <Text category="h6" style={styles.cardTitle}>Theme Settings</Text>
              <Text category="s1" style={styles.currentTheme}>
                Current Theme: {themeName === 'light' ? 'Light' : 'Dark'}
              </Text>
              <Button
                style={styles.toggleButton}
                accessoryLeft={(props) => (
                  <Icon 
                    {...props} 
                    name={themeName === 'light' ? 'moon-outline' : 'sun-outline'} 
                  />
                )}
                onPress={toggleTheme}
              >
                Switch to {themeName === 'light' ? 'Dark' : 'Light'} Theme
              </Button>
            </View>
          </Card>

          {/* Learning Card */}
          <Card style={styles.learningCard}>
            <View style={styles.learningCardContent}>
              <Icon 
                name="book-outline" 
                style={styles.learningIcon}
                fill={uiKittenTheme['color-primary-500']}
              />
              <Text category="h6" style={styles.learningTitle}>
                Learn Data Structures & Algorithms
              </Text>
              <Text category="s1" style={styles.learningDescription}>
                Master the fundamentals of computer science with our comprehensive 
                learning platform. Practice coding problems, take quizzes, and 
                track your progress.
              </Text>
              <Button
                style={styles.startButton}
                accessoryRight={(props) => <Icon {...props} name="arrow-forward-outline" />}
                onPress={() => navigation.navigate(ROUTES.LEARN_TAB)}
              >
                Start Learning
              </Button>
            </View>
          </Card>

          {/* Theme Colors Demo */}
          <Card style={styles.colorsCard}>
            <Text category="h6" style={styles.colorsTitle}>Theme Colors</Text>
            <View style={styles.colorRow}>
              <View style={[styles.colorBox, { backgroundColor: uiKittenTheme['color-primary-500'] }]} />
              <Text category="s1">Primary</Text>
            </View>
            <View style={styles.colorRow}>
              <View style={[styles.colorBox, { backgroundColor: uiKittenTheme['color-success-500'] }]} />
              <Text category="s1">Success</Text>
            </View>
            <View style={styles.colorRow}>
              <View style={[styles.colorBox, { backgroundColor: uiKittenTheme['color-warning-500'] }]} />
              <Text category="s1">Warning</Text>
            </View>
            <View style={styles.colorRow}>
              <View style={[styles.colorBox, { backgroundColor: uiKittenTheme['color-danger-500'] }]} />
              <Text category="s1">Danger</Text>
            </View>
          </Card>

          {/* Runtime Theming Example */}
          <Card style={styles.runtimeCard}>
            <Text category="h6" style={styles.runtimeTitle}>Runtime Theming Example</Text>
            <Text category="s1" style={styles.runtimeDescription}>
              This demonstrates how UI Kitten's runtime theming works. 
              The colors and styles automatically adapt when you switch themes.
            </Text>
            <View style={styles.componentDemo}>
              <Button 
                status="primary" 
                style={styles.demoButton}
                accessoryLeft={(props) => <Icon {...props} name="star-outline" />}
              >
                Primary Button
              </Button>
              <Button 
                status="success" 
                style={styles.demoButton}
                accessoryLeft={(props) => <Icon {...props} name="checkmark-outline" />}
              >
                Success Button
              </Button>
              <Button 
                status="warning" 
                style={styles.demoButton}
                accessoryLeft={(props) => <Icon {...props} name="alert-triangle-outline" />}
              >
                Warning Button
              </Button>
            </View>
          </Card>
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
};

export default ThemeDemoScreen;
