import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Logo from '../components/Logo';
// import {theme} from '../global/styles/theme';
import Input from '../components/Input';

export function Login() {
  const [email, onChangeEmail] = useState();
  const [password, onChangePassword] = useState();

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View>
      <Logo />
      <View style={styles.inputArea}>
        <Input placeholder={'email'} onChangeText={onChangeEmail} />
        <Input placeholder={'password'} onChangeText={onChangePassword} />
        <Text>{email}</Text>
        <Text>{password}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputArea: {
    backgroundColor: '#ffffff',
    height: 300,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

export default Login;
