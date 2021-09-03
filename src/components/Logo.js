import React from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';

const size = Dimensions.get('screen').width;

export default function Logo() {
  return <Image source={require('../assets/logo.png')} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'stretch',
    width: size,
    height: size,
  },
});
