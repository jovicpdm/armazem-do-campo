import React, {useEffect, useState} from 'react';
import {StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Alert,Linking} from 'react-native';
import {Icon} from 'react-native-elements';
import {theme} from '../global/styles/theme';
import {getDatabase, ref, update, onValue} from 'firebase/database';
import ProfilePhoto from '../components/ProfilePhoto';
import NotificationService from '../../NotificationService';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';



const OrdersCard = ({date, codeNumber, formPay, id, requests, total, idUser,paymentProof,token}) => {

  const [user, setUser] = useState({});
  const db = getDatabase();

    const approve = (id, response) => {
    const db = getDatabase();
    update(ref(db, 'order/' + id), {
      status: response === 'y' ? 'aprovado' : 'reprovado',
    });
    if (response === 'y'){
    Alert.alert('Atenção', 'Pedido aprovado com sucesso');
    sendPushNotification(token,'Armazém do Campo','Seu pedido foi aprovado com sucesso')

    }
    else {
      Alert.alert('Atenção', 'Pedido reprovado com sucesso');
      sendPushNotification(token,'Armazém do Campo','Infelizmente,Seu pedido foi negado')
    }
  };
  const sendPushNotification = async (registrationToken,titleNotification,bodyNotification) => {
    let notificationData = {
       title:titleNotification,
       body:bodyNotification,
       token:registrationToken
    }
    await NotificationService.sendSingleDeviceNotification(notificationData)
  };
  const searchUser = async () => {
    let data = {};
    const dbRef = ref(db, 'users/' + idUser);
    await new Promise(resolve => {
      onValue(dbRef, snapshot => {
        const {photo, name, email, address, phone} = snapshot.val();
        data = {
          id: snapshot.key,
          photo: photo,
          name: name,
          email: email,
          address: address,
          phone: phone,
        };
        resolve();
        setUser(data);
      });
    });
  };

  useEffect(() => {
    searchUser();
    return () => {
      setUser ([]);
    };
  }, [])

  return (
    
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', marginLeft: -20}}>
            <ProfilePhoto photo={`data:image/gif;base64,${user.photo}`}/>      

        <View style={styles.labelInfo}>
          <Text
            style={[styles.text, {fontSize: 18, fontFamily: 'Roboto-Bold'}]}>
              Pedido: {codeNumber}
          </Text>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {color: theme.pallete.primary005}]}>
              Consumidor:{' '}
            </Text>
            <Text style={styles.text}>{user.name}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {color: theme.pallete.primary005}]}>
              Endereço:{' '}
            </Text>
            <Text style={styles.text}>{user.address}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {color: theme.pallete.primary005}]}>
              Telefone:{' '}
            </Text>
            <Text style={styles.text}>{user.phone}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {color: theme.pallete.primary005}]}>
              Data do pedido:{' '}
            </Text>
            <Text style={styles.text}>{date}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {color: theme.pallete.primary005}]}>
              Forma de pagamento:{' '}
            </Text>
            <Text style={styles.text}>{formPay}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {color: theme.pallete.primary005}]}>  
           Descrição:{' '}    
            </Text>
            <Text style={styles.text}>{requests}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {color: theme.pallete.primary005}]}>
              Valor a pagar: {' '}
            </Text>
            <Text style={styles.text}>R$ {total}</Text>
          </View>
          
          {paymentProof ? ( <View style={{flexDirection: 'row'}}>
           <Text style={[styles.text, {color: theme.pallete.primary005}]}>
             Comprovante: {' '}
           </Text>
        
             <Text style={styles.url}
             onPress={() => { 
                Linking.openURL(paymentProof); 
               }}> 
                 Baixar PDF
            </Text>    
      
          
          </View>):<Text></Text>}
         
             
         

        

        </View>
      </View>

      <View style={{marginTop: 5}}>      

        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              approve(id, 'y');
            }}>
            <Icon
              name="check"
              type="material-community"
              size={24}
              color={theme.pallete.primary007}
            />
            <Text
              style={[styles.textButton, {color: theme.pallete.primary007}]}>
              Aprovar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              approve(id, 'n');
            }}>
            <Icon
              name="close"
              type="material-community"
              size={24}
              color={theme.pallete.red}
            />
            <Text style={[styles.textButton, {color: theme.pallete.red}]}>
              Reprovar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrdersCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.pallete.primary004,
    marginTop: 8,
    borderRadius: 8,
    padding: 8,
    elevation: 4,
    shadowColor: theme.pallete.primary002,
  },
  profilePhoto: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelInfo: {
    marginLeft: 8,
    justifyContent: 'space-evenly',
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: theme.pallete.white,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    // marginRight: 40,
  },
  buttonArea: {
    marginTop: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textButton: {
    fontFamily: 'Roboto-Mediun',
  },
  url:{
    fontSize: 16,
    color: theme.pallete.primary007,
  }
});
