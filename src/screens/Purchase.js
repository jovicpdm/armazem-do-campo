/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '../global/styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

import MySearchBar from '../components/MySearchBar';
import WhiteArea from '../components/WhiteArea';
import HighlightedText from '../components/HighlightedText';

const Purchase = () => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.welcomeContainer}>
          <View style={{marginRight: 48}}>
            <Text style={styles.welcomeTitle}>Seja Bem Vindo!</Text>
            <Text style={styles.welcomeSubtitle}>
              Compre alimentos direto do produtor
            </Text>
          </View>
          <Icon
            name="user-circle"
            size={48}
            color={theme.pallete.textTitleScreen}
          />
        </View>
        <MySearchBar placeholder="Pesquisar" />
      </View>
      <WhiteArea>
        <View style={{marginTop: 16}} />
        <HighlightedText>Categorias</HighlightedText>
      </WhiteArea>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 28,
    paddingVertical: 20,
  },
  welcomeContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.pallete.textTitleScreen,
    fontFamily: 'Roboto-Bold',
  },
  welcomeSubtitle: {
    fontSize: 12,
    color: theme.pallete.textTitleScreen,
    letterSpacing: 0.4,
    fontFamily: 'Roboto-Regular',
  },
});

export default Purchase;
