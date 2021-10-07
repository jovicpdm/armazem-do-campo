/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getDatabase, ref, onValue} from 'firebase/database';

import {theme} from '../global/styles/theme';
// eslint-disable-next-line no-unused-vars
import firebase from '../config/firebase';
import MySearchBar from '../components/MySearchBar';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import HighlightedText from '../components/HighlightedText';
import CategoryLabel from '../components/CategoryLabel';

export default function Purchase({navigation}) {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(0);
  const db = getDatabase();
  const dbRef = ref(db, 'categories');

  const listCategories = async () => {
    const dataArray = [];
    await new Promise(resolve => {
      onValue(dbRef, snapshot => {
        snapshot.forEach(snap => {
          dataArray.push(snap.val());
        });
        resolve();
      });
    });
    setCategories(dataArray);
  };

  useEffect(() => {
    listCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item}) => {
    return (
      <CategoryLabel
        description={item.description}
        onPress={() => setSelected(item.id)}
        color={
          item.id === selected ? theme.pallete.primary004 : theme.pallete.black
        }
      />
    );
  };

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
      <WhiteAreaWithoutScrollView>
        <View style={{marginTop: 16}} />
        <HighlightedText>Categorias</HighlightedText>
        <View style={{marginBottom: 16}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={categories}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        <HighlightedText>Produtos</HighlightedText>
      </WhiteAreaWithoutScrollView>
    </View>
  );
}

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
