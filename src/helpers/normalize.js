import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// based on iPhone 8's scale
const wscale = SCREEN_WIDTH / 375;
const hscale = SCREEN_HEIGHT / 667;

export function normalize(size, isBasedHeight = false) {
  const newSize = isBasedHeight ? size * hscale : size * wscale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}
