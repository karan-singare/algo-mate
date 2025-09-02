import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { ICON_SIZES, SPACING, ROUTES } from '../../constants';
import { RootStackParamList } from '../../navigation/app-navigator/app-navigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HeaderThemeIconNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HeaderThemeIcon: React.FC = () => {
  const navigation = useNavigation<HeaderThemeIconNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(ROUTES.THEME_DEMO)}
      style={{ marginRight: SPACING.large }}
    >
      <Icon 
        name="color-palette-outline" 
        width={ICON_SIZES.medium} 
        height={ICON_SIZES.medium} 
        fill="#FFFFFF"
      />
    </TouchableOpacity>
  );
};

export default HeaderThemeIcon;
