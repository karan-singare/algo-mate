// Route constants for navigation
export const ROUTES = {
  // Tab Routes
  HOME_TAB: 'HomeTab',
  LEARN_TAB: 'LearnTab',
  PRACTICE_TAB: 'PracticeTab',
  QUIZ_TAB: 'QuizTab',
  PROFILE_TAB: 'ProfileTab',
  
  // Stack Routes
  MAIN_TABS: 'MainTabs',
  THEME_DEMO: 'ThemeDemo',
  LESSONS: 'Lessons',
  LESSON_DETAIL: 'LessonDetail',
  PRACTICE_DETAIL: 'PracticeDetail',
  SORTING_VISUALIZER: 'SortingVisualizer',
  TREE_VISUALIZER: 'TreeVisualizer',
  GRAPH_VISUALIZER: 'GraphVisualizer',
} as const;

export type RouteName = typeof ROUTES[keyof typeof ROUTES];
