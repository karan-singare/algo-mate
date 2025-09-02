import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Card, Text, Icon } from '@ui-kitten/components';
import { styles } from './topic-card.styles';

interface TopicCardProps {
  title: string;
  topic?: string;
  difficulty?: string;
  progress?: number;
  onPress: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ 
  title, 
  topic, 
  difficulty, 
  progress, 
  onPress 
}) => {
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return '#4CAF50';
      case 'intermediate':
        return '#FF9800';
      case 'advanced':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.content}>
          <View style={styles.leftSection}>
            <Text category="h6" style={styles.title}>
              {title}
            </Text>
            {topic && (
              <Text category="c1" style={styles.topic}>
                {topic}
              </Text>
            )}
            {difficulty && (
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(difficulty) }]}>
                <Text category="c2" style={styles.difficultyText}>
                  {difficulty.toUpperCase()}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.rightSection}>
            <Icon 
              name="arrow-ios-forward" 
              style={styles.arrowIcon}
              fill="#8F9BB3"
            />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default TopicCard;
