import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './quiz.styles';
import { questions, Question } from '../../data/questions.data';

interface QuizScreenProps {
  navigation: any;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion: Question = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completed
      Alert.alert(
        'Quiz Completed!',
        `Your score: ${score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0)}/${questions.length}`,
        [
          {
            text: 'Restart Quiz',
            onPress: () => {
              setCurrentQuestionIndex(0);
              setSelectedAnswer(null);
              setShowResult(false);
              setScore(0);
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
    
    if (index === currentQuestion.correctAnswer) {
      return styles.correctOption;
    } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
      return styles.incorrectOption;
    }
    
    return styles.option;
  };

  const getOptionTextStyle = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index ? styles.selectedOptionText : styles.optionText;
    }
    
    if (index === currentQuestion.correctAnswer) {
      return styles.correctOptionText;
    } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
      return styles.incorrectOptionText;
    }
    
    return styles.optionText;
  };

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
              {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect!'}
            </Text>
            <Text style={styles.explanation}>{currentQuestion.explanation}</Text>
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
