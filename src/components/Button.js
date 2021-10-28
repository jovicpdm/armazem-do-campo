import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Button = ({onPress, style, textColor, children}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.textButton, {color: textColor}]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
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
