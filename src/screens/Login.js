/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, onValue, ref} from '@firebase/database';
import {showMessage} from 'react-native-flash-message';

import Logo from '../components/Logo';
import Input from '../components/Input';
import InputPassword from '../components/InputPassword';
import ButtonPrimary from '../components/ButtonPrimary';
import {theme} from '../global/styles/theme';
import ButtonSecondary from '../components/ButtonSecondary';
import WhiteArea from '../components/WhiteArea';
import TitleSection from '../components/TitleSection';
import ErrorMessage from '../components/ErrorMessage';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('teste');

  const db = getDatabase();
  const auth = getAuth();
  const authentication = () =>
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const userRef = ref(db, 'users/' + userCredential.user.uid);
        onValue(userRef, snapshot => {
          const data = snapshot.val();
          if (data.type === 'admin') {
            navigation.navigate('Admin');
          }
          if (data.status === 'aguardando') {
            navigation.navigate('Feedback', {status: 'aguardando'});
          } else if (data.status === 'reprovado') {
            navigation.navigate('Feedback', {status: 'reprovado'});
          } else if (data.status === 'aprovado') {
            navigation.navigate('Purchase');
          }
        });
      })
      .catch(error => {
        console.log(`message: ${error.message} code: ${error.code}`);
        if (error.code === 'auth/invalid-email') {
          setError('Email inválido!');
        } else if (error.code === 'auth/internal-error') {
          setError('Campo vazio');
        } else if (error.code === 'auth/user-not-found') {
          setError('Usuário não encontrado');
        } else if (error.code === 'auth/wrong-password') {
          setError('Senha incorreta');
        }
        setShowError(true);
      });

  return (
    <View>
      <Logo />
      <WhiteArea>
        <TitleSection>Bem vindo</TitleSection>
        {showError === false ? null : <ErrorMessage> {error} </ErrorMessage>}
        <Input
          placeholder={'Email'}
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          value={email}
          onFocus={() => {
            setShowError(false);
          }}
          //react-native/no-inline-styles
          style={{marginTop: 16}}
        />
        <InputPassword
          placeholderTextColor={theme.pallete.primary}
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
