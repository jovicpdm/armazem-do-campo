import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {theme} from '../global/styles/theme';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import HighlightedText from '../components/HighlightedText';
import CardContainer from '../components/CardContainer';

export default function Admin() {
  return (
    <View>
      <TopScreen>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TitleScreen>Seja bem vindo, Admin!</TitleScreen>
          <Icon
            name="user-circle"
            size={48}
            color={theme.pallete.textTitleScreen}
          />
        </View>
      </TopScreen>
      <WhiteAreaWithoutScrollView>
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <HighlightedText style={{marginTop: 32}}>
            Gerenciamento
          </HighlightedText>
        </View>
        <View style={{marginVertical: 24}} />
        <CardContainer></CardContainer>
        <CardContainer></CardContainer>
      </WhiteAreaWithoutScrollView>
    </View>
  );
}
