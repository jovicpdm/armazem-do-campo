import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {getDatabase, ref, set} from 'firebase/database';

import {theme} from '../global/styles/theme';
import {TextInput} from 'react-native-paper';
import IconMedium from './IconMedium';
import SmallButton from './SmallButton';

const ProductCard = ({
  id,
  name,
  price,
  image,
  description,
  formOfSale,
  placeOfSale,
  amount,
  userId,
}) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [amountBuy, setAmountBuy] = useState(0);
  const [nameMod, setNameMod] = useState(description);
  const [countRequest,setCountRequest] = useState(1)
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

  return (
    <View style={styles.card}>
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
          <View style={{marginTop: 16}} />
          <Text style={[styles.subtitle, {marginLeft: 88}]}>{description}</Text>
          <View style={{marginTop: 16}} />
          {showInput ? (
            <>
              <TextInput
                maxLength={3}
                label={`total: R$ ${amountBuy * price}`}
                placeholder="0"
                onChangeText={text => setAmountBuy(Number(text))}
                keyboardType="decimal-pad"
              />
              <SmallButton
                name="adicionar à cesta"
                type="primary"
                onPress={() => {
                  try {
                    if(amountBuy != 0){
                      Alert.alert(
                        'Mensagem de confirmação',
                        'Produto adicionado',
                      );
                      setCountRequest(countRequest + 0)
                      addBasket();
                      
                    }
                    else if(amountBuy == 0){
                      Alert.alert(
                        'Erro Produto',
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
                  // setShowInput(!showInput);
                  setNameMod('cancelado');
                }}
              />
            </>
          ) : (
            <SmallButton
              name="comprar"
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
    marginTop: 8,
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
    height: 80,
    width: 80,
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
    fontSize: 18,
  },
  subtitle: {
    color: theme.pallete.gray001,
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
  },
});

export default ProductCard;
