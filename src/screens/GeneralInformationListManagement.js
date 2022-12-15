import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import CardContainer from '../components/CardContainer';
import IconMedium from '../components/IconMedium';
import TextCard from '../components/TextCard';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteArea from '../components/WhiteArea';
import { theme } from '../global/styles/theme';
import Logo from '../components/Logo';

export default function GeneralInformationListManagement({ navigation: {navigate} }) {
  return (
    <SafeAreaView>
      <Logo/>
      <TopScreen>
        <TitleScreen>Gerenciamento de prazos</TitleScreen>
      </TopScreen>

      <WhiteArea>
        
        <SafeAreaView style={{ marginTop: 8 }} />

        <CardContainer
          onPress={() => {
            navigate('GeneralInformationList');
          }}>
          <TextCard>Exibir prazos</TextCard>
          <IconMedium name="chevron-right" color={theme.pallete. primary002} />
        </CardContainer>

        <SafeAreaView style={{ marginTop: 8 }} />
        <CardContainer
          onPress={() => {
            navigate('GeneralInformation');
          }}>
          <TextCard>Alterar prazos</TextCard>
          <IconMedium name="chevron-right" color={theme.pallete. primary002} />
        </CardContainer>
       
      </WhiteArea>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
