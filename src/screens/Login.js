/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import Logo from '../components/Logo';
import Input from '../components/Input';
import ButtonPrimary from '../components/ButtonPrimary';
import {theme} from '../global/styles/theme';
import ButtonSecondary from '../components/ButtonSecondary';
import WhiteArea from '../components/WhiteArea';
import TitleSection from '../components/TitleSection';
// import firebase from '../config/firebase';

export function Login({navigation}) {
  // const [email, onChangeEmail] = useState();
  // const [password, onChangePassword] = useState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState('');
  const [user, setUser] = useState();

  const auth = getAuth();
  const authentication = () =>
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setUser(userCredential.user.email);
      })
      .catch(error => {
        alert('')
      });

  // const loginFirebase = () => {
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then(userCredential => {
  //       let user = userCredential.user;
  //       console.log(user);
  //       setErrorLogin(user);
  //     })
  //     .catch(error => {
  //       setErrorLogin(true);
  //       let errorCode = error.code;
  //       let errorMessage = error.message;
  //     });
  // };

  useEffect(() => {}, []);

  return (
    <View>
      <Logo />
      <WhiteArea>
        <TitleSection>Entrar</TitleSection>
        <Input
          placeholder={'Email'}
          placeholderTextColor={theme.pallete.primary}
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
          placeholderTextColor={theme.pallete.primary}
          keyboardType="default"
          onChangeText={text => setPassword(text)}
          value={password}
          // onChangeText={onChangePassword}
        />
        {/* {errorLogin === true
          ?
          <View style={styles.contentAlert}>
            <Text style={styles.warningAlert}>Email ou senha inválidos</Text>
          </View>
          :
          <View />
        } */}

        <View style={{marginTop: 32}} />
        <ButtonPrimary onPress={() => authentication()}>ENTRAR</ButtonPrimary>
        <ButtonSecondary
          onPress={() => {
            navigation.navigate('Register');
          }}>
          CADASTRAR
        </ButtonSecondary>
        <Text>{user}</Text>
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
