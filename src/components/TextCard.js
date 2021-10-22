import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {theme} from '../global/styles/theme';

const TextCard = ({children}) => {
  return <Text style={styles.textCard}>{children}</Text>;
};

export default TextCard;

const styles = StyleSheet.create({
  textCard: {
    color: theme.pallete.primary002,
    // marginHorizontal: 24,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textAlign: 'right',
  },
});
