import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {getDatabase, ref, onValue} from 'firebase/database';

import OrdersCard from '../components/OrdersCard';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import Logo from '../components/Logo';
import GrayTextCenter from '../components/GrayTextCenter';


export default function Orders () {

  const [orders, setOrders] = useState([]);
  const db = getDatabase();
  const dbRef = ref(db, 'order');
  const idUser = '';

  const listOrders = async () => {
    const dataArray = [];
    await new Promise(resolve => {
      onValue(dbRef, snapshot => {
        snapshot.forEach(snap => {
          let {status} = snap.val();
          
          if (status == 'aguardando') {

          const {date, codeNumber, formPay, requests, total, idUser,paymentProofUrl,token} = snap.val();
            let orders = {
              id: snap.key,
              idUser: idUser,
              date,
              codeNumber,
              formPay,
              requests,
              total,
              paymentProofUrl,
              token
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
              <OrdersCard
                requests={item.requests.products}
                date={item.date}
                codeNumber={item.codeNumber}
                formPay={item.formPay}
                id={item.id}
                total={item.total}
                idUser={item.idUser}
                paymentProof={item.paymentProofUrl}
                token={item.token}
              />
            );
          }}
        />
      </WhiteAreaWithoutScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
