import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import ProductCardView from '../components/ProductCardView';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import Logo from '../components/Logo';
import GrayTextCenter from '../components/GrayTextCenter';

export default function ProductList({ navigation: { navigate } }) {

  const db = getDatabase();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const listProducts = async () => {

    const dataArray = [];
    setLoading(true);
    const dbRef = ref(db, 'products');
    await new Promise(resolve => {
      onValue(dbRef, snapshot => {
        snapshot.forEach(snap => {
          dataArray.push(snap.val());
        });
        resolve();
      });
    })
      .then(() => {
      })
      .catch(e => {
        console.log(e);
      });
    setProducts(dataArray);
    setLoading(false);
  };

  useEffect(() => {

    listProducts();
    return () => {
      setProducts({}); 
      setLoading(false);
    };

  }, []);

  return (
    <>
      <Logo/>
      <TopScreen>
        <TitleScreen>Produtos disponíveis</TitleScreen>
      </TopScreen>
      <WhiteAreaWithoutScrollView>

        {products.length === 0 ? <GrayTextCenter>Sem produtos</GrayTextCenter> : null}

        {!loading ? (
          <FlatList
            data={products}
            key={item => item.id}
            renderItem={({ item }) => {
              return (
                <ProductCardView
                  name={item.name}
                  price={item.price}
                  image={item.mainImage}
                  description={item.description}
                  amount={item.amount}

                  onPress={() => {
                    navigate(" ", {
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
    </>
  );
}

const styles = StyleSheet.create({});