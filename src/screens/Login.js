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

export function Login({navigation}) {
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
        <View style={{marginTop: 32}} />
        <ButtonPrimary>ENTRAR</ButtonPrimary>
        <ButtonSecondary
          onPress={() => {
            navigation.navigate('Register');
          }}>
          CADASTRAR
        </ButtonSecondary>
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
