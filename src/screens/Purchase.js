/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
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

export default function Purchase({navigation, route}) {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(0);
  const [products, setProducts] = useState();
  const [user, setUser] = useState({});
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const containerStyle = {backgroundColor: 'white', padding: 20};

  const db = getDatabase();

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
        setUser(data);
      });
    });
  };

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

  const listProducts = async () => {
    setLoading(true);
    const dbRef = ref(db, 'products');
    const dataArray = [];
    await new Promise(resolve => {
      onValue(dbRef, snapshot => {
        snapshot.forEach(snap => {
          dataArray.push(snap.val());
        });
        resolve();
      });
    })
      .then(() => {
        console.log('show');
      })
      .catch(e => {
        console.log(e);
      });
    setProducts(dataArray);
    setLoading(false);
  };

  useEffect(() => {
    listCategories();
    searchUser();
    listProducts();
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
          {/* <ProfilePhoto photo={`data:image/gif;base64,${user.photo}`} /> */}
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

        {!loading ? (
          <FlatList
            data={products}
            key={item => item.id}
            renderItem={({item}) => {
              return (
                <ProductCard
                  name={item.name}
                  price={item.price}
                  image={item.mainImage}
                  onPress={() => {
                    navigation.navigate("ProductInfo", {
                      id: item.id
                    })
                  }}
                />
              );
            }}
          />
        ) : (
          <ActivityIndicator size={48} />
        )}
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
