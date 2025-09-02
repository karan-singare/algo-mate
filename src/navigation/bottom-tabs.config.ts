import { ROUTES } from '../constants';
import HomeScreen from '../screens/home-screen/home.screen';
import LearnScreen from '../screens/learn-screen/learn.screen';
import PracticeScreen from '../screens/practice-screen/practice.screen';
import QuizScreen from '../screens/quiz-screen/quiz.screen';
import ProfileScreen from '../screens/profile-screen/profile.screen';

export const BOTTOM_TABS_CONFIG = [
  {
    name: ROUTES.HOME_TAB,
    component: HomeScreen,
    options: {
      tabBarLabel: 'Home',
      title: 'AlgoMate',
      icon: 'home-outline',
      headerRight: true, // Special case for theme icon
    },
  },
  {
    name: ROUTES.LEARN_TAB,
    component: LearnScreen,
    options: {
      tabBarLabel: 'Lessons',
      title: 'Learn DSA',
      icon: 'book-outline',
    },
  },
  {
    name: ROUTES.PRACTICE_TAB,
    component: PracticeScreen,
    options: {
      tabBarLabel: 'Practice',
      title: 'Practice Problems',
      icon: 'checkmark-circle-outline',
    },
  },
  {
    name: ROUTES.QUIZ_TAB,
    component: QuizScreen,
    options: {
      tabBarLabel: 'Quiz',
      title: 'Quiz',
      icon: 'question-mark-circle-outline',
    },
  },
  {
    name: ROUTES.PROFILE_TAB,
    component: ProfileScreen,
    options: {
      tabBarLabel: 'Profile',
      title: 'Profile',
      icon: 'person-outline',
    },
  },
];
