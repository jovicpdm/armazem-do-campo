import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getFirestore, collection, addDoc, doc} from 'firebase/firestore';
import {onValue, getDatabase, ref} from 'firebase/database';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';

import firebase from '../config/firebase';
import {theme} from '../global/styles/theme';
import WhiteArea from '../components/WhiteArea';
import Input from '../components/Input';
import InputImage from '../components/InputImage';
import ButtonSecondary from '../components/ButtonSecondary';
import ButtonPrimary from '../components/ButtonPrimary';

export default function RegisterProduct({navigation, route}) {
  const [photo, setPhoto] = useState('');
  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [placeOfSale, setPlaceOfSale] = useState();
  const [description, setDescription] = useState();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [formsOfSale, setFormsOfSale] = useState([]);
  const [selectedFormOfSale, setSelectedFormOfSale] = useState();

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

  const upload = async () => {
    const reference = storage().ref('logo.png');
    const pathToFile = "https://sportbuzz.uol.com.br/media/_versions/douglascosta_82934045_116411013185365_8270789263511275541_n_widexl.jpg";
    await reference.putFile(pathToFile);
  };

  useEffect(() => {
    listCategories();
    listFormsOfSale();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProduct = () => {
    const db = getFirestore();
    try {
      const docRef = addDoc(collection(db, 'users'), {
        first: 'Ada',
        last: 'Lovelace',
        born: 1815,
      });
      console.log('Document written with ID: ', doc);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

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
        <Text style={styles.titlePicker}>Selecionar Imagem do Produto</Text>
        <InputImage
          style={{marginTop: 44}}
          onPress={() =>
            ImagePicker.launchImageLibrary({}, data => {
              if (data.didCancel !== true) {
                setPhoto(data.assets[0].uri);
              }
            })
          }
        />
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
            value="Selecione a categoria"
          />
          {categories.map(category => {
            return (
              <Picker.Item
                color={theme.pallete.black}
                label={category.description.toLowerCase()}
                value={category.description}
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
            color={theme.pallete.white}
            label="Selecione a unidade de medida"
            value="Selecione a unidade de medida"
          />
          {formsOfSale.map(forms => {
            return (
              <Picker.Item
                color={theme.pallete.white}
                label={forms.description.toLowerCase()}
                value={forms.description}
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
  // select: {
  //   borderColor: theme.pallete.primary,
  //   borderWidth: 1,
  //   borderRadius: 8,
  //   maxHeight: 32,
  //   width: '100%',
  //   paddingHorizontal: 12,
  // },
  // txtPicker: {
  //   // borderEndColor: theme.pallete.primary,
  //   height: '100%',
  //   width: '100%',
  //   color: theme.pallete.black,
  // },
});
