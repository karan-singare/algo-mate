import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    marginVertical: 4,
    marginHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  rightSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 4,
    fontWeight: '600',
  },
  topic: {
    marginBottom: 8,
    opacity: 0.7,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 10,
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
});
