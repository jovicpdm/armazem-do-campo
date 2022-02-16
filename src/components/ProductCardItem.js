import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Alert, ProgressViewIOSComponent } from 'react-native';
import { onValue, getDatabase, ref, update } from 'firebase/database';

import { theme } from '../global/styles/theme';
import { TextInput, ImageInput } from 'react-native-paper';
import SmallButton from './SmallButton';
import * as ImagePicker from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import InputImage from '../components/InputImage';

const ProductCardItem = ({
  id,
  name,
  price,
  placeOfSale,
  description,
  category,
  formsOfSale,
  mainImage,
  amount,
}) => {

  const [newProductName, setNewProductName] = useState();
  const [newPrice, setNewPrice] = useState();
  const [newPlaceOfSale, setNewPlaceOfSale] = useState();
  const [newDescription, setNewDescription] = useState();
  const [newMainImage, setNewMainImage] = useState();
  const [newAmount, setNewAmount] = useState();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [unitOfMeasurement, setUnitOfMeasurement] = useState([]);
  const [selectedUnitOfMeasurement, setSelectedUnitOfMeasurement] = useState();

  const db = getDatabase();
  const dbRef = ref(db, 'categories');
  const dbRefForm = ref(db, 'formsOfSale');

  const listCategories = async () => {
    const dataArray = [];
    await new Promise(resolve => {
      onValue(dbRef, snapshot => {
        snapshot.forEach(snap => {
          dataArray.push(snap.val());
        });
        resolve();
      });
    });
    setCategories(dataArray);
  };

  const listFormsOfSale = async () => {
    const dataArray = [];
    await new Promise(resolve => {
      onValue(dbRefForm, snapshot => {
        snapshot.forEach(snap => {
          dataArray.push(snap.val());
        });
        resolve();
      });
    });
    setUnitOfMeasurement(dataArray);
  };

  const updateMainImage = (id, mainImage) => {
    update(ref(db, 'products/' + id), {
      mainImage: mainImage,
    });
  };

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

  const updateCategory = (id, category) => {
    update(ref(db, 'products/' + id), {
      category: category,
    });
  };

  const updateFormOfSale = (id, formsOfSale) => {
    update(ref(db, 'products/' + id), {
      formsOfSale: formsOfSale,
    });
  };

  useEffect(() => {
    listCategories();
    listFormsOfSale();
  }, []);





  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: `data:image/gif;base64,${mainImage}` }}
        />
        <View style={styles.titleSubtitle}>
          <Text style={styles.title}>{name}</Text>
        </View>
      </View>

      <View style={{ marginTop: 16 }} />

      <View style={styles.containerLabel}>
        <Text style={styles.titlePicker}>
          Selecione uma nova foto para o produto
        </Text>
        <InputImage
          name="escolher imagem"
          style={{ marginTop: 44 }}
          onPress={() => {
            ImagePicker.launchImageLibrary(
              { includeBase64: true },
              data => {
                if (data.didCancel !== true) {
                  setNewMainImage(data.assets[0].base64);
                }
              },
            );
          }}
        />
        <SmallButton
          name="atualizar imagem"
          type="primary"
          onPress={() => { updateMainImage(id, newMainImage) }}
        />
      </View>

      <View style={{ marginTop: 16 }} />

      <TextInput
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
        label={`preço: ${price}`}
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
        placeholder="local de venda"
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
        label={`estoque: ${amount}`}
        placeholder="estoque"
        onChangeText={text => setNewAmount(text)}
        keyboardType="numeric"
      />
      <SmallButton
        name="atualizar estoque"
        type="primary"
        onPress={() => { updateAmount(id, newAmount) }}
      />

      <Text style={styles.titlePicker}> {`Categoria: ${category}`} </Text>
      <Picker
        dropdownIconColor={theme.pallete.primary004}
        mode="dropdown"
        style={{ color: theme.pallete.black }}
        selectedValue={selectedCategory}
        onValueChange={(itemValue, item) => setSelectedCategory(itemValue)}>
        <Picker.Item
          color={theme.pallete.black}
          label="Selecione a categoria"
          value={0}
        />
        {categories.map(category => {
          return (
            <Picker.Item
              color={theme.pallete.black}
              label={category.description.toLowerCase()}
              value={category.description.toLowerCase()}
              key={category.description}
            />
          );
        })}
      </Picker>

      <SmallButton
        name="atualizar categoria"
        type="primary"
        onPress={() => { updateCategory(id, selectedCategory) }}
      />

      <Text style={styles.titlePicker}> {`Forma de venda: ${formsOfSale}`} </Text>
      <Picker
        dropdownIconColor={theme.pallete.primary004}
        mode="dropdown"
        style={{ color: theme.pallete.black }}
        selectedValue={selectedUnitOfMeasurement}
        onValueChange={(itemValue, item) => setSelectedUnitOfMeasurement(itemValue)}>
        <Picker.Item
          color={theme.pallete.black}
          label="Selecione a nova unidade de medida"
          value={0}
        />
        {unitOfMeasurement.map(forms => {
          return (
            <Picker.Item
              color={theme.pallete.black}
              label={forms.description.toLowerCase()}
              value={forms.description.toLowerCase()}
              key={forms.description}
            />
          );
        })}
      </Picker>

      <SmallButton
        name="atualizar forma de venda"
        type="primary"
        onPress={() => { updateFormOfSale(id, selectedUnitOfMeasurement) }}
      />


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
  titlePicker: {
    marginTop: 5,
    marginBottom: 2,
    color: theme.pallete.primary,
    fontSize: 16,
  },
  containerLabel: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
});

export default ProductCardItem;
