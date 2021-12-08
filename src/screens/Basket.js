import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList, Switch} from 'react-native';
import {getDatabase, ref, onValue} from 'firebase/database';

import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import HighlightedText from '../components/HighlightedText';
import CardContainer from '../components/CardContainer';
import {theme} from '../global/styles/theme';
import IconMedium from '../components/IconMedium';
import TitleSection from '../components/TitleSection';

export default function Basket({navigation, route}) {
  const [products, setProducts] = useState([]);
  const [auxArray, setAuxArray] = useState([]);
  const [selected, setSelected] = useState(true);
  const [total, setTotal] = useState(0);

  const db = getDatabase();

  const listProducts = async () => {
    const dbRef = ref(db, 'purchase/' + route.params.id);
    const dataArray = [];
    var prices = 0;
    await new Promise(resolve => {
      onValue(dbRef, snapshot => {
        snapshot.forEach(snap => {
          dataArray.push(snap.val());
          prices += snap.val().price;
        });
        resolve();
      });
    });
    setProducts(dataArray);
    setTotal(prices);
  };

  useEffect(() => {
    listProducts();
  }, []);

  return (
    <>
      <TopScreen>
        <TitleScreen>Cesta</TitleScreen>
      </TopScreen>
      <WhiteAreaWithoutScrollView>
        <HighlightedText>Lista de itens</HighlightedText>
        <View>
          <FlatList
            data={products}
            renderItem={({item}) => {
              return (
                <View>
                  {item.price !== 0 ? (
                    <View style={styles.itemContainer}>
                      <Text style={styles.text}>{item.name}</Text>
                      <Text
                        style={[
                          styles.text,
                          {color: theme.pallete.primary004},
                        ]}>
                        R$ {item.price}
                      </Text>
                    </View>
                  ) : null}
                </View>
              );
            }}
          />
          <TitleSection>Total: R$ {total} </TitleSection>
        </View>
      </WhiteAreaWithoutScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 1,
    alignItems: 'center',
  },
  text: {
    color: theme.pallete.primary002,
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    textAlign: 'left',
  },
  subText: {
    fontSize: 10,
    color: theme.pallete.primary004,
    fontFamily: 'Roboto-Regular',
  },
  productInfo: {},
});
