/* eslint-disable no-catch-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';
import {getDatabase, ref, set} from 'firebase/database';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import * as ImagePicker from 'react-native-image-picker';
import {getFirestore, collection, addDoc} from 'firebase/firestore';

import Input from '../components/Input';
import InputPassword from '../components/InputPassword';
import TitleSection from '../components/TitleSection';
import WhiteArea from '../components/WhiteArea';
import {theme} from '../global/styles/theme';
import ButtonSecondary from '../components/ButtonSecondary';
import ButtonPrimary from '../components/ButtonPrimary';
import firebase from '../config/firebase';
import InputPhotoArea from '../components/InputPhotoArea';
import ErrorMessage from '../components/ErrorMessage';

export default function Register({navigation}) {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [presentation, setPresentation] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [profilePhoto, setProfilePhoto] = useState();
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');

  const writeUserData = () => {
    const db = getDatabase();
    const auth = getAuth();
    if (name || phone || email || presentation || password) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then(userCredential => {
            set(ref(db, 'users/' + userCredential.user.uid), {
              name: name,
              email: email,
              phone: phone,
              presentation: presentation,
              password: password,
              photo: profilePhoto,
              status: 'aguardando',
              type: 'comprador',
            });
            console.log('Concluído');
          })
          .catch(err => {
            console.log(`message: ${err.message} code: ${err.code}`);
            if (err.code === ' auth/email-already-in-use') {
              setShowError(true);
              setError('Email já existente');
            } else if (err.code === 'auth/internal-error') {
              setShowError(true);
              setError('Campo vazio');
            }
          });
      } else {
        setShowError(true);
        setError('As senhas devem coincidir');
      }
    } else {
      setShowError(true);
      setError('Todos os campos devem ser preenchidos');
    }
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
          onFocus={() => {
            setShowError(false);
          }}
        />
        <Input
          placeholder="Telefone"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setPhone(text)}
          value={phone}
          type="phone-pad"
          onFocus={() => {
            setShowError(false);
          }}
        />
        <Input
          placeholder="E-mail"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setEmail(text)}
          value={email}
          keyboardType="email-address"
          onFocus={() => {
            setShowError(false);
          }}
        />
        <Input
          placeholder="Apresentação (Fale sobre você)"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setPresentation(text)}
          value={presentation}
          keyboardType="default"
          style={styles.inputPresentation}
          onFocus={() => {
            setShowError(false);
          }}
        />
        <InputPhotoArea
          openGallery={() => {
            setShowError(false);
            ImagePicker.launchImageLibrary({includeBase64: true}, data => {
              if (data.didCancel !== true) {
                setProfilePhoto(data.assets[0].base64);
              }
            });
          }}
          openCamera={() => {
            setShowError(false);
            const options = {
              maxWidth: 2000,
              maxHeight: 2000,
              storageOptions: {
                skipBackup: true,
                path: 'images',
              },
            };
            ImagePicker.launchCamera(options, data => {
              if (data.didCancel !== true) {
                setProfilePhoto(data.assets[0].base64);
              }
            });
          }}
        />

        <InputPassword
          placeholder="Senha"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setPassword(text)}
          value={password}
          keyboardType="default"
          onFocus={() => {
            setShowError(false);
          }}
        />
        <InputPassword
          placeholder="Confirmar senha"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
          keyboardType="default"
          onFocus={() => {
            setShowError(false);
          }}
        />
        {showError ? <ErrorMessage>{error}</ErrorMessage> : null}
        <View style={{marginTop: 41}} />
        <ButtonPrimary onPress={() => writeUserData()}>CADASTRAR</ButtonPrimary>
        <ButtonSecondary
          onPress={() => {
            navigation.navigate("Login");
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
