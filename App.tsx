/**
 * AlgoMate - Algorithm Learning Companion
 * A React Native app for learning Data Structures and Algorithms
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { ThemeProvider, useAppTheme } from './src/theme';
import { AppNavigator } from '@navigation';
import { COLORS } from './src/constants';

const AppContent: React.FC = () => {
  const { themeName } = useAppTheme();

  return (
    <ApplicationProvider {...eva} theme={eva[themeName]}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={COLORS.primary}
        translucent={false}
      />
      <AppNavigator />
    </ApplicationProvider>
  );
};

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
