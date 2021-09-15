/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Logo from '../components/Logo';
import Input from '../components/Input';
import ButtonPrimary from '../components/ButtonPrimary';
import {theme} from '../global/styles/theme';
import ButtonSecondary from '../components/ButtonSecondary';
import WhiteArea from '../components/WhiteArea';
import TitleSection from '../components/TitleSection';

export function Login({navigation}) {
  const [email, onChangeEmail] = useState();
  const [password, onChangePassword] = useState();

  return (
    <View>
      <Logo />
      <WhiteArea>
        <TitleSection>Entrar</TitleSection>
        <Input
          placeholder={'Email'}
          onChangeText={onChangeEmail}
          //react-native/no-inline-styles
          style={{marginTop: 16}}
        />
        <Input placeholder={'Senha'} onChangeText={onChangePassword} />
        <View style={{marginTop: 32}} />
        <ButtonPrimary>ENTRAR</ButtonPrimary>
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
});

export default Login;
