import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Layout, 
  Text, 
  Card, 
  Button, 
  ButtonGroup,
  Icon,
  List,
  Divider,
  Modal,
  Input,
  Spinner
} from '@ui-kitten/components';
// @ts-ignore
import SyntaxHighlighter from 'react-native-syntax-highlighter';
// @ts-ignore
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { lessons } from '@data';
import { useLessonProgress, useTutor } from '@hooks';
import { styles } from './lesson-detail.styles';

interface LessonDetailScreenProps {
  navigation: any;
  route: {
    params: {
      lessonId: string;
    };
  };
}

const LessonDetailScreen: React.FC<LessonDetailScreenProps> = ({ navigation, route }) => {
  const { lessonId } = route.params;
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);
  const [tutorModalVisible, setTutorModalVisible] = useState(false);
  const [question, setQuestion] = useState('');
  
  // Use lesson progress hook
  const { isCompleted, markLessonComplete } = useLessonProgress();
  
  // Use tutor hook
  const { askTutor, response, loading, clearResponse, cancelGeneration, cancelled } = useTutor();

  // Find the lesson by ID
  const lesson = lessons.find(l => l.id === lessonId);
  
  const lessonCompleted = isCompleted(lessonId);
  
  // Get available languages for code snippets
  const availableLanguages = lesson?.codeSnippets?.map(snippet => snippet.language) || [];
  const languageOptions = availableLanguages.map(lang => lang.toUpperCase());
  
  // Get current code snippet
  const currentSnippet = lesson?.codeSnippets?.[selectedLanguageIndex];

  const handleMarkComplete = async () => {
    if (!lessonCompleted) {
      await markLessonComplete(lessonId);
      Alert.alert('Success', 'Lesson marked as complete! 🎉');
    }
  };

  const handleAskTutor = () => {
    setTutorModalVisible(true);
    clearResponse(); // Clear any previous response
  };

  const handleSubmitQuestion = async () => {
    if (!question.trim()) {
      Alert.alert('Error', 'Please enter a question.');
      return;
    }
    
    await askTutor(question);
  };

  const handleCloseModal = () => {
    setTutorModalVisible(false);
    setQuestion('');
    clearResponse();
  };

  const getDifficultyColor = (difficulty: string) => {
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

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <Layout style={styles.errorContainer}>
          <Icon name="alert-circle-outline" style={styles.errorIcon} fill="#F44336" />
          <Text category="h6" style={styles.errorTitle}>Lesson Not Found</Text>
          <Text category="s1" style={styles.errorDescription}>
            The requested lesson could not be found.
          </Text>
          <Button 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            Go Back
          </Button>
        </Layout>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Header */}
        <Card style={styles.headerCard}>
          <View style={styles.header}>
            <Text category="h4" style={styles.title}>
              {lesson.title}
            </Text>
            
            {/* Topic and Difficulty Badges */}
            <View style={styles.chipsContainer}>
              <View style={styles.topicBadge}>
                <Text category="c2" style={styles.badgeText}>
                  {lesson.topic.toUpperCase()}
                </Text>
              </View>
              
              <View 
                style={[
                  styles.difficultyBadge, 
                  { backgroundColor: getDifficultyColor(lesson.difficulty) }
                ]}
              >
                <Text category="c2" style={styles.badgeText}>
                  {lesson.difficulty.toUpperCase()}
                </Text>
              </View>
              
              {lessonCompleted && (
                <View style={styles.completedBadge}>
                  <Icon name="checkmark-circle" style={styles.completedIcon} fill="#4CAF50" />
                  <Text category="c2" style={styles.completedBadgeText}>
                    COMPLETED
                  </Text>
                </View>
              )}
            </View>
          </View>
        </Card>

        {/* Content */}
        <Card style={styles.contentCard}>
          <Text category="h6" style={styles.sectionTitle}>Lesson Content</Text>
          <Text category="s1" style={styles.lessonContent}>
            {lesson.content}
          </Text>
        </Card>

        {/* Examples */}
        {lesson.examples && lesson.examples.length > 0 && (
          <Card style={styles.examplesCard}>
            <Text category="h6" style={styles.sectionTitle}>Examples</Text>
            <List
              data={lesson.examples}
              renderItem={({ item, index }) => (
                <View style={styles.exampleItem}>
                  <Text category="c1" style={styles.exampleNumber}>
                    {index + 1}.
                  </Text>
                  <Text category="s1" style={styles.exampleText}>
                    {item}
                  </Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              style={styles.examplesList}
            />
          </Card>
        )}

        {/* Code Snippets */}
        {lesson.codeSnippets && lesson.codeSnippets.length > 0 && (
          <Card style={styles.codeCard}>
            <View style={styles.codeHeader}>
              <Text category="h6" style={styles.sectionTitle}>Code Examples</Text>
              
              {/* Language Toggle */}
              {availableLanguages.length > 1 && (
                <View style={styles.languageToggle}>
                  {languageOptions.map((lang, index) => (
                    <Button
                      key={lang}
                      size="small"
                      status={selectedLanguageIndex === index ? 'primary' : 'basic'}
                      onPress={() => setSelectedLanguageIndex(index)}
                      style={styles.languageButton}
                    >
                      {lang}
                    </Button>
                  ))}
                </View>
              )}
            </View>
            
            {currentSnippet && (
              <View style={styles.codeContainer}>
                <SyntaxHighlighter
                  language={currentSnippet.language}
                  style={tomorrow}
                  customStyle={styles.syntaxHighlighter}
                  showLineNumbers={true}
                  wrapLines={true}
                >
                  {currentSnippet.code}
                </SyntaxHighlighter>
              </View>
            )}
          </Card>
        )}

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Button
            style={styles.actionButton}
            status={lessonCompleted ? 'basic' : 'success'}
            disabled={lessonCompleted}
            onPress={handleMarkComplete}
            accessoryLeft={(props) => (
              <Icon 
                {...props} 
                name={lessonCompleted ? "checkmark-circle" : "checkmark-circle-outline"} 
              />
            )}
          >
            {lessonCompleted ? 'Completed' : 'Mark as Complete'}
          </Button>
          
          <Button
            style={styles.actionButton}
            status="info"
            onPress={handleAskTutor}
            accessoryLeft={(props) => (
              <Icon {...props} name="message-circle-outline" />
            )}
          >
            Ask Tutor (AI)
          </Button>
        </View>
      </ScrollView>

      {/* Tutor Modal */}
      <Modal
        visible={tutorModalVisible}
        backdropStyle={styles.modalBackdrop}
        onBackdropPress={handleCloseModal}
        style={styles.modal}
      >
        <Card style={styles.modalCard}>
          <View style={styles.modalHeader}>
            <Text category="h6" style={styles.modalTitle}>
              Ask AI Tutor
            </Text>
            <Button
              appearance="ghost"
              size="small"
              onPress={handleCloseModal}
              accessoryLeft={(props) => <Icon {...props} name="close-outline" />}
            />
          </View>

          <View style={styles.modalContent}>
            <Text category="s1" style={styles.modalSubtitle}>
              Ask any question about this lesson:
            </Text>
            
            <Input
              style={styles.questionInput}
              placeholder="What would you like to know?"
              value={question}
              onChangeText={setQuestion}
              multiline={true}
              textStyle={styles.inputText}
              disabled={loading}
            />

            {loading && !response && (
              <View style={styles.loadingContainer}>
                <Spinner size="small" />
                <Text category="c1" style={styles.loadingText}>
                  AI is thinking...
                </Text>
              </View>
            )}

            {response && (
              <View style={styles.responseContainer}>
                <View style={styles.responseHeader}>
                  <Text category="s2" style={styles.responseLabel}>
                    AI Response:
                  </Text>
                  {loading && (
                    <Button
                      size="tiny"
                      status="danger"
                      onPress={cancelGeneration}
                      accessoryLeft={(props) => <Icon {...props} name="stop-circle-outline" />}
                    >
                      Stop
                    </Button>
                  )}
                </View>
                <ScrollView style={styles.responseScrollView} nestedScrollEnabled={true}>
                  <Text category="s1" style={styles.responseText}>
                    {response}
                    {loading && <Text style={styles.typingIndicator}>▋</Text>}
                  </Text>
                </ScrollView>
              </View>
            )}

            <View style={styles.modalActions}>
              <Button
                style={styles.modalButton}
                status="basic"
                onPress={handleCloseModal}
                disabled={loading}
              >
                Close
              </Button>
              <Button
                style={styles.modalButton}
                status="primary"
                onPress={handleSubmitQuestion}
                disabled={loading || !question.trim()}
                accessoryLeft={loading ? (props) => <Spinner {...props} size="small" /> : undefined}
              >
                {loading ? 'Asking...' : 'Ask Question'}
              </Button>
            </View>
          </View>
        </Card>
      </Modal>
    </SafeAreaView>
  );
};

export default LessonDetailScreen;