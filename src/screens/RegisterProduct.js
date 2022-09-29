import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {onValue, getDatabase, ref, set} from 'firebase/database';
import * as ImagePicker from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';
import uuid from 'react-native-uuid';

import {theme} from '../global/styles/theme';
import WhiteArea from '../components/WhiteArea';
import Input from '../components/Input';
import InputImage from '../components/InputImage';
import ButtonSecondary from '../components/ButtonSecondary';
import ButtonPrimary from '../components/ButtonPrimary';
import Logo from '../components/Logo';

export default function RegisterProduct({ navigation: { navigate } }) {

  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [placeOfSale, setPlaceOfSale] = useState();
  const [description, setDescription] = useState();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [formsOfSale, setFormsOfSale] = useState([]);
  const [selectedFormOfSale, setSelectedFormOfSale] = useState(0);
  const [mainImage, setMainImage] = useState();
  const [amount, setAmount] = useState('');

  const db = getDatabase();
  const dbRefForm = ref(db, 'formsOfSale');
  const dbRef = ref(db, 'categories');

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

  function addProduct () {

    if (!productName){
      Alert.alert("Atenção",'Preencha o campo relacionado ao nome do produto');
      return;
    }

    if (!price){
      Alert.alert("Atenção",'Preencha o campo relacionado ao preço do produto');
      return;
    }

    if (!placeOfSale){
      Alert.alert("Atenção",'Preencha o campo relacionado ao local de venda do produto');
      return;
    }

    if (!description){
      Alert.alert("Atenção",'Preencha o campo relacionado a descrição do produto');
      return;
    }

    if (!amount){
      Alert.alert("Atenção",'Preencha o campo relacionado a quantidade do produto');
      return;
    }

    if (!mainImage){
      Alert.alert("Atenção",'Selecione uma imagem do produto');
      return;
    }

    if (!selectedCategory){
      Alert.alert("Atenção",'Selecione a categoria do produto');
      return;
    }

    if (!selectedFormOfSale){
      Alert.alert("Atenção",'Selecione a unidade de medida do produto');
      return;
    }

    const id = uuid.v4();
    set(ref(db, 'products/' + id), {
      id: id,
      name: productName,
      price: price,
      placeOfSale: placeOfSale,
      description: description,
      category: selectedCategory,
      formsOfSale: selectedFormOfSale,
      mainImage: mainImage,
      amount: amount,
    });  

    Alert.alert("Cadastro de produtos",
    "Produto cadastrado com sucesso",
    [    
      { text: "OK", onPress: () => navigate('ProductManagement') }
    ]
    );
  
};

  useEffect(() => {
    listCategories();
    listFormsOfSale();
    return () => {
      setCategories([]);
      setFormsOfSale([]);
    };
  }, []);

  return (
    <>
    <Logo/>
      <SafeAreaView style={styles.container}>
        <Icon
          name="plus-circle"
          size={26}
          color={theme.pallete.textTitleScreen}
        />
        <Text style={styles.addProduct}>Cadastrar produto</Text>
      </SafeAreaView>


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
          keyboardType="default"
          type="phone-pad"
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

        <Input
          placeholder="Quantidade "
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setAmount(text)}
          value={amount}
          type="phone-pad"
          keyboardType="default"
        />

        <View style={styles.containerLabel}>
          <Text style={styles.titlePicker}>
            Selecione uma imagem para o produto
          </Text>
          <InputImage
            name="Escolher imagem"
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

        <Text style={styles.titlePicker}>Categoria</Text>
        <Picker
          dropdownIconColor={theme.pallete.primary004}
          mode="dropdown"
          style={{color: theme.pallete.black}}
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}>
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
                label={forms.description}
                value={forms.description}
                key={forms.description}
              />
            );
          })}
        </Picker>

        <View style={{marginTop: 24}} />
        <ButtonPrimary onPress={() =>{ addProduct()}}>
                                      CADASTRAR</ButtonPrimary>
        <ButtonSecondary
          onPress={() => {
            navigate('ProductManagement');
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
