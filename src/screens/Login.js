/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Logo from '../components/Logo';
import Input from '../components/Input';
import ButtonPrimary from '../components/ButtonPrimary';
import {theme} from '../global/styles/theme';
import ButtonSecondary from '../components/ButtonSecondary';
import ButtonGoogleLogin from '../components/ButtonGoogleLogin';
import ButtonFacebookLogin from '../components/ButtonFacebookLogin';

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
        <ButtonPrimary>ENTRAR</ButtonPrimary>
        <ButtonSecondary>CADASTRAR</ButtonSecondary>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.line} />
          <View>
            <Text style={{width: 25, textAlign: 'center', fontSize: 8}}>
              ou
            </Text>
          </View>
          <View style={styles.line} />
        </View>
        <Text style={styles.textEnterWith}>Entrar com</Text>
        <ButtonGoogleLogin />
        <ButtonFacebookLogin />
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
  textEnterWith: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
    lineHeight: 25,
    letterSpacing: 1.15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: theme.pallete.primary,
  },
});

export default Login;
