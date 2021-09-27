import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {theme} from '../global/styles/theme';

const TitleSection = ({children}) => {
  return <Text style={styles.text}>{children}</Text>;
};

export default TitleSection;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: theme.pallete.primary,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    marginTop: 8,
  },
});
