import React, {useState} from 'react';
import {SafeAreaView, ActivityIndicator, Text, LogBox} from 'react-native';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth/react-native';
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
import RowHorizontal from '../components/Rowhorizontal';
import { SocialIcon } from 'react-native-elements'

export default function Login({navigation}) {

  LogBox.ignoreLogs([
    'Warning: isMounted(...) is deprecated', 
    'Module RCTImageLoader',
    'Require cycle:', ]);  

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
          setError('E-mail inválido!');
        } else if (err.code === 'auth/internal-error') {
          setError('Senha inválida!');
        } else if (err.code === 'auth/user-not-found') {
          setError('Usuário não encontrado!');
        } else if (err.code === 'auth/wrong-password') {
          setError('Senha incorreta!');
        }
        setShowError(true);
      });

  return (

    <SafeAreaView>
      <Logo />

      <WhiteArea>
        <TitleSection>Bem-vindo</TitleSection>

        {showError === false ? null : <ErrorMessage> {error} </ErrorMessage>}

        <Input
          placeholder={'Digite seu e-mail'}
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          value={email}
          onFocus={() => {
            setShowError(false);
          }}
          style={{marginTop: 16}}
        />
        <InputPassword
          placeholderTextColor={theme.pallete.primary}
          placeholder={'Digite sua senha'}
          keyboardType="default"
          onChangeText={text => setPassword(text)}
          value={password}
          onFocus={() => {
            setShowError(false);
          }}
        />

        <SafeAreaView style={{marginTop: 32}} />

        {loading === true ? (<ActivityIndicator />) : (
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


        <SafeAreaView style ={{ flexDirection:'row',marginHorizontal:14,alignItems:'center'}} >
        <RowHorizontal></RowHorizontal>
        <Text style={{fontSize:11,paddingHorizontal:6}}>OU</Text>
        <RowHorizontal></RowHorizontal>
      </SafeAreaView>

      <Text style={{marginTop:10,marginBottom:5,fontSize:16,textAlign:'center'}}>Entrar com:</Text>
      <SocialIcon
        title='Google'
        button
        type='google'
        
        />
      <SocialIcon
        title='Facebook'
        button
        type='facebook'
        />
      </WhiteArea>
    </SafeAreaView>
  );
}
