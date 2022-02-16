import React, { useState } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Alert, ProgressViewIOSComponent } from 'react-native';
import { getDatabase, ref, set, update } from 'firebase/database';

import { theme } from '../global/styles/theme';
import { TextInput } from 'react-native-paper';
import IconMedium from './IconMedium';
import SmallButton from './SmallButton';

const ProductCardEdit = ({
  props,
  id,
  name,
  price,
  placeOfSale,
  description,
  image,
  formOfSale,
  amount,
}) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showProduct, setShowProduct] = useState(false);


  const [newProductName, setNewProductName] = useState();
  const [newPrice, setNewPrice] = useState();
  const [newPlaceOfSale, setNewPlaceOfSale] = useState();
  const [newDescription, setNewDescription] = useState();
  const [newAmount, setNewAmount] = useState();

  const db = getDatabase();

  const updateProductName = (id, name) => {
    update(ref(db, 'products/' + id), {
      name: name,
    });
  };

  const updatePrice = (id, price) => {
    update(ref(db, 'products/' + id), {
      price: price,
    });
  };

  const updatePlaceOfSale = (id, placeOfSale) => {
    update(ref(db, 'products/' + id), {
      placeOfSale: placeOfSale,
    });
  };

  const updateDescription = (id, description) => {
    update(ref(db, 'products/' + id), {
      description: description,
    });
  };

  const updateAmount = (id, amount) => {
    update(ref(db, 'products/' + id), {
      amount: amount,
    });
  };



  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: `data:image/gif;base64,${image}` }}
        />
        <View style={styles.titleSubtitle}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>
            R$ {price}
          </Text>
          <Text style={styles.subtitle}>
            {amount} {formOfSale}(s) restantes
          </Text>
        </View>
      </View>
      {expand ? (
        <>
          <View style={{ marginTop: 16 }} />
          {showInput ? (
            <>
              {/* <TextInput
                label={`nome: ${name}`}
                placeholder="nome"
                onChangeText={text => setNewProductName(text)}
                keyboardType="default"
              />
              <SmallButton
                name="atualizar nome"
                type="primary"
                onPress={() => { updateProductName(id, newProductName) }}
              />
              <TextInput
                label={`preço: R$ ${price}`}
                placeholder="preço"
                onChangeText={text => setNewPrice(text)}
                keyboardType="numeric"
              />
              <SmallButton
                name="atualizar preço"
                type="primary"
                onPress={() => { updatePrice(id, newPrice) }}
              />
              <TextInput
                label={`local de venda: ${placeOfSale}`}
                placeholder="preço"
                onChangeText={text => setNewPlaceOfSale(text)}
                keyboardType="default"
              />
              <SmallButton
                name="atualizar local de venda"
                type="primary"
                onPress={() => { updatePlaceOfSale(id, newPlaceOfSale) }}
              />
              <TextInput
                label={`descrição: ${description}`}
                placeholder="descrição"
                onChangeText={text => setNewDescription(text)}
                keyboardType="default"
              />
              <SmallButton
                name="atualizar descrição"
                type="primary"
                onPress={() => { updateDescription(id, newDescription) }}
              />
              <TextInput
                label={`quantidade restante: ${amount} ${formOfSale}(s)`}
                placeholder="amount"
                onChangeText={text => setNewAmount(text)}
                keyboardType="default"
              />
              <SmallButton
                name="atualizar estoque"
                type="primary"
                onPress={() => { updateAmount(id, newAmount) }}
              /> */}
            </>
          ) : (
            <SmallButton
              name="editar"
              type="primary"
              onPress={props}
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

export default ProductCardEdit;
