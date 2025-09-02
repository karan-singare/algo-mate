import * as eva from '@eva-design/eva';
import { customLightTheme, customDarkTheme } from './ui-kitten-theme.config';

export const themes = {
  light: customLightTheme,
  dark: customDarkTheme,
};

export type ThemeName = keyof typeof themes;

export const defaultTheme: ThemeName = 'light';

export const getTheme = (themeName: ThemeName) => {
  return themes[themeName];
};
