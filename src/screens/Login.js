/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, onValue, ref} from '@firebase/database';

import Logo from '../components/Logo';
import Input from '../components/Input';
import InputPassword from '../components/InputPassword';
import ButtonPrimary from '../components/ButtonPrimary';
import {theme} from '../global/styles/theme';
import ButtonSecondary from '../components/ButtonSecondary';
import WhiteArea from '../components/WhiteArea';
import TitleSection from '../components/TitleSection';
import ErrorMessage from '../components/ErrorMessage';
import GrayText from '../components/GrayText';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const db = getDatabase();
  const auth = getAuth();

  const authentication = () =>
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const userRef = ref(db, 'users/' + userCredential.user.uid);
        onValue(userRef, snapshot => {
          const data = snapshot.val();
          setLoading(false);
          if (data.type == 'admin') {
            navigation.navigate('Admin');
          }
          if (data.status == 'aguardando') {
            navigation.navigate('Feedback', {status: 'aguardando'});
          } else if (data.status == 'reprovado') {
            navigation.navigate('Feedback', {status: 'reprovado'});
          } else if (data.status == 'aprovado') {
            navigation.navigate('Purchase', {
              id: snapshot.key,
            });
          }
        });
      })
      .catch(err => {
        setLoading(false);
        if (err.code === 'auth/invalid-email') {
          setError('Email inválido!');
        } else if (err.code === 'auth/internal-error') {
          setError('Campo vazio');
        } else if (err.code === 'auth/user-not-found') {
          setError('Usuário não encontrado');
        } else if (err.code === 'auth/wrong-password') {
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
          onFocus={() => {
            setShowError(false);
          }}
        />

        <View style={{marginTop: 32}} />
        {loading === true ? (
          <ActivityIndicator />
        ) : (
          <>
            <ButtonPrimary
              onPress={() => {
                setLoading(true);
                authentication();
              }}>
              ENTRAR
            </ButtonPrimary>
            <ButtonSecondary
              onPress={() => {
                navigation.navigate('Register');
              }}>
              CADASTRAR
            </ButtonSecondary>
          </>
        )}
        <GrayText>
          Está é uma versão de testes, erros e bugs podem aparecer com certa
          frequência {"\n"}Por favor, tenha paciência
        </GrayText>
      </WhiteArea>
    </View>
  );
}
