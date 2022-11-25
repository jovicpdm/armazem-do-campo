import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {getDatabase, ref, onValue} from 'firebase/database';

import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import Logo from '../components/Logo';
import GrayTextCenter from '../components/GrayTextCenter';
import OrdersCardApprovedOrDisaproved from '../components/OrdersCardApprovedOrDisaproved';


export default function Orders() {

  const [orders, setOrders] = useState([]);
  const db = getDatabase();
  const dbRef = ref(db, 'order');

  const listOrders = async () => {
    const dataArray = [];
    await new Promise(resolve => {
      onValue(dbRef, snapshot => {
        snapshot.forEach(snap => {
          let {status} = snap.val();
          
          if (status == 'aprovado') {

          const {date, codeNumber, formPay, requests, total} = snap.val();
            let orders = {
              id: snap.key,
              date,
              codeNumber,
              formPay,
              requests,
              total,
            };
            dataArray.push(orders);
          }
        });
        resolve();
      });
    });
    setOrders(dataArray);    
  };

  useEffect(() => {
    setInterval(() => {listOrders()}, 1000);
    return () => {
      setOrders([]); 
    };
  }, [])
 
  return (
    <>
    <Logo/>
      <TopScreen>
        <TitleScreen>Pedidos</TitleScreen>
      </TopScreen>
      <WhiteAreaWithoutScrollView>

       {orders.length === 0 ? <GrayTextCenter>Sem pedidos</GrayTextCenter> : null}
       
        <FlatList
          data={orders}
          scrollEnabled
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <OrdersCardApprovedOrDisaproved
                requests={item.requests.products}
                date={item.date}
                codeNumber={item.codeNumber}
                formPay={item.formPay}
                id={item.id}
                total={item.total}
              />
            );
          }}
        />
      </WhiteAreaWithoutScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
