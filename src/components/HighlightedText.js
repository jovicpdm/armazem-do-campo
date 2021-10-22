import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {theme} from '../global/styles/theme';

const HighlightedText = ({children}) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: theme.pallete.gray,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
  },
});

export default HighlightedText;
