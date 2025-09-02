// Storage keys constants
export const STORAGE_KEYS = {
  // User progress
  USER_PROGRESS: 'user_progress',
  LESSONS_COMPLETED: 'lessons_completed',
  PROBLEMS_SOLVED: 'problems_solved',
  QUIZ_SCORES: 'quiz_scores',
  
  // App settings
  THEME_MODE: 'theme_mode',
  NOTIFICATIONS_ENABLED: 'notifications_enabled',
  SOUND_ENABLED: 'sound_enabled',
  
  // User preferences
  USER_PREFERENCES: 'user_preferences',
  LAST_ACTIVE_TOPIC: 'last_active_topic',
  STUDY_STREAK: 'study_streak',
  
  // App state
  APP_VERSION: 'app_version',
  FIRST_LAUNCH: 'first_launch',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  
  // Model management
  MODEL_COPIED: 'model_copied_to_documents',
  MODEL_PATH: 'model_local_path',
} as const;
