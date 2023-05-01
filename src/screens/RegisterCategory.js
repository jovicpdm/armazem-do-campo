import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {onValue, getDatabase, ref, set} from 'firebase/database';

import {theme} from '../global/styles/theme';
import WhiteArea from '../components/WhiteArea';
import Input from '../components/Input';
import ButtonSecondary from '../components/ButtonSecondary';
import ButtonPrimary from '../components/ButtonPrimary';
import Logo from '../components/Logo';

export default function RegisterCategory({ navigation: { navigate } }) {

  const [description, setDescription] = useState();
  const [categories, setCategories] = useState([]);

  const db = getDatabase();
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
  

  function addCategory () {

    if (!description){
      Alert.alert("Atenção",'Preencha o campo relacionado a descrição da categoria');
      return;
    }
    
    const id = categories.length + 1;

    set(ref(db, 'categories/' + id), {
      id: id,
      description: description,
    });  

    Alert.alert("Cadastro de categorias",
    "Categoria cadastrada com sucesso",
    [    
      { text: "OK", onPress: () => navigate('ProductManagement') }
    ]
    );
  
};

  useEffect(() => {
    listCategories();
    return () => {
      setCategories([]);
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
        <Text style={styles.addCategory}>Cadastrar categoria</Text>
      </SafeAreaView>


      <WhiteArea>

      <Input
          placeholder="Descrição da categoria"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setDescription(text)}
          value={description}
          keyboardType="default"
          style={{marginTop: 12}}
        />
       

        <View style={{marginTop: 24}} />
        <ButtonPrimary onPress={() =>{ addCategory()}}>
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
  addCategory: {
    fontFamily: 'Roboto-Medium',
    fontSize: 24,
    color: theme.pallete.white,
    marginVertical: 24,
    paddingHorizontal: 10,
  },
});
