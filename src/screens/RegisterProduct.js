import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {onValue, getDatabase, ref, set} from 'firebase/database';
import * as ImagePicker from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';
import uuid from 'react-native-uuid';

import firebase from '../config/firebase';
import {theme} from '../global/styles/theme';
import WhiteArea from '../components/WhiteArea';
import Input from '../components/Input';
import InputImage from '../components/InputImage';
import ButtonSecondary from '../components/ButtonSecondary';
import ButtonPrimary from '../components/ButtonPrimary';

export default function RegisterProduct({navigation}) {
  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [placeOfSale, setPlaceOfSale] = useState();
  const [description, setDescription] = useState();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [formsOfSale, setFormsOfSale] = useState([]);
  const [selectedFormOfSale, setSelectedFormOfSale] = useState();
  const [mainImage, setMainImage] = useState();

  const db = getDatabase();
  const dbRefForm = ref(db, 'formsOfSale');
  const dbRef = ref(db, 'categories');
  const dbRefDay = ref(db, 'deliveryDay');

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
    setFormsOfSale(dataArray);
  };

  const addProduct = () => {
    const id = uuid.v4();
    set(ref(db, 'products/' + id), {
      id: id,
      name: productName,
      price: price,
      placeOfSale: placeOfSale,
      description: description,
      category: selectedCategory,
      formsOfSale: selectedFormOfSale,
      mainImage: mainImage
    });

    images.forEach(image => {
      set(ref(db, 'products/' + id + '/images/' + uuid.v4()), {
        image: image,
      })
        .then(() => {
          console.log('Funcionou');
        })
        .catch(e => {
          console.log(e);
        });
    });
  };

  useEffect(() => {
    listCategories();
    listFormsOfSale();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Icon
          name="plus-circle"
          size={26}
          color={theme.pallete.textTitleScreen}
        />
        <Text style={styles.addProduct}>Cadastrar produto</Text>
      </View>
      <WhiteArea>
        <Input
          placeholder="Nome do produto"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setProductName(text)}
          value={productName}
          keyboardType="default"
          style={{marginTop: 12}}
        />
        <Input
          placeholder="Preço"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setPrice(text)}
          value={price}
          keyboardType="numeric"
          style={{marginTop: 16}}
        />
        <Input
          placeholder="Local de venda"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setPlaceOfSale(text)}
          value={placeOfSale}
          keyboardType="default"
          style={{marginTop: 16}}
        />
        <Input
          placeholder="Descrição"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setDescription(text)}
          value={description}
          keyboardType="default"
          style={styles.inputDescription}
        />
        <View style={styles.containerLabel}>
          <Text style={styles.titlePicker}>
            Selecione uma foto principal para o produto
          </Text>
          <InputImage
            name="Escolher Imagem"
            style={{marginTop: 44}}
            onPress={() => {
              ImagePicker.launchImageLibrary(
                {includeBase64: true},
                data => {
                  if (data.didCancel !== true) {
                    setMainImage(data.assets[0].base64);
                  }
                },
              );
            }}
          />
        </View>
        <View style={styles.containerLabel}>
          <Text style={styles.titlePicker}>Selecionar Imagens do Produto</Text>
          <InputImage
            name="Escolher Imagens"
            style={{marginTop: 44}}
            onPress={() => {
              const dataArray = [];
              ImagePicker.launchImageLibrary(
                {selectionLimit: 0, includeBase64: true},
                data => {
                  if (data.didCancel !== true) {
                    data.assets.forEach(item => {
                      dataArray.push(item.base64);
                    });
                  }
                },
              );
              setImages(dataArray);
            }}
          />
        </View>
        <Text style={styles.titlePicker}>Categoria</Text>
        <Picker
          dropdownIconColor={theme.pallete.primary004}
          mode="dropdown"
          style={{color: theme.pallete.black}}
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

        <Text style={styles.titlePicker}>Unidade de medida</Text>

        <Picker
          dropdownIconColor={theme.pallete.primary004}
          selectedValue={selectedFormOfSale}
          mode="dropdown"
          style={{color: theme.pallete.black}}
          onValueChange={itemValue => setSelectedFormOfSale(itemValue)}>
          <Picker.Item
            color={theme.pallete.black}
            label="Selecione a unidade de medida"
            value={0}
          />
          {formsOfSale.map(forms => {
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
        <View style={{marginTop: 24}} />
        <ButtonPrimary onPress={() => addProduct()}>CADASTRAR</ButtonPrimary>
        <ButtonSecondary
          onPress={() => {
            upload();
          }}>
          CANCELAR
        </ButtonSecondary>
      </WhiteArea>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addProduct: {
    fontFamily: 'Roboto-Medium',
    fontSize: 24,
    color: theme.pallete.white,
    marginVertical: 24,
    paddingHorizontal: 10,
  },
  inputDescription: {
    paddingVertical: 36,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 16,
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
