import React, {useState, useEffect}from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';
import {getDatabase, onValue, ref} from 'firebase/database';

import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteArea from '../components/WhiteArea';
import GrayTextCenter from '../components/GrayTextCenter';
import Logo from '../components/Logo';


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
    <SafeAreaView>
      <Logo/>
      <TopScreen>
        <TitleScreen>Gerenciamento de pedidos</TitleScreen>
      </TopScreen>
      <WhiteArea>
          <GrayTextCenter>Em construção...</GrayTextCenter>
      </WhiteArea>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
