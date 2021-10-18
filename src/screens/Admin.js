/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

import {theme} from '../global/styles/theme';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import HighlightedText from '../components/HighlightedText';
import CardContainer from '../components/CardContainer';
import AdminNotification from '../components/AdminNotification';

export default function Admin() {
  return (
    <View>
      <TopScreen>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TitleScreen>Seja bem vindo, Admin!</TitleScreen>
          <Icon
            name="account-circle-outline"
            type="material-community"
            size={48}
            color={theme.pallete.textTitleScreen}
          />
        </View>
      </TopScreen>
      <WhiteAreaWithoutScrollView>
        <View style={{marginTop: 20, alignItems: 'center'}}>
          <HighlightedText>Gerenciamento</HighlightedText>
        </View>
        <View style={{marginVertical: 8}} />
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <CardContainer
            background={theme.pallete.primary004}
            onPress={() => alert('produto')}>
            <Icon
              name="shopping-outline"
              type="material-community"
              size={40}
              color={theme.pallete.white}
            />
            <Text style={styles.textCard}>Produtos</Text>
          </CardContainer>
          <CardContainer
            background={theme.pallete.primary004}
            onPress={() => alert('participante')}>
            <Icon
              name="account-group-outline"
              type="material-community"
              size={40}
              color={theme.pallete.white}
            />
            <Text style={[styles.textCard, {marginHorizontal: 8}]}>
              Participantes
            </Text>
          </CardContainer>
        </View>
        <View style={{marginVertical: 24}}>
          <HighlightedText>Últimas atividades</HighlightedText>
        </View>
        <AdminNotification>
          Fulano de Tal deseja se juntar à rede
        </AdminNotification>
      </WhiteAreaWithoutScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textCard: {
    color: theme.pallete.white,
    marginHorizontal: 24,
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
  },
});
