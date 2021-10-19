/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import ButtonSecondary from '../components/ButtonSecondary';

import FeedbackLogin from '../components/FeedbackLogin';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import {theme} from '../global/styles/theme';

export default function Waiting({navigation: {goBack}, route}) {
  const {params} = route;

  return (
    <View>
      <TopScreen>
        <View style={{alignItems: 'center'}}>
          <TitleScreen>Oops</TitleScreen>
        </View>
      </TopScreen>
      <WhiteAreaWithoutScrollView>
        <View
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
              ? 'Seu cadastro ainda está em análise, por favor, aguarde'
              : 'Infelizmente seu cadastro não foi aprovado, agradecemos o interesse em participar da rede'}
          </FeedbackLogin>
          <ButtonSecondary onPress={() => goBack()}>Voltar</ButtonSecondary>
        </View>
      </WhiteAreaWithoutScrollView>
    </View>
  );
}
