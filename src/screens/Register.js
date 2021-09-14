import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import Input from '../components/Input';
import ButtonPrimary from '../components/ButtonPrimary';
import { theme } from '../global/styles/theme';
import ButtonSecondary from '../components/ButtonSecondary';


export function Register() {
  const [name, onChangeName] = useState();
  const [phone, onChangePhone] = useState();
  const [email, onChangeEmail] = useState();
  const [presentation, onChangePresentation] = useState();
  const [password, onChangePassword] = useState();
  const [confirmPassword, onChangeConfirmPassword] = useState();
  
  


  return (
    <View style={styles.telaCadastro}>
      <Text style={styles.textTitle}>
        Faça parte da Rede de Comercialização de produtos da reforma agrária popular.
      </Text>
      <View style={styles.inputArea}>
        <Input style={styles.inputSize}
          placeholder={'Nome'}
          onChangeText={onChangeName}
        />
        <Input style={styles.inputSize}
          placeholder={'Telefone'}
          onChangeText={onChangePhone}  
        />
        <Input style={styles.inputSize}
          placeholder={'Email'}
          onChangeText={onChangeEmail}
        />
        <Input
          placeholder={'Apresentação'}
          onChangeText={onChangePresentation}
          style={{ height: 121, marginTop: 16 }}
        />
        <Input style={styles.inputSize}
          placeholder={'Senha'}
          onChangeText={onChangePassword}
        />
        <Input style={styles.inputSize}
          placeholder={'Confirmar Senha'}
          onChangeText={onChangeConfirmPassword}
        />
        <Text>{name}</Text>
        <Text>{phone}</Text>
        <Text>{email}</Text>
        {/* <Text>{presentation}</Text>
        <Text>{password}</Text>
        <Text>{confirmPassword}</Text> */}
        <ButtonPrimary>CADASTRAR</ButtonPrimary>
        <ButtonSecondary> ENTRAR </ButtonSecondary>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  telaCadastro: {
    position: 'relative',
    backgroundColor: '#1B5338',
  },
  inputArea: {
    backgroundColor: theme.pallete.white,
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  textTitle: {
    top: 23,
    height: 140,
    color: '#ffffff',
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  inputSize: {
    marginTop: 16, 
    height: 48
  }
})







export default Register;


