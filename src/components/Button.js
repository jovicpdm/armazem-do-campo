import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Button = props => {
  return (
    <TouchableOpacity
      onPress={props.function}
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
    marginHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 8,
  },
  textButton: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    textAlign: 'center',
    letterSpacing: 1.25,
    fontWeight: 'normal',
  },
});
