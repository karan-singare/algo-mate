import { ROUTES } from '../constants';
import ThemeDemoScreen from '../screens/theme-demo-screen/theme-demo.screen';
import LessonsScreen from '../screens/lessons/lessons.screen';
import LessonDetailScreen from '../screens/lesson-detail/lesson-detail.screen';
import PracticeDetailScreen from '../screens/practice-detail/practice-detail.screen';
import SortingVisualizerScreen from '../screens/sorting-visualizer/sorting-visualizer.screen';
import TreeVisualizerScreen from '../screens/tree-visualizer/tree-visualizer.screen';
import GraphVisualizerScreen from '../screens/graph-visualizer/graph-visualizer.screen';

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
  {
    name: ROUTES.SORTING_VISUALIZER,
    component: SortingVisualizerScreen,
    options: {
      headerShown: true,
      title: 'Sorting Visualizer',
    },
  },
  {
    name: ROUTES.TREE_VISUALIZER,
    component: TreeVisualizerScreen,
    options: {
      headerShown: true,
      title: 'Tree Visualizer',
    },
  },
  {
    name: ROUTES.GRAPH_VISUALIZER,
    component: GraphVisualizerScreen,
    options: {
      headerShown: true,
      title: 'Graph Visualizer',
    },
  },
];
