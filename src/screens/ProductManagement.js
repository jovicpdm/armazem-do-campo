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

export default function ProductManagement({ navigation: { navigate } }) {
  return (
    <SafeAreaView>
      <Logo/>
      <TopScreen>
        <TitleScreen>Gerenciamento de produtos</TitleScreen>
      </TopScreen>

      <WhiteArea>
        <SafeAreaView style={{ marginTop: 8 }} />
        <CardContainer
          onPress={() => {
            navigate('ProductList');
          }}>
          <TextCard>Visualizar produtos</TextCard>
          <IconMedium name="chevron-right" color={theme.pallete.primary002} />
        </CardContainer>

        <SafeAreaView style={{ marginTop: 8 }} />
        <CardContainer
          onPress={() => {
            navigate('ProductListDelete');
          }}>
          <TextCard>Remover produtos</TextCard>
          <IconMedium name="chevron-right" color={theme.pallete.primary002} />
        </CardContainer>

        <SafeAreaView style={{ marginTop: 8 }} />
        <CardContainer
          onPress={() => {
            navigate('EditProduct');
            navigate('ProductList');
          }}>
          <TextCard>Editar produtos</TextCard>
          <IconMedium name="chevron-right" color={theme.pallete.primary002} />
        </CardContainer>

        <SafeAreaView style={{ marginTop: 8 }} />
        <CardContainer
          onPress={() => {
            navigate('RegisterProduct');
          }}>
          <TextCard>Cadastrar produtos</TextCard>
          <IconMedium name="chevron-right" color={theme.pallete. primary002} />
        </CardContainer>

        <SafeAreaView style={{ marginTop: 8 }} />
        <CardContainer
          onPress={() => {
            navigate('GeneralInformation');
          }}>
          <TextCard>Informações gerais</TextCard>
          <IconMedium name="chevron-right" color={theme.pallete. primary002} />
        </CardContainer>
      </WhiteArea>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
