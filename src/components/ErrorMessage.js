import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {theme} from '../global/styles/theme';

const ErrorMessage = ({children}) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: theme.pallete.red,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: theme.pallete.red001,
    borderRadius: 4,
    padding: 4,
    marginVertical: 8,
  },
});

export default ErrorMessage;
