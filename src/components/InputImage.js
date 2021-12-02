import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {theme} from '../global/styles/theme';

const InputImage = ({onPress, props, name}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity {...props} style={[styles.button]} onPress={onPress}>
        <Text style={styles.buttonText}> {name} </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderColor: theme.pallete.primary,
    backgroundColor: theme.pallete.primary,
    borderWidth: 1,
    borderRadius: 8,
    width: '76%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 23,
    paddingVertical: 4,
    letterSpacing: 0.5,
    marginTop: 8,
  },
  buttonText: {
    fontFamily: 'Roboto-Medium',
    color: theme.pallete.white,
    fontSize: 16,
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: 38,
    marginTop: 20,
  },
});

export default InputImage;
