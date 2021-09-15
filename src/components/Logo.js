import React from 'react';
import {Image, StyleSheet} from 'react-native';

export default function Logo() {
  return <Image source={require('../assets/logo.png')} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'stretch',
    width: 133,
    height: 133,
    alignSelf: 'center',
  },
});
