/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Logo from '../components/Logo';
import Input from '../components/Input';
import ButtonPrimary from '../components/ButtonPrimary';
import {theme} from '../global/styles/theme';
import ButtonSecondary from '../components/ButtonSecondary';

export function Login() {
  const [email, onChangeEmail] = useState();
  const [password, onChangePassword] = useState();

  return (
    <View>
      <Logo />
      <View style={styles.inputArea}>
        <Input
          placeholder={'Email'}
          onChangeText={onChangeEmail}
          //react-native/no-inline-styles
          style={{marginTop: 40}}
        />
        <Input
          placeholder={'Senha'}
          onChangeText={onChangePassword}
          style={{marginTop: 8}}
        />
        <Text>{email}</Text>
        <Text>{password}</Text>
        <ButtonPrimary name={'ENTRAR'} />
        <ButtonSecondary name={'CADASTRAR'} />
        <Text style={styles.line}>ou</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputArea: {
    backgroundColor: theme.pallete.white,
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  line: {
    textAlign: 'center',
    color: theme.pallete.primary,
  },
});

export default Login;
