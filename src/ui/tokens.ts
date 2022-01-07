import { PixelRatio, StatusBar } from "react-native";
import {
  getBottomSpace,
  getStatusBarHeight,
  isIphoneX,
} from "react-native-iphone-x-helper";

export const round = (value: number): number =>
  PixelRatio.roundToNearestPixel(value);

export const screenPaddingTop =
  ((isIphoneX() ? getStatusBarHeight() : StatusBar.currentHeight) as number) +
  round(32);

export const bottomSpacer = (isIphoneX() ? getBottomSpace() : 0) + round(20);

export const Colors = {
  backgroundDark: "#060D2C",
  lighterBackground: "#242444",
  textPrimary: "#FFFFFF",
  lightBorder: "#8e95b2",
  yellowStar: "#F6A241",
};
