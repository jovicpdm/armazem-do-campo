/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import ProductCard from '../components/ProductCard';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';

export default function ProductList({ navigation: { navigate } }) {

  const db = getDatabase();

  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);

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
    listProducts();
  }, []);


  return (
    <View>
      <TopScreen>
        <TitleScreen>Produtos</TitleScreen>
      </TopScreen>
      <WhiteAreaWithoutScrollView>

        {!loading ? (
          <FlatList
            data={products}
            key={item => item.id}
            renderItem={({ item }) => {
              return (
                <ProductCard
                  name={item.name}
                  price={item.price}
                  image={item.mainImage}
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
    </View>
  );
}

const styles = StyleSheet.create({});