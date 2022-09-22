import React, {useState} from 'react';
import {ScrollView, Text, StyleSheet, View, Alert} from 'react-native';
import {getDatabase, ref, set} from 'firebase/database';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth/react-native';
import * as ImagePicker from 'react-native-image-picker';
import Input from '../components/Input';
import InputPassword from '../components/InputPassword';
import TitleSection from '../components/TitleSection';
import WhiteArea from '../components/WhiteArea';
import {theme} from '../global/styles/theme';
import ButtonPrimary from '../components/ButtonPrimary';
import InputPhotoArea from '../components/InputPhotoArea';
import ErrorMessage from '../components/ErrorMessage';

// import storage from '@react-native-firebase/storage';


export default function Register({navigation}) {

  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [presentation, setPresentation] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [profilePhoto, setProfilePhoto] = useState();
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');


  function writeUserData () {

    const db = getDatabase();
    const auth = getAuth();

    if (name || phone || email || address || presentation || password) {

      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then(userCredential => {
            set(ref(db, 'users/' + userCredential.user.uid), {
              name: name,
              email: email,
              address: address,
              phone: phone,
              presentation: presentation,
              password: password,
              photo: profilePhoto,
              status: 'aguardando',
              type: 'comprador',
            });
          })

          .catch(err => {
            console.log(`mensagem: ${err.message} code: ${err.code}`);

            if (err.code === 'auth/email-already-in-use') {
              setShowError(true);
              Alert.alert("Atenção",'E-mail já existente');
              return;
            } else if (err.code === 'auth/internal-error') {
              setShowError(true);
              setError('Atenção, existem campos a serem preenchidos');
              return;
            }
            else if (err.code === 'auth/invalid-email') {
              setShowError(true);
              Alert.alert("Atenção",'E-mail inválido, verifique espaços em branco ou caracteres inválidos');
              return;
            }
            else if (err.code === 'auth/weak-password') {
              setShowError(true);
              Alert.alert("Atenção",'Sua senha deve ter no mínimo 6 caracteres');
              return;
            }
          });
      } 
      else {
        setShowError(true);
        setError('As senhas devem coincidir');
        return;
      }
    }    
     else {
      setShowError(true);
      setError('Todos os campos devem ser preenchidos');
     }    

     if (!name ){
       setShowError(true);
       Alert.alert("Atenção",'Preencha o campo relacionado ao seu nome');
       return;
     }

     if (!phone){
      setShowError(true);
      Alert.alert("Atenção",'Preencha o campo relacionado ao seu telefone');
      return;
    }

     if (!email){
       setShowError(true);
       Alert.alert("Atenção",'Preencha o campo relacionado ao seu e-mail');
       return;
     }
 
     if (!address){
       setShowError(true);
       Alert.alert("Atenção",'Preencha o campo relacionado ao seu endereço');
       return;
     }     
 
     if (!presentation){
       setShowError(true);
       Alert.alert("Atenção",'Por favor, faça uma breve apresentação sobre você');
       return;
     }
 
     if (!profilePhoto){
       setShowError(true);
       Alert.alert("Atenção",'Por favor, faça o upload de uma foto sua');
       return;
     }

     if (!password){
      setShowError(true);
      Alert.alert("Atenção",'Por favor, digite uma senha');
      return;
    }

    if (!confirmPassword){
      setShowError(true);
      Alert.alert("Atenção",'Por favor, confirme sua senha');
      return;
    }

    if (auth.currentUser && !showError){
        Alert.alert("Cadastro de colaboradores",
        "Colaborador cadastrado com sucesso",
        [    
          { text: "OK", onPress: () => navigation.navigate('Login') }
        ]
        );
  }};

  return (

    <ScrollView contentContainerStyle={{maxHeight: '100%'}}>
      <Text style={styles.presentation}>
        Faça parte da rede de comercialização de produtos da reforma agrária
        popular
      </Text>
      <WhiteArea>
        <TitleSection>Cadastro de colaboradores</TitleSection>
        <Input
          placeholder="Digite seu nome completo"
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
          placeholder="Digite seu telefone"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setPhone(text)}
          value={phone}
          type="phone-pad"
          onFocus={() => {
            setShowError(false);
          }}
        />
        <Input
          placeholder="Digite seu e-mail"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setEmail(text)}
          value={email}
          keyboardType="email-address"
          onFocus={() => {
            setShowError(false);
          }}
        />
         <Input
          placeholder="Digite seu endereço"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setAddress(text)}
          value={address}
          keyboardType="default"
          style={{marginTop: 16}}
          onFocus={() => {
            setShowError(false);
          }}
        />
        <Input
          placeholder="Faça uma apresentação sobre você"
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

                // console.log (data.assets[0].uri);
                // storage().ref(data.assets[0].uri).put(profilePhoto);
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
          placeholder="Digite sua senha (6 caracteres)"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setPassword(text)}
          value={password}
          keyboardType="default"
          onFocus={() => {
            setShowError(false);
          }}
        />
        <InputPassword
          placeholder="Confirme sua senha"
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
        <ButtonPrimary onPress={() =>
                                 {writeUserData();}}>CADASTRAR</ButtonPrimary>
      
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
