/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Modal, Portal, Provider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getDatabase, ref, onValue} from 'firebase/database';

import {theme} from '../global/styles/theme';
// eslint-disable-next-line no-unused-vars
import firebase from '../config/firebase';
import MySearchBar from '../components/MySearchBar';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import HighlightedText from '../components/HighlightedText';
import CategoryLabel from '../components/CategoryLabel';
import ProductCard from '../components/ProductCard';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import ProfilePhoto from '../components/ProfilePhoto';
import ProfileModal from '../components/ProfileModal';

export default function Purchase({navigation, route}) {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(0);
  const [product, setProduct] = useState();
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(false);

  const containerStyle = {backgroundColor: 'white', padding: 20};

  const db = getDatabase();
  const listCategories = async () => {
    const dbRef = ref(db, 'categories');
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

  const searchUser = async () => {
    let data = {};
    const dbRef = ref(db, 'users/' + route.params.id);
    await new Promise(resolve => {
      onValue(dbRef, snapshot => {
        let {photo, name, email, phone, presentation} = snapshot.val();
        data = {
          id: snapshot.key,
          photo: photo,
          name: name,
          email: email,
          phone: phone,
          presentation: presentation,
        };
        resolve();
      });
    });
  };

  useEffect(() => {
    listCategories();
  }, []);

  useEffect(() => {
    searchUser();
  }, []);

  return (
    <View>
      <TopScreen>
        <View style={styles.welcomeContainer}>
          <View style={{marginRight: 48}}>
            <TitleScreen textAlign="left">Seja Bem Vindo</TitleScreen>
            <Text style={styles.welcomeSubtitle}>
              Compre alimentos direto do produtor
            </Text>
          </View>
          <ProfilePhoto photo={`${user.photo}`} />
        </View>
        <MySearchBar placeholder="Pesquisar" />
        <View style={{marginTop: 8}}>
          <Text style={styles.welcomeSubtitle}>
            Fechamento da compra: 18/01
          </Text>
          <Text style={styles.welcomeSubtitle}>Proxima entrega: 18/01</Text>
        </View>
      </TopScreen>
      <WhiteAreaWithoutScrollView>
        <HighlightedText>Categorias</HighlightedText>
        <View style={{marginBottom: 16}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={categories}
            renderItem={({item}) => {
              return (
                <CategoryLabel
                  description={item.description}
                  onPress={() => setSelected(item.id)}
                  color={
                    item.id === selected
                      ? theme.pallete.primary004
                      : theme.pallete.black
                  }
                />
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
        <HighlightedText>Produtos</HighlightedText>
        <ProductCard
          onPress={() => {
            navigation.navigate('ProductInfo');
          }}
          name="leite"
          price="R$ 120,00 p/ Litro"
          image={{
            uri: 'data:image/jpeg;base64,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',
          }}
        />
        <Text>{product}</Text>
      </WhiteAreaWithoutScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  welcomeSubtitle: {
    fontSize: 12,
    color: theme.pallete.textTitleScreen,
    letterSpacing: 0.4,
    fontFamily: 'Roboto-Regular',
  },
});
