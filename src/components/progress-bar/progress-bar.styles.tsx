import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E4E9F2',
    borderRadius: 3,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3366FF',
    borderRadius: 3,
    transition: 'width 0.3s ease',
  },
  progressText: {
    color: '#8F9BB3',
    fontWeight: '500',
    minWidth: 80,
    textAlign: 'right',
  },
});
