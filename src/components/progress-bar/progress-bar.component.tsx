import React from 'react';
import { View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { styles } from './progress-bar.styles';

interface ProgressBarProps {
  value: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, total }) => {
  const progressPercentage = total > 0 ? (value / total) * 100 : 0;

  return (
    <Layout style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${progressPercentage}%` }
            ]} 
          />
        </View>
        <Text category="c2" style={styles.progressText}>
          {value} / {total} lessons
        </Text>
      </View>
    </Layout>
  );
};

export default ProgressBar;
