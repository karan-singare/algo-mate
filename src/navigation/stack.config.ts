import { ROUTES } from '../constants';
import ThemeDemoScreen from '../screens/theme-demo-screen/theme-demo.screen';
import LessonsScreen from '../screens/lessons/lessons.screen';
import LessonDetailScreen from '../screens/lesson-detail/lesson-detail.screen';
import PracticeDetailScreen from '../screens/practice-detail/practice-detail.screen';

export const STACK_CONFIG = [
  {
    name: ROUTES.MAIN_TABS,
    component: null, // Will be set to TabNavigator in the navigator
    options: {
      headerShown: false,
    },
  },
  {
    name: ROUTES.THEME_DEMO,
    component: ThemeDemoScreen,
    options: {
      headerShown: true,
      title: 'Theme Settings',
    },
  },
  {
    name: ROUTES.LESSONS,
    component: LessonsScreen,
    options: {
      headerShown: true,
      title: 'DSA Lessons',
    },
  },
  {
    name: ROUTES.LESSON_DETAIL,
    component: LessonDetailScreen,
    options: {
      headerShown: true,
      title: 'Lesson Detail',
    },
  },
  {
    name: ROUTES.PRACTICE_DETAIL,
    component: PracticeDetailScreen,
    options: {
      headerShown: true,
      title: 'Practice Problem',
    },
  },
];
