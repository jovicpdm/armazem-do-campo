import React from 'react';
import {SafeAreaView} from 'react-native';

import ButtonPrimary from '../components/ButtonPrimary';
import FeedbackLogin from '../components/FeedbackLogin';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import {theme} from '../global/styles/theme';
import Logo from '../components/Logo';


export default function Waiting({navigation: {goBack}, route}) {
  const {params} = route;

  return (
    <SafeAreaView>
      <Logo />
      <TopScreen>
        <SafeAreaView style={{alignItems: 'center'}}>
          <TitleScreen>Atenção</TitleScreen>
        </SafeAreaView>
      </TopScreen>
      <SafeAreaView>
        <SafeAreaView
          style={{
            justifyContent: 'space-between',
            height: 550,
          }}>
          <FeedbackLogin
            color={
              params.status === 'aguardando'
                ? theme.pallete.yellow
                : theme.pallete.red
            }>
            {params.status === 'aguardando'
              ? 'Seu cadastro ainda está em análise pelo administrador, por favor tente mais tarde!'
              : 'Infelizmente seu cadastro não foi aprovado, agradecemos o interesse em participar!'}
          </FeedbackLogin>
          <ButtonPrimary onPress={() => goBack()}>Voltar</ButtonPrimary>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
}
