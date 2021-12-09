import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CardContainer from '../components/CardContainer';
import HighlightedText from '../components/HighlightedText';
import IconMedium from '../components/IconMedium';
import TextCard from '../components/TextCard';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import {theme} from '../global/styles/theme';

export default function ParticipantManagement({navigation: {navigate}}) {
  return (
    <>
      <TopScreen>
        <TitleScreen>Gerenciamento de Participantes</TitleScreen>
      </TopScreen>
      <WhiteAreaWithoutScrollView>
        <HighlightedText>Gerenciar</HighlightedText>
        <View style={{marginTop: 8}} />
        <CardContainer
          onPress={() => {
            navigate('Requests');
          }}>
          <TextCard>Solicitações</TextCard>
          <IconMedium name="chevron-right" color={theme.pallete.primary002} />
        </CardContainer>
      </WhiteAreaWithoutScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
