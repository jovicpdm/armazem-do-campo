import React from 'react';
import { StyleSheet } from 'react-native';
import Button from '../components/Button';
import { theme } from './../global/styles/theme';

const ButtonPrimary = ({ style, onPress, onFocus, children, background }) => {
  return (
    <Button
      style={[styles.button, { backgroundColor: background }, style]}
      onPress={onPress}
      onFocus={onFocus}
      textColor={theme.pallete.white}>
      {children}
    </Button>
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  button: {
    width: '48%',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: 0,
    textAlign: 'center',
  },
});
