import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

export const isTablet = width >= 600;
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const PADDING = isTablet ? 24 : 16;
export const CARD_MARGIN = isTablet ? 20 : 14;

const scale = width / 375;

export function rs(size) {
  const newSize = size * scale;
  if (isTablet) return Math.round(PixelRatio.roundToNearestPixel(newSize * 1.2));
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
