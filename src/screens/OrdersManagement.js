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

export default function OrdersManagement({ navigation: {navigate} }) {
  return (
    <SafeAreaView>
      <Logo/>
      <TopScreen>
        <TitleScreen>Gerenciamento de pedidos</TitleScreen>
      </TopScreen>

      <WhiteArea>
        <SafeAreaView style={{ marginTop: 8 }} />
        <CardContainer
          onPress={() => {
            navigate('Orders');
          }}>
          <TextCard>Autorizar pedidos</TextCard>
          <IconMedium name="chevron-right" color={theme.pallete.primary002} />
        </CardContainer>

        <SafeAreaView style={{ marginTop: 8 }} />

        <CardContainer
          onPress={() => {
            navigate('OrdersApproved');
          }}>
          <TextCard>Exibir pedidos aprovados</TextCard>
          <IconMedium name="chevron-right" color={theme.pallete. primary002} />
        </CardContainer>

        <SafeAreaView style={{ marginTop: 8 }} />
        <CardContainer
          onPress={() => {
            navigate('OrdersDisapproved');
          }}>
          <TextCard>Exibir pedidos reprovados</TextCard>
          <IconMedium name="chevron-right" color={theme.pallete.primary002} />
        </CardContainer>

        <SafeAreaView style={{ marginTop: 8 }} />
        <CardContainer
          onPress={() => {
            navigate('GeneralInformationListManagement');
          }}>
          <TextCard>Prazos</TextCard>
          <IconMedium name="chevron-right" color={theme.pallete. primary002} />
        </CardContainer>
       
      </WhiteArea>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
