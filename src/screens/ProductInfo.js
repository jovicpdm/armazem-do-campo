import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteArea from '../components/WhiteArea';

export default function ProductInfo() {
  return (
    <View>
      <TopScreen></TopScreen>
      <WhiteArea></WhiteArea>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
});
