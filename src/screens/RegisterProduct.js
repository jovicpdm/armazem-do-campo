import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {theme} from '../global/styles/theme';
import WhiteArea from '../components/WhiteArea';
import Input from '../components/Input';
import Picker from 'react-native-universal-picker';
import ButtonSecondary from '../components/ButtonSecondary';
import ButtonPrimary from '../components/ButtonPrimary';
import {getDatabase, ref, set, push} from 'firebase/database';

export default function RegisterProduct({navigation}) {
  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [placeOfSale, setPlaceOfSale] = useState();
  const [description, setDescription] = useState();

  const [categories, setCategories] = useState([
    {description: 'BATATAS', id: 1},
    {description: 'FRUTAS IN NATURA E POLPAS', id: 2},
    {description: 'LEGUMES', id: 3},
    {description: 'DERIVADOS DA MANDIOCA', id: 4},
    {description: 'LEITE, QUEIJO E OUTROS DERIVADOS', id: 5},
    {description: 'VERDURAS', id: 6},
    {description: 'CARNES E OVOS', id: 7},
    {description: 'BEBIDAS', id: 8},
    {description: 'TEMPEROS', id: 9},
    {description: 'ÓLEOS', id: 10},
    {description: 'PÃES', id: 11},
    {description: 'BISCOITOS E SALGADOS', id: 12},
  ]);
  const [selectedCategory, setSelectedCategory] = useState();

  const [formsOfSale, setFormsOfSale] = useState([
    {description: 'UNIDADE', id: 1},
    {description: 'KG', id: 2},
  ]);
  const [selectedFormOfSale, setSelectedFormOfSale] = useState();

  const [deliveryDay, setDeliveryDay] = useState([
    {description: 'DOMINGO', id: 1},
    {description: 'SEGUNDA', id: 2},
    {description: 'TERÇA', id: 3},
    {description: 'QUARTA', id: 4},
    {description: 'QUINTA', id: 5},
    {description: 'SEXTA', id: 6},
    {description: 'SÁBADO', id: 7},
  ]);
  const [selectedDeliveryDay, setSelectedDeliveryDay] = useState();

  const writeProductData = () => {
    const db = getDatabase();
    const productRef = ref(db, 'products');
    const newProductRef = push(productRef);
    set(newProductRef, {
      name: productName,
      price: price,
      placeOfSale: placeOfSale,
      description: description,
      category: selectedCategory,
      formOfSale: selectedFormOfSale,
      deliveryDay: selectedDeliveryDay,
    });
  };

  return (
    <ScrollView>
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
          style={{marginTop: 44}}
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

        <Text style={styles.titlePicker}>Categoria</Text>
        <View style={styles.select}>
          <Picker
            style={styles.txtPicker}
            selectedValue={selectedCategory}
            onValueChange={(itemValue, item) => setSelectedCategory(itemValue)}>
            {categories.map(category => {
              return (
                <Picker.Item
                  label={category.description}
                  value={category.description}
                />
              );
            })}
          </Picker>
        </View>

        <Text style={styles.titlePicker}>Forma de venda</Text>
        <View style={styles.select}>
          <Picker
            style={styles.txtPicker}
            selectedValue={selectedFormOfSale}
            onValueChange={(itemValue, item) =>
              setSelectedFormOfSale(itemValue)
            }>
            {formsOfSale.map(forms => {
              return (
                <Picker.Item
                  label={forms.description}
                  value={forms.description}
                />
              );
            })}
          </Picker>
        </View>

        <Text style={styles.titlePicker}>Dia de entrega</Text>
        <View style={styles.select}>
          <Picker
            style={styles.txtPicker}
            selectedValue={selectedDeliveryDay}
            onValueChange={(itemValue, item) =>
              setSelectedDeliveryDay(itemValue)
            }>
            {deliveryDay.map(delivery => {
              return (
                <Picker.Item
                  label={delivery.description}
                  value={delivery.description}
                />
              );
            })}
          </Picker>
        </View>

        <View style={{marginTop: 30}} />
        <ButtonPrimary onPress={() => writeProductData()}>
          CADASTRAR
        </ButtonPrimary>
        <ButtonSecondary onPress={() => {}}>CANCELAR</ButtonSecondary>
      </WhiteArea>
    </ScrollView>
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
    paddingVertical: 60,
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
  select: {
    borderColor: theme.pallete.primary,
    borderWidth: 1,
    borderRadius: 8,
    height: 32,
    width: '100%',
    paddingHorizontal: 12,
  },
  txtPicker: {
    borderEndColor: theme.pallete.primary,
    tintColor: '#ffcbdb',
    textDecorationColor: '#ffcbdb',
    textShadowColor: '#ffcbdb',
    height: '100%',
    width: '100%',
  },
});
