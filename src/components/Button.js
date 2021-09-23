import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Button = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.button, props.style]}>
      <Text style={[styles.textButton, {color: props.textColor}]}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '85%',
    paddingVertical: 16,
    borderRadius: 8,
    alignSelf: 'center',
  },
  textButton: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 1.25,
    fontWeight: 'normal',
  },
});
