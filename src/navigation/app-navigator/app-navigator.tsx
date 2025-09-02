import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from '@ui-kitten/components';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONT_SIZES, ICON_SIZES, ROUTES, SPACING } from '../../constants';

import { BOTTOM_TABS_CONFIG } from '../bottom-tabs.config';
import { STACK_CONFIG } from '../stack.config';
import HeaderThemeIcon from '../../components/header-theme-icon/header-theme-icon.component';

export type RootTabParamList = {
  [ROUTES.HOME_TAB]: undefined;
  [ROUTES.LEARN_TAB]: undefined;
  [ROUTES.PRACTICE_TAB]: undefined;
  [ROUTES.QUIZ_TAB]: undefined;
  [ROUTES.PROFILE_TAB]: undefined;
};

export type RootStackParamList = {
  [ROUTES.MAIN_TABS]: undefined;
  [ROUTES.THEME_DEMO]: undefined;
  [ROUTES.LESSONS]: undefined;
  [ROUTES.LESSON_DETAIL]: { lessonId: string };
  [ROUTES.PRACTICE_DETAIL]: { problem: any };
  [ROUTES.SORTING_VISUALIZER]: undefined;
  [ROUTES.TREE_VISUALIZER]: undefined;
  [ROUTES.GRAPH_VISUALIZER]: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const TabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerStatusBarHeight: insets.top,
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: FONT_SIZES.xlarge,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const screenConfig = BOTTOM_TABS_CONFIG.find(screen => screen.name === route.name);
          const iconName = screenConfig?.options.icon || 'help-outline';

          return <Icon name={iconName} width={ICON_SIZES.xlarge} height={ICON_SIZES.xlarge} fill={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.secondary,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          paddingBottom: insets.bottom + SPACING.tiny,
          paddingTop: SPACING.small,
          height: 80 + insets.bottom,
        },
        tabBarLabelStyle: {
          fontSize: FONT_SIZES.small,
          fontWeight: '600',
          marginTop: SPACING.tiny,
          marginBottom: 0,
        },
        tabBarIconStyle: {
          marginTop: SPACING.tiny,
          marginBottom: 0,
        },
        tabBarLabelPosition: 'below-icon',
        tabBarHideOnKeyboard: true,
        tabBarAnimationEnabled: true,
      })}
    >
      {BOTTOM_TABS_CONFIG.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{
            tabBarLabel: screen.options.tabBarLabel,
            title: screen.options.title,
            headerRight: screen.options.headerRight ? () => <HeaderThemeIcon /> : undefined,
            animation: 'shift',
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROUTES.MAIN_TABS}
        screenOptions={{
          headerShown: false,
        }}
      >
        {STACK_CONFIG.map((screen) => {
          const component = screen.name === ROUTES.MAIN_TABS ? TabNavigator : screen.component;
          
          return (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              component={component as any}
              options={{
                ...screen.options,
                ...(screen.options.headerShown && {
                  headerStyle: {
                    backgroundColor: COLORS.primary,
                  },
                  headerTintColor: '#FFFFFF',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: FONT_SIZES.xlarge,
                  },
                }),
              }}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
