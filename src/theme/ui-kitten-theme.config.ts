import * as eva from '@eva-design/eva';
import { COLORS } from '../constants';

// Custom UI Kitten theme configuration
export const customLightTheme = {
  ...eva.light,
  
  // Text colors - most important for visibility
  'text-basic-color': COLORS.text,
  'text-hint-color': COLORS.textSecondary,
  'text-disabled-color': COLORS.textMuted,
  'text-primary-color': COLORS.primary,
  'text-success-color': COLORS.success,
  'text-warning-color': COLORS.warning,
  'text-danger-color': COLORS.error,
  
  // Primary colors
  'color-primary-100': '#DBEAFE',
  'color-primary-200': '#BFDBFE',
  'color-primary-300': '#93C5FD',
  'color-primary-400': '#60A5FA',
  'color-primary-500': COLORS.primary,
  'color-primary-600': '#1D4ED8',
  'color-primary-700': '#1E40AF',
  'color-primary-800': '#1E3A8A',
  'color-primary-900': '#1E3A8A',
  
  // Warning colors
  'color-warning-100': '#FEF3C7',
  'color-warning-200': '#FDE68A',
  'color-warning-300': '#FCD34D',
  'color-warning-400': '#FBBF24',
  'color-warning-500': COLORS.warning,
  'color-warning-600': '#D97706',
  'color-warning-700': '#B45309',
  'color-warning-800': '#92400E',
  'color-warning-900': '#78350F',
};

export const customDarkTheme = {
  ...eva.dark,
  'color-basic-100': '#1F2937',
  'color-basic-200': '#374151',
  'color-basic-300': '#4B5563',
  'color-basic-400': '#6B7280',
  'color-basic-500': '#9CA3AF',
  'color-basic-600': COLORS.textLight,
  'color-basic-700': COLORS.textLight,
  'color-basic-800': COLORS.textLight,
  'color-basic-900': COLORS.textLight,
  'color-basic-1000': COLORS.textLight,
  'color-basic-1100': COLORS.textLight,
  
  // Text colors
  'text-basic-color': COLORS.textLight,
  'text-hint-color': '#9CA3AF',
  'text-disabled-color': '#6B7280',
  'text-primary-color': '#60A5FA',
  'text-success-color': '#34D399',
  'text-warning-color': '#FBBF24',
  'text-danger-color': '#F87171',
  
  // Primary colors
  'color-primary-100': '#1E3A8A',
  'color-primary-200': '#1E40AF',
  'color-primary-300': '#1D4ED8',
  'color-primary-400': '#2563EB',
  'color-primary-500': '#3B82F6',
  'color-primary-600': '#60A5FA',
  'color-primary-700': '#93C5FD',
  'color-primary-800': '#BFDBFE',
  'color-primary-900': '#DBEAFE',
  
  // Warning colors
  'color-warning-100': '#78350F',
  'color-warning-200': '#92400E',
  'color-warning-300': '#B45309',
  'color-warning-400': '#D97706',
  'color-warning-500': COLORS.warning,
  'color-warning-600': '#FBBF24',
  'color-warning-700': '#FCD34D',
  'color-warning-800': '#FDE68A',
  'color-warning-900': '#FEF3C7',
};
