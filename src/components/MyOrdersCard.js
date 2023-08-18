import React, {useEffect, useState} from 'react';
import {StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Alert,Linking} from 'react-native';
import {Icon} from 'react-native-elements';
import {theme} from '../global/styles/theme';
import {getDatabase, ref, update, onValue,remove} from 'firebase/database';




const MyOrdersCard = ({date, codeNumber, formPay,requests, total,status,id}) => {
    const db = getDatabase();
    const deleteRequest = (id) => { // erro 
        remove(ref(db, 'order/' + id));
     };
    
  return (
    
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.labelInfo}>
          <Text
            style={[styles.text, {fontSize: 20, fontFamily: 'Roboto-Bold'}]}>
             Pedido: {codeNumber}
          </Text>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {color: theme.pallete.primary005}]}>
              Data do pedido:{' '}
            </Text>
            <Text style={styles.text}>{date}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {color: theme.pallete.primary005}]}>
              Pedido:{' '}
            </Text>
            <Text style={styles.text}>{requests}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {color: theme.pallete.primary005}]}>
              Forma de pagamento:{' '}
            </Text>
            <Text style={styles.text}>{formPay}</Text>
          </View>


          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {color: theme.pallete.primary005}]}>
              Valor a pagar: {' '}
            </Text>
            <Text style={styles.text}>R$ {total}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {color: theme.pallete.primary005}]}>
              Status: {' '}
            </Text>
            <Text style={[styles.text,{fontWeight:'bold',textTransform:'uppercase'}]}>{status}</Text>
          </View>

        </View>
      </View>
      <View style={{marginTop: 5}}>      
        {status === 'aprovado' || status ===  'aguardando' ? null :  
        <View style={styles.buttonArea}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    deleteRequest(id);
                }}>
                <Icon
                    name="close"
                    type="material-community"
                    size={24}
                    color={theme.pallete.yellow}
                />
                <Text style={[styles.textButton, {color: theme.pallete.yellow, fontSize: 16}]}>
                    APAGAR
                </Text>
            </TouchableOpacity>
        </View>}

</View>
    </SafeAreaView>
  );
};

export default MyOrdersCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.pallete.primary004,
    marginTop: 8,
    borderRadius: 8,
    padding: 8,
    elevation: 4,
    shadowColor: theme.pallete.primary002,
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
   
    color: theme.pallete.white,
  },
  textButton: {
    fontFamily: 'Roboto-Mediun',
    fontSize:17
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
    display:'flex',
    flexDirection: 'row',
  },
  textButton: {
    fontFamily: 'Roboto-Mediun',
  },
});
