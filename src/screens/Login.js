/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
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

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const db = getDatabase();
  const auth = getAuth();
  const authentication = () =>
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // navigation.navigate('Purchase');
        console.log(userCredential);
        const userRef = ref(db, 'users/' + userCredential.user.uid);
        onValue(userRef, snapshot => {
          const data = snapshot.val();
          if (data.type === 'admin') {
            navigation.navigate('Admin');
          }
          if (data.status === 'aguardando') {
            navigation.navigate('Waiting');
          } else if (data.status === 'reprovado') {
            navigation.navigate('Disapproved');
          } else if (data.status === 'aprovado') {
            navigation.navigate('Purchase');
          }
        });
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
