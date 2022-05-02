import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { Position } from '../../constants/position';

interface BannerProps {
  position: Position;
  id: string;
}

export const Banner: React.FC<BannerProps> = ({ position, id }) => {
  return (
    <View style={[styles.banner, position == Position.TOP ? { top: 0 } : { bottom: 0 }]}>
      <BannerAd unitId={id ? id : TestIds.BANNER} size={BannerAdSize.BANNER} />
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    width: '100%',
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
