import React, {useState, useEffect}from 'react';
import {StyleSheet, Text, SafeAreaView, View,  TouchableOpacity, FlatList, Alert} from 'react-native';

import {
  getDatabase,
  ref,
  onValue,
  remove,
} from 'firebase/database';
import { Database } from 'firebase/database';
import { LogBox } from 'react-native';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import Logo from '../components/Logo';
import ButtonPrimary from '../components/ButtonPrimary';
import WhiteAreaFlatList from '../components/WhiteAreaFlatList'
import ButtonRequests from '../components/ButtonRequests'
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import GrayTextCenter from '../components/GrayTextCenter';



LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export default function Orders() {

  const [orders, setOrders] = useState([]);
  const [count,setCount] = useState(0)
  const db = getDatabase();

  const listOrders = async () => {
    setOrders()
    const dbRef = ref(db, 'order');
    const dataArray = []; 
    await new Promise(resolve => {
      onValue(dbRef, snapshot => {
        snapshot.forEach(snap => {
         dataArray.push(snap.val())
        });
        resolve();
           setOrders(dataArray);  
           
      });
    });
  };  
 
  useEffect(() => {
    setInterval(() => {listOrders()}, 1000);
    return () => {
      setOrders([]); 
    };
  }, [])


  return (
    <SafeAreaView>
      <Logo/>
      <TopScreen>
        <TitleScreen>Gerenciamento de pedidos</TitleScreen>
      </TopScreen>
      <WhiteAreaFlatList>

      {/* {orders.length === 0 ? <GrayTextCenter>Sem solicitações</GrayTextCenter> : null} */}

      <FlatList style={{marginTop:15}}
            data={orders}
            scrollEnabled
            keyExtractor={item => {
              return item.id;
            }}
            renderItem={({item}) => {
            
              return (
               <View style={{margin:7}}>
             
                  <ButtonRequests  onPress={ () =>  
                    Alert.alert('Confirmação Pedido',
                   `Data:${item.date}\n${item.requests.products}Total:${item.total}R$
                   `,
                   [
                    { text: "Finalizar Pedido", onPress: () => {
                      Alert.alert('Pedido Finalizado com sucesso'),
                      remove(ref(db, 'order/' + item.id));setCount(count + 1)} },
                    {
                      text: "Cancelar",
                      onPress: () => console.log("Pedido Cancelado"),
                      style: "cancel"
                    }
                    
                  ]
                   )}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>{item.codeNumber}</Text></ButtonRequests> 
               </View>
                 ) 
            }
          
          }
          />  
       
      </WhiteAreaFlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
