import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Spinner } from '@ui-kitten/components';
import { styles } from './quiz.styles';
import { questions, Question } from '@data';
import { useQuizProgress, useTutor } from '@hooks';

interface QuizScreenProps {
  navigation: any;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const { lastScore, saveScore } = useQuizProgress();
  const { askTutor, response, loading, clearResponse } = useTutor();

  const currentQuestion: Question = questions[currentQuestionIndex];

  const handleAnswerSelect = async (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === currentQuestion.answerIndex) {
      setScore(score + 1);
    }

    // Request AI explanation for the correct answer
    clearResponse(); // Clear any previous response
    const correctAnswer = currentQuestion.options[currentQuestion.answerIndex];
    const explanationPrompt = `Explain why the correct answer to this question is "${correctAnswer}". Question: ${currentQuestion.question}. Options: ${currentQuestion.options.join(', ')}. Topic: ${currentQuestion.topic}`;
    await askTutor(explanationPrompt);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      clearResponse(); // Clear AI explanation for next question
    } else {
      // Quiz completed
      const finalScore = score + (selectedAnswer === currentQuestion.answerIndex ? 1 : 0);
      saveScore(finalScore);
      
      Alert.alert(
        'Quiz Completed!',
        `Your score: ${finalScore}/${questions.length}`,
        [
          {
            text: 'Restart Quiz',
            onPress: () => {
              setCurrentQuestionIndex(0);
              setSelectedAnswer(null);
              setShowResult(false);
              setScore(0);
              setQuizStarted(false);
              clearResponse(); // Clear AI explanation when restarting
            }
          }
        ]
      );
    }
  };

  const getOptionStyle = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index ? styles.selectedOption : styles.option;
    }
    
    if (index === currentQuestion.answerIndex) {
      return styles.correctOption;
    } else if (index === selectedAnswer && index !== currentQuestion.answerIndex) {
      return styles.incorrectOption;
    }
    
    return styles.option;
  };

  const getOptionTextStyle = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index ? styles.selectedOptionText : styles.optionText;
    }
    
    if (index === currentQuestion.answerIndex) {
      return styles.correctOptionText;
    } else if (index === selectedAnswer && index !== currentQuestion.answerIndex) {
      return styles.incorrectOptionText;
    }
    
    return styles.optionText;
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  if (!quizStarted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>MCQ Quiz</Text>
        </View>
        
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          {lastScore > 0 && (
            <Card style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Last Quiz Score</Text>
              <Text style={styles.summaryScore}>{lastScore}/{questions.length}</Text>
              <Text style={styles.summaryPercentage}>
                {Math.round((lastScore / questions.length) * 100)}% Correct
              </Text>
            </Card>
          )}
          
          <View style={styles.startCard}>
            <Text style={styles.startTitle}>Ready to Test Your Knowledge?</Text>
            <Text style={styles.startDescription}>
              Answer {questions.length} multiple choice questions about Data Structures and Algorithms.
            </Text>
            <TouchableOpacity style={styles.startButton} onPress={startQuiz}>
              <Text style={styles.startButtonText}>Start Quiz</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MCQ Quiz</Text>
        <Text style={styles.progress}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </Text>
        <Text style={styles.score}>Score: {score}</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.questionCard}>
          <Text style={styles.topic}>{currentQuestion.topic}</Text>
          <Text style={styles.question}>{currentQuestion.question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={getOptionStyle(index)}
              onPress={() => handleAnswerSelect(index)}
              disabled={showResult}
            >
              <Text style={getOptionTextStyle(index)}>
                {String.fromCharCode(65 + index)}. {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {showResult && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>
              {selectedAnswer === currentQuestion.answerIndex ? 'Correct!' : 'Incorrect!'}
            </Text>
            <Text style={styles.explanation}>
              The correct answer is: {currentQuestion.options[currentQuestion.answerIndex]}
            </Text>
            
            {/* AI Explanation Section */}
            <View style={styles.aiExplanationContainer}>
              <Text style={styles.aiExplanationTitle}>🤖 AI Explanation</Text>
              
              {loading && (
                <View style={styles.loadingContainer}>
                  <Spinner size="small" />
                  <Text style={styles.loadingText}>
                    AI is analyzing the question...
                  </Text>
                </View>
              )}
              
              {response && (
                <View style={styles.aiExplanationBox}>
                  <Text style={styles.aiExplanationText}>
                    {response}
                  </Text>
                </View>
              )}
            </View>
            
            <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
              <Text style={styles.nextButtonText}>
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuizScreen;
