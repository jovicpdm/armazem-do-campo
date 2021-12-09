import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getDatabase, onValue, ref} from 'firebase/database';

import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import GrayText from '../components/GrayText';

export default function Orders() {
  const [orders, setOrders] = useState();
  const listOrders = async () => {
    const dbRef = ref(db, 'orders/');
    const dataArray = [];
    await new Promise(resolve => {
      onValue(dbRef, snapshot => {
        snapshot.forEach(snap => {
          dataArray.push(snap.val());
        });
        resolve();
      });
    });
    setOrders(dataArray);
  };

  return (
    <>
      <TopScreen>
        <TitleScreen>Pedidos</TitleScreen>
      </TopScreen>
      <WhiteAreaWithoutScrollView>
          <GrayText>Em breve... {'\n'} Aqui ficará a lista de pedidos</GrayText>
      </WhiteAreaWithoutScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
