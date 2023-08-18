import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {getDatabase, ref, onValue} from 'firebase/database';
import MyOrdersCard from '../components/MyOrdersCard'
import OrdersCard from '../components/OrdersCard';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import Logo from '../components/Logo';
import GrayTextCenter from '../components/GrayTextCenter';




export default function MyRequest ({navigation,route}) {
    const db = getDatabase();
    const [orders, setOrders] = useState([]);
    const dbRef = ref(db, 'order'); 
    const listOrders = async () => {
        
        const dataArray = [];
        await new Promise(resolve => {
          onValue(dbRef, snapshot => {
            snapshot.forEach(snap => {
            let {idUser} = snap.val()
              if(idUser === route.params.id){
                const {date, codeNumber, formPay, requests,status,total,id} = snap.val();
                let orders = {
                  date,
                  codeNumber,
                  formPay,
                  requests,
                  status,
                  total,
                  id
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
        return(
            <>
            <Logo/>
              <TopScreen>
                <TitleScreen>Meus Pedidos</TitleScreen>
              </TopScreen>
              <WhiteAreaWithoutScrollView>
        
               {orders.length === 0 ? <GrayTextCenter>Você não tem pedidos</GrayTextCenter> : null}
              
                <FlatList
                  data={orders}
                  scrollEnabled
                  keyExtractor={item => {
                    return item.id;
                  }}
                  renderItem={({item}) => {
                    
                    return (
                    <>
                      <MyOrdersCard 
                        requests={item.requests.products}
                        date={item.date}
                        codeNumber={item.codeNumber}
                        formPay={item.formPay}
                        status={item.status}
                        total={item.total}
                        id={item.id}
                      />
                      </>
                    );
                  }}
                />
              
                
              </WhiteAreaWithoutScrollView>
            </>
        )
}

