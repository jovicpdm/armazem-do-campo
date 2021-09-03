import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const Input = props => {
  return (
    <View>
      <TextInput
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {},
});

export default Input;
