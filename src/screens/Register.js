import React, {useState} from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';
import Input from '../components/Input';
import TitleSection from '../components/TitleSection';
import WhiteArea from '../components/WhiteArea';
import {theme} from '../global/styles/theme';

export default function Register() {
  const [user, setUser] = useState({
    name: '',
    phone: Number,
    email: '',
    presentation: '',
    password: '',
  });

  return (
    <ScrollView contentContainerStyle={{maxHeight: '100%'}}>
      <Text style={styles.presentation}>
        Faça parte da Rede de Comercialização de produtos da reforma agrária
        popular
      </Text>
      <WhiteArea>
        <TitleSection>Cadastrar</TitleSection>
        <Input placeholder="Nome" style={{marginTop: 16}} />
        <Input placeholder="Telefone" type="phone-pad" />
        <Input placeholder="E-mail" type="email-address" />
        <Input
          placeholder="Apresentação"
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
