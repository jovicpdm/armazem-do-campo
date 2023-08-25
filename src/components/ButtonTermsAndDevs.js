import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { theme } from '../global/styles/theme';

const ButtonTermsAndDevs = props => {
  return (
    <TouchableOpacity
      style={[styles.button]}
      onPress={props.onPress}>
      <Text style={styles.textButton}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonTermsAndDevs;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 13,
    borderRadius: 8,
    alignSelf: 'center',
  },
  textButton: {
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
    textAlign: 'center',
    letterSpacing: 1.10,
    fontWeight: 'normal',
    color:theme.pallete.primary004
  },
});
