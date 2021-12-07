import React, {useState} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import {theme} from '../global/styles/theme';
import {TextInput} from 'react-native-paper';
import IconMedium from './IconMedium';
import SmallButton from './SmallButton';

import {getDatabase, ref, set} from 'firebase/database'

const ProductCard = ({
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

  const addBasket = () => {
    dbRef = ref(db, 'purchase/' + userId);
    set(ref, {
      status: "open",
      name: name,
      amountBuy: amountBuy,

    })
  }

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
            R$ {price} ({formOfSale})
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
                onChangeText={text => setAmountBuy(Number(text))}
                selectionColor={theme.pallete.primary}
                keyboardType="decimal-pad"
              />
              <SmallButton
                name="adicionar à cesta"
                type="primary"
                onPress={() => {}}
              />
              <SmallButton
                name="cancelar"
                onPress={() => {
                  setShowInput(!showInput);
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
    padding: 2,
    marginTop: 8,
    backgroundColor: '#eaeaea',
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
