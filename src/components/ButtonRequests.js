import React from 'react';
import {StyleSheet} from 'react-native';
import Button from './Button';
import {theme} from './../global/styles/theme';

const ButtonRequests = ({style, onPress, onFocus, children}) => {
  return (
    <Button
      style={[styles.button, style]}
      onPress={onPress}
      onFocus={onFocus}
      textColor={theme.pallete.white}>
      {children}
    </Button>
  );
};

export default ButtonRequests;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6c5ce7',
    width:'92%',
    padding:3,
    color:'white',
    fontWeight:'bold'
  },
});
