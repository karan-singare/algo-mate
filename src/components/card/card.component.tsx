import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './card.styles';

interface CardProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  style?: any;
}

const Card: React.FC<CardProps> = ({ title, subtitle, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </TouchableOpacity>
  );
};

export default Card;
