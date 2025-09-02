import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  headerLeft: {
    flex: 1,
  },
  appTitle: {
    marginBottom: 8,
  },
  welcomeText: {
    // UI Kitten will handle the styling
  },

  // Theme Card Styles
  themeCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  themeCardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    marginBottom: 16,
  },
  currentTheme: {
    marginBottom: 20,
  },
  toggleButton: {
    width: '100%',
  },

  // Learning Card Styles
  learningCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  learningCardContent: {
    alignItems: 'center',
  },
  learningIcon: {
    width: 48,
    height: 48,
    marginBottom: 16,
  },
  learningTitle: {
    textAlign: 'center',
    marginBottom: 12,
  },
  learningDescription: {
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  startButton: {
    width: '100%',
  },

  // Colors Card Styles
  colorsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  colorsTitle: {
    marginBottom: 16,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  colorBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: 12,
  },

  // Runtime Theming Demo Styles
  runtimeCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  runtimeTitle: {
    marginBottom: 12,
  },
  runtimeDescription: {
    marginBottom: 20,
    lineHeight: 20,
  },
  componentDemo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  demoButton: {
    width: '48%',
    marginBottom: 12,
  },
});
