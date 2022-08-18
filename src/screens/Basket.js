import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList, Alert} from 'react-native';
import {
  getDatabase,
  ref,
  onValue,
  update,
  set,
  remove,
} from 'firebase/database';
import uuid from 'react-native-uuid';

import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import HighlightedText from '../components/HighlightedText';
import {theme} from '../global/styles/theme';
import TitleSection from '../components/TitleSection';
import ButtonPrimary from '../components/ButtonPrimary';
import GrayText from '../components/GrayText';
import ButtonSecondary from '../components/ButtonSecondary';

export default function Basket({navigation, route}) {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selected, setSelected] = useState(true);
  const [total, setTotal] = useState(0);

  const db = getDatabase();

  const updateProduct = (id, amount) => {
    update(ref(db, 'products/' + id), {
      amount: amount,
    });
  };

  const buy = () => {
    const id = uuid.v4();
    const dbRef = ref(db, 'order/' + id);
    set(dbRef, {
      id: id,
      date: Date.now(),
      total: total,
      formPay: 'Dinheiro',
    });
    products.map(item => {
      if (item.amountBuy != 0) {
        set(ref(db, 'order/' + id + `/${item.name}`), {
          name: item.name,
          amount: item.amountBuy,
        });
        updateProduct(item.id, item.amount - item.amountBuy);
      }
    });
    remove(ref(db, 'purchase/' + route.params.id));
    Alert.alert('Mensagem de confirmação', '(apenas exibido na fase beta)');
  };

  const listProducts = async () => {
    setRefresh(true);
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
        {products === null ? (
          <HighlightedText>Não há itens</HighlightedText>
        ) : (
          <View>
            <FlatList
              data={products}
              extraData={products}
              key = {item=>{
                return item.id
              }}
              // onRefresh={}
              renderItem={({item}) => {
                return (
                  <View>
                    {item.price !== 0 ? (
                      <View style={styles.itemContainer}>
                        <View>
                          <Text style={styles.text}>{item.name}</Text>
                          <Text style={styles.subText}>
                            Quantidade: {item.amountBuy}
                          </Text>
                        </View>
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
            <View style={styles.totalContainer}>
              <TitleSection>Total: R$ {total} </TitleSection>
            </View>
          </View>
        )}
        <GrayText>
          Por enquanto, só estamos aceitando pagamentos com dinheiro físico,{' '}
          {'\n'}Em breve mais formas de pagamento
        </GrayText>
        <View style={{marginTop: 60}} />
        <ButtonPrimary
          onPress={() => {
            buy();
          }}>
          CONCLUIR COMPRA
        </ButtonPrimary>
        <ButtonSecondary
          onPress={() => {
            remove(ref(db, 'purchase/' + route.params.id));
          }}>
          CANCELAR COMPRA
        </ButtonSecondary>
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
    color: theme.pallete.gray001,
    fontFamily: 'Roboto-Regular',
  },
  totalContainer: {
    borderTopWidth: 1,
    marginTop: 16,
    borderColor: theme.pallete.gray,
  },
});
