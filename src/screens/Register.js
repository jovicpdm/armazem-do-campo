/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {getDatabase, ref, set, push} from 'firebase/database';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

import Input from '../components/Input';
import TitleSection from '../components/TitleSection';
import WhiteArea from '../components/WhiteArea';
import {theme} from '../global/styles/theme';
import ButtonSecondary from '../components/ButtonSecondary';
import ButtonPrimary from '../components/ButtonPrimary';
import firebase from '../config/firebase';

export default function Register({navigation}) {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [presentation, setPresentation] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  //  const uid = getDatabase().ref().child('users').push().key;

  const writeUserData = () => {
    const db = getDatabase();
    const auth = getAuth();
    const userRef = ref(db, 'users');
    const newUserRef = push(userRef);
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // eslint-disable-next-line no-undef
        set(newUserRef, {
          name: name,
          email: email,
          phone: phone,
          presentation: presentation,
          password: password,
          status: 'aguardando',
          type: 'comprador',
        });
      })
      .catch(error => {
        console.log(`message: ${error.message} code: ${error.code}`);
        if (error.code === ' auth/email-already-in-use') {
          showMessage({
            message: 'Email já existente',
            description: 'Por favor, insira um novo email',
            type: 'danger',
          });
        } else if (error.code === 'auth/internal-error') {
          showMessage({
            message: 'Campo vazio',
            description: 'Por favor, digite email e senha',
            type: 'danger',
          });
        }
      });
  };

  return (
    <ScrollView contentContainerStyle={{maxHeight: '100%'}}>
      <Text style={styles.presentation}>
        Faça parte da Rede de Comercialização de produtos da reforma agrária
        popular
      </Text>
      <WhiteArea>
        <TitleSection>Cadastrar</TitleSection>
        <Input
          placeholder="Nome"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setName(text)}
          value={name}
          keyboardType="default"
          style={{marginTop: 16}}
        />
        <Input
          placeholder="Telefone"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setPhone(text)}
          value={phone}
          type="phone-pad"
        />
        <Input
          placeholder="E-mail"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
        <Input
          placeholder="Apresentação (Fale sobre você)"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setPresentation(text)}
          value={presentation}
          keyboardType="default"
          style={styles.inputPresentation}
        />
        <Input
          placeholder="Senha"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
          keyboardType="default"
        />
        <Input
          placeholder="Confirmar senha"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
          keyboardType="default"
          secureTextEntry={true}
        />
        <View style={{marginTop: 41}} />
        <ButtonPrimary onPress={() => writeUserData()}>CADASTRAR</ButtonPrimary>
        <ButtonSecondary
          onPress={() => {
            navigation.navigate('Login');
          }}>
          ENTRAR
        </ButtonSecondary>
      </WhiteArea>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  presentation: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: theme.pallete.white,
    textAlign: 'center',
    marginVertical: 24,
    paddingHorizontal: 28,
  },
  inputPresentation: {
    paddingVertical: 60,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
