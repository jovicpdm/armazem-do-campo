import React from 'react';
import {StyleSheet} from 'react-native';
import Button from './Button';
import {theme} from './../global/styles/theme';

const ButtonSecondary = props => {
  return (
    <Button
      style={[styles.button, props.styles]}
      onPress={props.onPress}
      textColor={theme.pallete.primary}>
      {props.children}
    </Button>
  );
};

export default ButtonSecondary;

const styles = StyleSheet.create({});
