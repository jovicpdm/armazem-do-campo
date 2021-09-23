/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';

import Input from '../components/Input';
import TitleSection from '../components/TitleSection';
import WhiteArea from '../components/WhiteArea';
import {theme} from '../global/styles/theme';

export default function Register() {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [presentation, setPresentation] = useState();
  const [password, setPassword] = useState();

  const [user, setUser] = useState({
    name: '',
    phone: Number,
    email: '',
    presentation: '',
    password: '',
  });

  const inputName = event => setName(event.target.value);
  const inputPhone = event => setPhone(event.target.value);
  const inputEmail = event => setEmail(event.target.value);
  const inputPresentation = event => setPresentation(event.target.value);
  const inputPassword = event => setPassword(event.target.value);

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
          onChangeText={inputName}
          style={{marginTop: 16}}
        />
        <Input
          placeholder="Telefone"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={inputPhone}
          type="phone-pad"
        />
        <Input
          placeholder="E-mail"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={inputEmail}
          type="email-address"
        />
        <Input
          placeholder="Apresentação (Fale sobre você)"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={inputPresentation}
          type="ascii-capable"
          style={styles.inputPresentation}
        />
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
