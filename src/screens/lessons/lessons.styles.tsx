import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 4,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222B45',
  },
  description: {
    color: '#8F9BB3',
    lineHeight: 20,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    borderRadius: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  filterLabel: {
    marginRight: 12,
    color: '#222B45',
    fontWeight: '600',
  },
  difficultyFilter: {
    flex: 1,
    borderRadius: 8,
  },
  resultsContainer: {
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  resultsText: {
    color: '#8F9BB3',
    fontStyle: 'italic',
  },
  listContainer: {
    paddingBottom: 20,
  },
  lessonCardContainer: {
    position: 'relative',
  },
  completedOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 4,
  },
  completedIcon: {
    width: 20,
    height: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    marginBottom: 8,
    color: '#222B45',
    textAlign: 'center',
  },
  emptyDescription: {
    color: '#8F9BB3',
    textAlign: 'center',
    lineHeight: 20,
  },
});
