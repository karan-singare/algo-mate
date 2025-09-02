import React from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './learn.styles';
import Card from '../../components/card/card.component';

interface LearnScreenProps {
  navigation: any;
}

const topics = [
  { id: '1', title: 'Arrays', subtitle: 'Learn about array operations and algorithms' },
  { id: '2', title: 'Strings', subtitle: 'Master string manipulation and pattern matching' },
  { id: '3', title: 'Linked Lists', subtitle: 'Understand linked list data structures' },
  { id: '4', title: 'Trees', subtitle: 'Explore binary trees and tree traversals' },
  { id: '5', title: 'Graphs', subtitle: 'Learn graph algorithms and representations' },
  { id: '6', title: 'Sorting', subtitle: 'Master various sorting algorithms' },
  { id: '7', title: 'Dynamic Programming', subtitle: 'Solve problems using DP techniques' },
];

const LearnScreen: React.FC<LearnScreenProps> = ({ navigation }) => {
  const handleTopicPress = (topic: any) => {
    navigation.navigate('LessonDetail', { topic: topic.title });
  };

  const renderTopic = ({ item }: { item: any }) => (
    <Card
      title={item.title}
      subtitle={item.subtitle}
      onPress={() => handleTopicPress(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DSA Lessons</Text>
        <Text style={styles.description}>
          Master Data Structures and Algorithms through interactive lessons
        </Text>
      </View>
      <FlatList
        data={topics}
        renderItem={renderTopic}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default LearnScreen;
