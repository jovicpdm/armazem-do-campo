import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, Alert } from 'react-native';
import { onValue, getDatabase, ref, update } from 'firebase/database';

import { theme } from '../global/styles/theme';
import { TextInput } from 'react-native-paper';
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
  const [selectedUnitOfMeasurement, setSelectedUnitOfMeasurement] = useState(0);

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

  function itemUpdated (){    
      Alert.alert("Atenção", 'Item atualizado com sucesso');
      return;
    
  }

  const updateMainImage = (id, mainImage) => {
    if (!mainImage){
      Alert.alert("Atenção",'Por favor, selecione uma imagem');
      return;
    } else {
    update(ref(db, 'products/' + id), {
      mainImage: mainImage,
    });
    itemUpdated ();
  }
  };

  const updateProductName = (id, name) => {
    if (!name){
      Alert.alert("Atenção",'Por favor, preencha o campo relacionado ao nome do produto');
      return;
    }
    update(ref(db, 'products/' + id), {
      name: name,
    });
    itemUpdated ();
  };

  const updatePrice = (id, price) => {
    if (!price){
      Alert.alert("Atenção",'Por favor, preencha o campo relacionado ao preço do produto');
      return;
    }
    update(ref(db, 'products/' + id), {
      price: price,
    });
    itemUpdated ();
  };

  const updatePlaceOfSale = (id, placeOfSale) => {
    if (!placeOfSale){
      Alert.alert("Atenção",'Por favor, preencha o campo relacionado ao local de venda do produto');
      return;
    }
    update(ref(db, 'products/' + id), {
      placeOfSale: placeOfSale,
    });
    itemUpdated ();
  };

  const updateDescription = (id, description) => {
    if (!description){
      Alert.alert("Atenção",'Por favor, preencha o campo relacionada a descrição do produto');
      return;
    }
    update(ref(db, 'products/' + id), {
      description: description,
    });
    itemUpdated ();
  };

  const updateAmount = (id, amount) => {
    if (!amount){
      Alert.alert("Atenção",'Por favor, preencha o campo relacionada ao estoque do produto');
      return;
    }
    update(ref(db, 'products/' + id), {
      amount: amount,
    });
    itemUpdated ();
  };

  const updateCategory = (id, category) => {
    if (!category){
      Alert.alert("Atenção",'Por favor, selecione a categoria do produto');
      return;
    }
    update(ref(db, 'products/' + id), {
      category: category,
    });
    itemUpdated ();
  };

  const updateFormOfSale = (id, formsOfSale) => {
    if (!formsOfSale){
      Alert.alert("Atenção",'Por favor, selecione a unidade de medida do produto');
      return;
    }
    update(ref(db, 'products/' + id), {
      formsOfSale: formsOfSale,
    });
    itemUpdated ();
  };

  useEffect(() => {
    listCategories();
    listFormsOfSale();
    return () => {
      setCategories([]); 
      setUnitOfMeasurement ([]);
    };
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
          name="Escolher imagem"
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
          name="Atualizar imagem"
          type="primary"
          onPress={() => { updateMainImage(id, newMainImage) }}
        />
      </View>

      <View style={{ marginTop: 16 }} />

      <TextInput
        label={`Nome: ${name}`}
        placeholder="nome"
        onChangeText={text => setNewProductName(text)}
        keyboardType="default"
      />
      <SmallButton
        name="Atualizar nome"
        type="primary"
        onPress={() => { updateProductName(id, newProductName) }}
      />

      <TextInput
        label={`Preço: ${price}`}
        placeholder="preço"
        onChangeText={text => setNewPrice(text)}
        keyboardType="numeric"
      />
      <SmallButton
        name="Atualizar preço"
        type="primary"
        onPress={() => { updatePrice(id, newPrice) }}
      />

      <TextInput
        label={`local de venda: ${placeOfSale}`}
        placeholder="Local de venda"
        onChangeText={text => setNewPlaceOfSale(text)}
        keyboardType="default"
      />
      <SmallButton
        name="Atualizar local de venda"
        type="primary"
        onPress={() => { updatePlaceOfSale(id, newPlaceOfSale) }}
      />

      <TextInput
        label={`descrição: ${description}`}
        placeholder="Descrição"
        onChangeText={text => setNewDescription(text)}
        keyboardType="default"
      />
      <SmallButton
        name="Atualizar descrição"
        type="primary"
        onPress={() => { updateDescription(id, newDescription) }}
      />

      <TextInput
        label={`estoque: ${amount}`}
        placeholder="Estoque"
        onChangeText={text => setNewAmount(text)}
        keyboardType="numeric"
      />
      <SmallButton
        name="Atualizar estoque"
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
              label={category.description}
              value={category.description}
              key={category.description}
            />
          );
        })}
      </Picker>

      <SmallButton
        name="Atualizar categoria"
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
              label={forms.description}
              value={forms.description}
              key={forms.description}
            />
          );
        })}
      </Picker>

      <SmallButton
        name="Atualizar forma de venda"
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
