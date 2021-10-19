import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {theme} from '../global/styles/theme';

const Input = props => {
  return (
    <View>
      <TextInput
        {...props}
        onChangeText={props.onChangeText}
        placeholderTextColor={theme.pallete.primary}
        placeholder={props.placeholder}
        style={[styles.input, props.style]}
        keyboardType={props.type ? props.type : 'default'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: theme.pallete.primary,
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 23,
    paddingVertical: 12,
    fontFamily: 'WorkSans-Regular',
    fontWeight: '400',
    color: theme.pallete.primary,
    fontSize: 16,
    letterSpacing: 0.5,
    marginTop: 8,
  },
});

export default Input;
