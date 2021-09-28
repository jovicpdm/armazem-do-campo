/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {showMessage} from 'react-native-flash-message';

import Logo from '../components/Logo';
import Input from '../components/Input';
import ButtonPrimary from '../components/ButtonPrimary';
import {theme} from '../global/styles/theme';
import ButtonSecondary from '../components/ButtonSecondary';
import WhiteArea from '../components/WhiteArea';
import TitleSection from '../components/TitleSection';
import firebase from '../config/firebase';

export function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = getAuth();
  const authentication = () =>
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        navigation.navigate('RegisterProduct');
      })
      .catch(error => {
        console.log(`message: ${error.message} code: ${error.code}`);
        if (error.code === 'auth/invalid-email') {
          showMessage({
            message: 'Email inválido',
            description: 'Por favor, insira um email válido',
            type: 'danger',
          });
        } else if (error.code === 'auth/internal-error') {
          showMessage({
            message: 'Campo vazio',
            description: 'Por favor, digite email e senha',
            type: 'danger',
          });
        } else if (error.code === 'auth/user-not-found') {
          showMessage({
            message: 'Usuário não encontrado',
            description: 'Não foi possível achar um usuário com esse email',
            type: 'danger',
          });
        } else if (error.code === 'auth/wrong-password') {
          showMessage({
            message: 'Senha incorreta',
            description: 'Por favor, verifique sua senha',
            type: 'danger',
          });
        }
      });

  return (
    <View>
      <Logo />
      <WhiteArea>
        <TitleSection>Bem vindo</TitleSection>
        <Input
          placeholder={'Email'}
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          value={email}
          // onChangeText={onChangeEmail}
          //react-native/no-inline-styles
          style={{marginTop: 16}}
        />
        <Input
          secureTextEntry={true}
          placeholder={'Senha'}
          keyboardType="default"
          onChangeText={text => setPassword(text)}
          value={password}
        />

        <View style={{marginTop: 32}} />
        <ButtonPrimary onPress={() => authentication()}>ENTRAR</ButtonPrimary>
        <ButtonSecondary
          onPress={() => {
            navigation.navigate('Register');
          }}>
          CADASTRAR
        </ButtonSecondary>
      </WhiteArea>
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
  contentAlert: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningAlert: {
    paddingLeft: 10,
    color: '#000',
    fontSize: 16,
  },
});

export default Login;
