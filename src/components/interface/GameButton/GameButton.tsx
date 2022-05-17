import { GlobalStyles, Dimens, GlobalColors } from '@/values';
import React from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

interface GameButtonProps {
  /** Image to display. Use 'require' to get the image */
  img?: ImageSourcePropType;
  /** Button title */
  title?: string;
  /** Subtitle under title */
  subTitle?: string;
  /** Button style */
  style?: StyleProp<ViewStyle>;
  /** Triggered on button press */
  onPress?: () => void;
  /** Icon style */
  iconStyle?: StyleProp<ImageStyle>;
  /** Text style */
  textStyle?: StyleProp<TextStyle>;
  /** Icon after title */
  titleIcon?: ImageSourcePropType;
  /** Icon after subtitle */
  subTitleIcon?: ImageSourcePropType;
  /** Icon style for title\subtitle texts */
  textIconStyle?: StyleProp<ImageStyle>;
  /** Disabled button option */
  disabled?: boolean;
  fullIcon?: boolean;
}
export const GameButton: React.FC<GameButtonProps> = ({
  style,
  onPress,
  img,
  title,
  iconStyle,
  textStyle,
  titleIcon,
  subTitle,
  subTitleIcon,
  textIconStyle,
  disabled,
  fullIcon
}) => {
  return (
    <TouchableOpacity style={[styles.container, style, disabled ? styles.buttonDisabled : undefined]} onPress={onPress} disabled={disabled} activeOpacity={0.5}>
      {img && <Image style={[styles.icon, fullIcon ? { height: '100%', width: '100%' } : undefined, iconStyle]} source={img} />}
      {title && (
        <View style={[GlobalStyles.rcc]}>
          <Text style={[styles.title, textStyle]}>{title}</Text>
          {titleIcon && <Image style={[styles.textIcon, textIconStyle]} source={titleIcon} />}
        </View>
      )}
      {subTitle && (
        <View style={[GlobalStyles.rcc]}>
          {subTitle && <Text style={[styles.subTitle]}>{subTitle}</Text>}
          {subTitleIcon && <Image style={[styles.textIcon, textIconStyle]} source={subTitleIcon} />}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    width: '30%',
    backgroundColor: GlobalColors.backgroundOpposite,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    padding: 6,
    overflow: 'hidden'
  },
  icon: {
    width: '45%',
    height: '45%'
  },
  title: {
    paddingStart: 0,
    paddingEnd: 0,
    marginTop: 5,
    color: GlobalColors.white,
    fontSize: Dimens.normalText,
    textAlign: 'center'
  },
  subTitle: {
    paddingStart: 0,
    paddingEnd: 0,
    color: GlobalColors.white,
    fontSize: Dimens.normalText,
    textAlign: 'center'
  },
  textIcon: {
    width: '30%',
    aspectRatio: 1,
    marginStart: 5,
    marginTop: 5
  },
  buttonDisabled: {
    opacity: 0.5
  }
});
