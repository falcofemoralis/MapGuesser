import { NativeModules } from "react-native";

const { StatusBarManager } = NativeModules;

export const Dimens = {
  headText: 18,
  normalText: 16,
  smallText: 12,
  statusBarHeight: StatusBarManager.HEIGHT / 2
};
