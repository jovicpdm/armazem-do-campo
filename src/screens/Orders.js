import React, {useState, useEffect}from 'react';
import {StyleSheet, Text, SafeAreaView, View,  TouchableOpacity, FlatList, Alert} from 'react-native';
import {
  getDatabase,
  ref,
  onValue,
  remove,
} from 'firebase/database';

import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import Logo from '../components/Logo';
import ButtonPrimary from '../components/ButtonPrimary';
import WhiteAreaFlatList from '../components/WhiteAreaFlatList'
import ButtonRequests from '../components/ButtonRequests'
export default function Orders() {
  const [orders, setOrders] = useState();
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


        
 useEffect(()=>{listOrders()},[]) 
  return (
    <SafeAreaView>
      <Logo/>
      <TopScreen>
        <TitleScreen>Gerenciamento de pedidos</TitleScreen>
      </TopScreen>
      <WhiteAreaFlatList>
      <FlatList style={{marginTop:15}}
            data={orders}
            scrollEnabled
            keyExtractor={item => {
              return item.id;
            }}
          
            renderItem={({item}) => {
              return (
               <View style={{margin:7}}>
             
                  <ButtonRequests onPress={ () =>  
                    Alert.alert('Confirmação Pedido',
                   `Data:${item.date}\n${item.requests.products}Total:${item.total}R$
                   `,
                   [
                    { text: "Finalizar Pedido", onPress: () => {Alert.alert('Pedido Finalizado com sucesso','Recarregue a pagina'),remove(ref(db, 'order/' + item.id));} },
                    {
                      text: "Cancelar",
                      onPress: () => console.log("Pedido Cancelado"),
                      style: "cancel"
                    }
                    
                  ]
                   )}>{item.codeNumber}</ButtonRequests> 
               </View>
                 )
            }}
          
          />  
       
      </WhiteAreaFlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
