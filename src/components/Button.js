import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Button = props => {
  return (
    <TouchableOpacity
      onPress={props.function}
      style={[styles.button, props.style]}>
      <Text style={[styles.textButton, {color: props.textColor}]}>
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 7,
  },
  textButton: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 1.25,
    fontWeight: 'normal',
  },
});
