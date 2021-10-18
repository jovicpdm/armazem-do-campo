import React from 'react';
import {Text, StyleSheet} from 'react-native';

const HighlightedText = ({children}) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#1FB76E',
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
  },
});

export default HighlightedText;
