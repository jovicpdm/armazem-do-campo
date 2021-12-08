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
import {SpeedDial} from 'react-native-elements';

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
import SmallButton from '../components/SmallButton';

export default function Purchase({navigation, route}) {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(0);
  const [products, setProducts] = useState();
  const [user, setUser] = useState({});
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const containerStyle = {backgroundColor: 'white', padding: 20};

  const db = getDatabase();

  const searchUser = async () => {
    let data = {};
    const dbRef = ref(db, 'users/' + route.params.id);
    await new Promise(resolve => {
      onValue(dbRef, snapshot => {
        const {photo, name, email, phone, presentation} = snapshot.val();
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
    setProducts();
    const dbRef = ref(db, 'products');
    await new Promise(resolve => {
      let dataArray = [];
      onValue(dbRef, snapshot => {
        snapshot.forEach(snap => {
          dataArray.push(snap.val());
        });
        resolve();
        setProducts(dataArray);
      });
    });
    setLoading(false);
  };

  useEffect(() => {
    listCategories();
    searchUser();
    listProducts();
  }, []);

  return (
    <>
      <TopScreen>
        <View style={styles.welcomeContainer}>
          <View>
            <TitleScreen textAlign="center">Seja Bem Vindo</TitleScreen>
            <View style={{marginTop: 8}}>
              <View style={styles.dateArea}>
                <Text style={styles.welcomeSubtitle}>
                  Fechamento da compra:
                </Text>
                <Text
                  style={[
                    styles.welcomeSubtitle,
                    {
                      fontFamily: 'Roboto-Bold',
                      color: theme.pallete.primary007,
                    },
                  ]}>
                  {' '}
                  18/12
                </Text>
              </View>
              <View style={styles.dateArea}>
                <Text style={styles.welcomeSubtitle}>Entrega:</Text>
                <Text
                  style={[
                    styles.welcomeSubtitle,
                    {
                      fontFamily: 'Roboto-Bold',
                      color: theme.pallete.primary007,
                    },
                  ]}>
                  {' '}
                  22/12
                </Text>
              </View>
            </View>
          </View>
          <ProfilePhoto photo={`data:image/gif;base64,${user.photo}`} />
        </View>
        {/* <SmallButton name="ir para cesta"/> */}
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
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
        <HighlightedText>Produtos</HighlightedText>
        <View style={{flex: 1}}>
          {!loading ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={products}
              renderItem={({item}) => {
                return (
                  <ProductCard
                    name={item.name}
                    price={item.price}
                    image={item.mainImage}
                    description={item.description}
                    formOfSale={item.formsOfSale.toLowerCase()}
                    placeOfSale={item.placeOfSale}
                    amount={item.amount}
                    userId={route.params.id}
                  />
                );
              }}
              keyExtractor={item => item.id}
            />
          ) : (
            <ActivityIndicator size={48} />
          )}
        </View>
        <SpeedDial
          color={theme.pallete.primary}
          isOpen={open}
          buttonStyle={{borderRadius: 8}}
          icon={{name: 'list', color: '#fff'}}
          openIcon={{name: 'close', color: '#fff'}}
          onOpen={() => setOpen(!open)}
          onClose={() => setOpen(!open)}>
          <SpeedDial.Action
            buttonStyle={{borderRadius: 8}}
            color={theme.pallete.primary004}
            icon={{name: 'basket', color: '#fff', type: 'material-community'}}
            title="Ir para cesta"
            onPress={() =>
              navigation.navigate("Basket", {
                id: route.params.id,
              })
            }
          />
        </SpeedDial>
      </WhiteAreaWithoutScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeSubtitle: {
    fontSize: 12,
    color: theme.pallete.textTitleScreen,
    letterSpacing: 0.4,
    fontFamily: 'Roboto-Regular',
  },
  dateArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
