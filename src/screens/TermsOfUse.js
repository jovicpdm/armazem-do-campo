import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList,View} from 'react-native';
import {getDatabase, ref, onValue} from 'firebase/database';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import WhiteArea from '../components/WhiteAreaFlatList';
import Logo from '../components/Logo';
import { Text } from 'react-native-elements';
import { DataTerms } from '../../DataTerms';
import {theme} from '../global/styles/theme'


export default function TermsOfUse() {
    const renderItem = ({ item }) => (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{item.secao}</Text>
        {item.itens.map((subitem, subIndex) => (
          <Text key={subIndex} style={styles.itemText}>
            {`${subIndex + 1}. ${subitem}`}
          </Text>
        ))}
      </View>
    );
  
    return (
      <>
        <Logo />
        <TopScreen>
          <TitleScreen>Termos De Uso</TitleScreen>
        </TopScreen>
        <WhiteAreaWithoutScrollView>
          <FlatList
            data={DataTerms.conteudo}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </WhiteAreaWithoutScrollView>
      </>
    );
  }
  
  const styles = StyleSheet.create({
    sectionContainer: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.pallete.gray001,
    },
    sectionTitle: {
      fontFamily: 'Roboto-Bold',
      fontSize: 18,
      marginBottom: 8,
    },
    itemText: {
      fontFamily: 'Roboto-Regular',
      fontSize: 16,
      marginLeft: 16,
      marginBottom: 4,
    },
  });