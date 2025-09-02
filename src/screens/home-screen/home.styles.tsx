import { StyleSheet } from 'react-native';
import { SPACING, FONT_SIZES, BORDER_RADIUS, ICON_SIZES, CARD_HEIGHTS } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Add space for bottom navigation
    minHeight: '100%',
  },
  
  // Welcome Section Styles
  welcomeSection: {
    paddingHorizontal: SPACING.xlarge,
    paddingTop: SPACING.xlarge,
    paddingBottom: SPACING.medium,
  },
  welcomeText: {
    // UI Kitten will handle the styling
  },

  // Progress Card Styles
  progressCard: {
    marginHorizontal: SPACING.xlarge,
    marginBottom: SPACING.xlarge,
    marginTop: SPACING.medium,
  },
  progressTitle: {
    marginBottom: SPACING.medium,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginBottom: SPACING.medium,
  },
  progressText: {
    textAlign: 'center',
    marginTop: SPACING.small,
    color: '#8F9BB3',
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.medium,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakIcon: {
    width: ICON_SIZES.small,
    height: ICON_SIZES.small,
  },

  // Continue Learning Card Styles
  continueCard: {
    marginHorizontal: SPACING.xlarge,
    marginBottom: SPACING.xlarge,
  },
  continueContent: {
    alignItems: 'center',
    paddingVertical: SPACING.medium,
  },
  continueTitle: {
    marginBottom: SPACING.small,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  continueDescription: {
    textAlign: 'center',
    marginBottom: SPACING.medium,
    color: '#8F9BB3',
  },
  continueButton: {
    borderRadius: BORDER_RADIUS.medium,
  },
  completedIcon: {
    width: ICON_SIZES.large,
    height: ICON_SIZES.large,
    marginBottom: SPACING.small,
  },

  // Navigation Grid Styles
  navigationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.xlarge,
    justifyContent: 'space-between',
    marginTop: SPACING.xlarge,
  },
  navigationItem: {
    width: '48%',
    height: CARD_HEIGHTS.large,
    marginBottom: SPACING.xlarge,
  },
  navigationItemContent: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.medium,
    paddingBottom: SPACING.medium,
  },
  navigationIcon: {
    width: ICON_SIZES.xxlarge,
    height: ICON_SIZES.xxlarge,
    marginBottom: SPACING.medium,
  },
  navigationTitle: {
    textAlign: 'center',
  },


});
