import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, SafeAreaView, Alert } from 'react-native';
import { getDatabase, ref, set } from 'firebase/database';


import uuid from 'react-native-uuid';
import DateTimePicker from '@react-native-community/datetimepicker'
import { theme } from '../global/styles/theme';
import WhiteArea from '../components/WhiteArea';
import Input from '../components/Input';

import ButtonSecondary from '../components/ButtonSecondary';
import ButtonPrimary from '../components/ButtonPrimary';
import InputDate from '../components/InputDate';
import Logo from '../components/Logo';

export default function GeneralInformation({ navigation: { navigate } }) {
  const [closingDate, setClosingDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState(new Date());

  const [textClosingDate, setTextClosingDate] = useState('Selecione a data de fechamento')
  const [textDeliveryDate, setTextDeliveryDate] = useState('Selecione a data de entrega')

  const [deliveryPlace, setDeliveryPlace] = useState();

  const [modeClosingDate, setModeClosingDate] = useState('date')
  const [showClosingDate, setShowClosingDate] = useState(false)

  const [modeDeliveryDate, setModeDeliveryDate] = useState('date')
  const [showDeliveryDate, setShowDeliveryDate] = useState(false)


  const onChangeClosingDate = (event, selectedDate) => {
    const currentDate = selectedDate || closingDate;
    setShowClosingDate(Platform.OS === 'ios')
    setClosingDate(currentDate)

    let tempDate = new Date(currentDate)
    let cDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
    setTextClosingDate(cDate)
  }

  const onChangeDeliveryDate = (event, selectedDate) => {
    const currentDate = selectedDate || deliveryDate;
    setShowDeliveryDate(Platform.OS === 'ios')
    setDeliveryDate(currentDate)

    let tempDate = new Date(currentDate)
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
    setTextDeliveryDate(fDate)
  }

  const showModeClosingDate = (currentMode) => {
    setShowClosingDate(true);
    setModeClosingDate(currentMode)
  }

  const showModeDeliveryDate = (currentMode) => {
    setShowDeliveryDate(true);
    setModeDeliveryDate(currentMode)
  }

 const db = getDatabase();

  const addGeneralInformation = () => {

    if (textClosingDate == 'Selecione a data de fechamento'){
      Alert.alert("Atenção",'Preencha o campo relacionado a data de fechamento');
      return;
    }
    if (!textDeliveryDate == 'Selecione a data de entrega'){
      Alert.alert("Atenção",'Preencha o campo relacionado a data de entrega');
      return;
    }

    if (!deliveryPlace){
      Alert.alert("Atenção",'Preencha o campo relacionado ao local de entrega');
      return;
    }

    const id = uuid.v4();
    set(ref(db, 'generalInformation/' + id), {
      closingDate: textClosingDate,
      deliveryDate: textDeliveryDate,
      deliveryPlace: deliveryPlace,
    });

    Alert.alert("Cadastro de prazos",
    "Informações cadastradas com sucesso",
    [    
      { text: "OK", onPress: () => navigate('ProductManagement') }
    ]
    );
  };

  return (
    <>
    <Logo/>
      <SafeAreaView style={styles.container}>
        <Text style={styles.addProduct}>Informações gerais</Text>
      </SafeAreaView>
      <WhiteArea>

        <SafeAreaView style={styles.containerLabel}>
          <Text style={styles.titlePicker}>
            {textClosingDate}
          </Text>
          <InputDate
            name="Escolher data de fechamento"
            style={{ marginTop: 44 }}
            onPress={() => showModeClosingDate('date')}
          />
          {showClosingDate && (
            <DateTimePicker
              testID='dateTimePicker'
              value={closingDate}
              mode={modeClosingDate}
              display='default'
              style="@style/MyAppTheme"
              
              onChange={onChangeClosingDate}
            />)}

        </SafeAreaView>


        <SafeAreaView style={styles.containerLabel}>
          <Text style={styles.titlePicker}>
            {textDeliveryDate}
          </Text>
          <InputDate
            name="Escolher data de entrega"
            style={{ marginTop: 44 }}
            onPress={() => showModeDeliveryDate('date')}
          />
          {showDeliveryDate && (
            <DateTimePicker
              testID='dateTimePicker'
              value={deliveryDate}
              mode={modeDeliveryDate}
              display='default'
              onChange={onChangeDeliveryDate}
            />)}
        </SafeAreaView>


        <Input
          placeholder="Local de entrega"
          placeholderTextColor={theme.pallete.primary}
          onChangeText={text => setDeliveryPlace(text)}
          value={deliveryPlace}
          keyboardType="default"
          style={{ marginTop: 32 }}
        />

        <View style={{ marginTop: 32 }} />
        <ButtonPrimary onPress={() => addGeneralInformation()}>CADASTRAR</ButtonPrimary>
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
    marginTop: 44,
  },
});
