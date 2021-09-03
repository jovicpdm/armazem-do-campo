import React from 'react';
import {StyleSheet} from 'react-native';
import Button from './Button';
import {theme} from './../global/styles/theme';

const ButtonPrimary = props => {
  return (
    <Button
      style={[styles.button, props.styles]}
      name={props.name}
      function={props.function}
      textColor={theme.pallete.white}
    />
  );
};

export default ButtonPrimary;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.pallete.primary,
  },
});
