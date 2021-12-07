import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CardContainer from '../components/CardContainer';
import HighlightedText from '../components/HighlightedText';
import IconMedium from '../components/IconMedium';
import TextCard from '../components/TextCard';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import { theme } from '../global/styles/theme';

export default function ProductManagement({ navigation: { navigate } }) {
  return (
    <View>
      <TopScreen>
        <TitleScreen>Gerenciamento de Produtos</TitleScreen>
      </TopScreen>
      <WhiteAreaWithoutScrollView>
        <HighlightedText>Gerenciar</HighlightedText>

        <View style={{ marginTop: 8 }} />
        <CardContainer
          onPress={() => {
            navigate('ProductList');
          }}>
          <TextCard>Visualizar produtos</TextCard>
          <IconMedium name="chevron-right" color={theme.pallete.primary002} />
        </CardContainer>

        <View style={{ marginTop: 8 }} />
        <CardContainer
          onPress={() => {
            navigate('ProductListDelete');
          }}>
          <TextCard>Remover produto</TextCard>
          <IconMedium name="chevron-right" color={theme.pallete.primary002} />
        </CardContainer>

        <View style={{ marginTop: 8 }} />
        <CardContainer
          onPress={() => {
            navigate('ProductList');
          }}>
          <TextCard>Editar produto</TextCard>
          <IconMedium name="chevron-right" color={theme.pallete.primary002} />
        </CardContainer>

        <View style={{ marginTop: 8 }} />
        <CardContainer
          onPress={() => {
            navigate('RegisterProduct');
          }}>
          <TextCard>Cadastrar produto </TextCard>
          <IconMedium name="chevron-right" color={theme.pallete. primary002} />
        </CardContainer>



      </WhiteAreaWithoutScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
