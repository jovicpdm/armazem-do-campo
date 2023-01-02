import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity, Alert, } from 'react-native';
import {getDatabase, ref, set} from 'firebase/database';
import {theme} from '../global/styles/theme';
import {TextInput} from 'react-native-paper';
import IconMedium from './IconMedium';
import SmallButton from './SmallButton';

const ProductCard = ({ id, name, price, image, description, formOfSale, amount, userId,}) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [amountBuy, setAmountBuy] = useState(0);
  const [nameMod, setNameMod] = useState(description);
  const [countRequest,setCountRequest] = useState(0)
  const [showRequest,setShowRequest] = useState(false);
  const db = getDatabase();

  const addBasket = () => {
    const dbRef = ref(db, 'purchase/' + userId + `/${name}`);
    set(dbRef, {
      id: id,
      status: 'open',
      name: name,
      amountBuy: amountBuy,
      price: amountBuy * price,
      amount: amount,
      countRequest:countRequest
    });
  };

  useEffect(() => {
   /*  addBasket();   */
    return () => {
    };
  }, [countRequest])

  return (
    <View style={styles.card}>
      {showRequest &&  <Text style={styles.notificatioRequest}>{countRequest}:PEDIDO</Text>}
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: `data:image/gif;base64,${image}`}}
        />
        <View style={styles.titleSubtitle}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>
            R$ {price} {formOfSale}
          </Text>
          <Text style={styles.subtitle}>
            {amount} {formOfSale}(s) restantes
          </Text>
        </View>
      </View>
      {expand ? (
        <>
          <View style={{marginTop: 10}} />
          <Text style={[styles.subtitle, {textAlign:'left',fontSize:17}]}>{description}</Text>
          <View style={{marginTop: 16}} />
          {showInput ? (
            <>
              <TextInput
                maxLength={3}
                label={`Total:R$ ${amountBuy * price}`}
                placeholder="0"
                onChangeText={text => setAmountBuy(Number(text))}
                keyboardType="decimal-pad"
                style={styles.textInput}
              />
              <SmallButton
                name="ADICIONAR A CESTA"
                type="primary"
                onPress={() => {
                  try {
                    if(amountBuy != 0){
                      Alert.alert(
                        'Mensagem de confirmação',
                        'Produto adicionado',
                      );
                      setExpand(false)
                      setShowRequest(true)
                      setCountRequest(countRequest + 1)
                      addBasket();
                      
                    }
                    else if(amountBuy == 0 || amountBuy == ''){
                      Alert.alert(
                        'Quantidade não informada',
                        'Informe uma quantidade',
                      );
                  
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }}
              />
              <SmallButton
                name="cancelar"
                onPress={() => {
                  setExpand(false)
                  setShowInput(!showInput);
                  setNameMod('cancelado');
                }}
              />
            </>
          ) : (
            <SmallButton
              name="COMPRAR"
              type="primary"
              onPress={() => {
                setShowInput(!showInput);
              }}
            />
          )}
        </>
      ) : null}
      <TouchableOpacity
        style={{height: 40, alignItems: 'center', justifyContent: 'center'}}
        onPress={() => {
          setExpand(!expand);
        }}>
        {expand ? (
          <IconMedium name="chevron-up" />
        ) : (
          <IconMedium name="chevron-down" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 16, 
    paddingTop: 16, 
    marginTop: 4,
    backgroundColor: theme.pallete.white,
    borderRadius: 8,
    elevation: 1,
    shadowOffset: {
      width: 0.1,
      height: 0.1,
    },
    shadowOpacity: 0.2,
    justifyContent: 'space-between',
  },
  container: {
   
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 8,
  },
  titleSubtitle: {
    flexDirection: 'column',
    marginLeft: 8,
    alignContent: 'space-around',
  },
  title: {
    color: theme.pallete.black,
    fontFamily: 'Roboto-Bold',
    fontSize: 23,
  },
  subtitle: {
    color: theme.pallete.gray001,
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
  },
  notificatioRequest:{
    textAlign:'right',
    fontWeight:'bold'
  }
});

export default ProductCard;
