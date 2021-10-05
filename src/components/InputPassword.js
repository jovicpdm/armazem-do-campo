import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {theme} from '../global/styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';

const InputPassword = props => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View style={styles.inputArea}>
      <TextInput
        {...props}
        secureTextEntry={hidePassword}
        onChangeText={props.onChangeText}
        placeholderTextColor={theme.pallete.primary}
        placeholder={props.placeholder}
        style={[styles.input, props.style]}
        keyboardType={props.type ? props.type : 'default'}
      />
      <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
        {hidePassword ? (
          <Icon name="eye" style={styles.icon} size={20} />
        ) : (
          <Icon name="eye-slash" style={styles.icon} size={20} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '90%',
    fontFamily: 'WorkSans-Regular',
    fontWeight: '400',
    color: theme.pallete.primary,
    paddingLeft: 27,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.pallete.primary,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 12,
    height: 55,
  },
  icon: {
    color: theme.pallete.primary,
    paddingRight: 18,
  },
});

export default InputPassword;
