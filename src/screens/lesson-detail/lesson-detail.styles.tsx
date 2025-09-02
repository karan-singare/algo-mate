import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  
  // Error State
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorIcon: {
    width: 64,
    height: 64,
    marginBottom: 16,
  },
  errorTitle: {
    marginBottom: 8,
    color: '#222B45',
    textAlign: 'center',
  },
  errorDescription: {
    color: '#8F9BB3',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  backButton: {
    minWidth: 120,
  },
  
  // Header Card
  headerCard: {
    marginBottom: 16,
  },
  header: {
    paddingVertical: 8,
  },
  title: {
    fontWeight: 'bold',
    color: '#222B45',
    marginBottom: 16,
    textAlign: 'center',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  topicBadge: {
    backgroundColor: '#3366FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  completedBadge: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontWeight: '600',
  },
  completedBadgeText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  completedIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  
  // Content Cards
  contentCard: {
    marginBottom: 16,
  },
  examplesCard: {
    marginBottom: 16,
  },
  codeCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#222B45',
    marginBottom: 12,
  },
  lessonContent: {
    color: '#222B45',
    lineHeight: 24,
  },
  
  // Examples
  examplesList: {
    backgroundColor: 'transparent',
  },
  exampleItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  exampleNumber: {
    color: '#3366FF',
    fontWeight: 'bold',
    marginRight: 8,
    marginTop: 2,
    minWidth: 20,
  },
  exampleText: {
    color: '#222B45',
    flex: 1,
    lineHeight: 20,
  },
  
  // Code Section
  codeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  languageToggle: {
    flexDirection: 'row',
    gap: 8,
  },
  languageButton: {
    borderRadius: 8,
    minWidth: 60,
  },
  codeContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#2D3748',
  },
  syntaxHighlighter: {
    margin: 0,
    padding: 16,
    fontSize: 14,
    lineHeight: 20,
  },
  
  // Action Buttons
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
  },
});