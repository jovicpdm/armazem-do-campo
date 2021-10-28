import React from 'react';
import {StyleSheet} from 'react-native';
import Button from './Button';
import {theme} from './../global/styles/theme';

const ButtonPrimary = ({style, onPress, children}) => {
  return (
    <Button
      style={[styles.button, style]}
      onPress={onPress}
      textColor={theme.pallete.white}>
      {children}
    </Button>
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.pallete.primary,
  },
});
