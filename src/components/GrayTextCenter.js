import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {theme} from '../global/styles/theme';

const GrayText = ({children}) => {
  return <Text style={styles.text}>{children}</Text>;
};

export default GrayText;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginTop: 8,
    color: theme.pallete.gray001,
    fontSize: 16,
  },
});
