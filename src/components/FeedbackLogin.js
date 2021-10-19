import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const FeedbackLogin = ({children, color}) => {
  return <Text style={[styles.text, {color: color}]}>{children}</Text>;
};

export default FeedbackLogin;

const styles = StyleSheet.create({
  text: {
    padding: 4,
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
});
