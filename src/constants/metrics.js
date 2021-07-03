import { Platform, StatusBar } from 'react-native';
import { normalize } from '../helpers';

export const metrics = {
  baseSpace: normalize(10, true),
  baseRadius: 6,

  statusBarHeight: Platform.OS === 'ios' ? 34 : StatusBar.currentHeight,
};
