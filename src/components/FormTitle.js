import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {theme} from '../global/styles/theme';

const FormTitle= ({children}) => {
  return <Text style={styles.text}>{children}</Text>;
};

export default FormTitle;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: theme.pallete.black,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    marginTop: 8,
  },
});
