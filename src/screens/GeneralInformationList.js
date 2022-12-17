import React, {useState, useEffect} from 'react';
import {StyleSheet,  View, Text} from 'react-native';
import {theme} from '../global/styles/theme';
import {getDatabase, ref, onValue} from 'firebase/database';

import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import Logo from '../components/Logo';
import GrayTextCenter from '../components/GrayTextCenter';


export default function GeneralInformationList() {

  const [information, setInformation] = useState([]);
  const db = getDatabase();
  const listGeneralInformation = async () => {
    let data = {};
    const dbRef = ref(db, 'generalInformation/' + '218ef621-692f-41bb-83a1-fe83a7abdf40');
    await new Promise(resolve => {
      onValue(dbRef, snapshot => {
        const {closingDate, deliveryDate, deliveryPlace} = snapshot.val();
        data = {
          id: snapshot.key,
          closingDate: closingDate,
          deliveryDate: deliveryDate,
          deliveryPlace: deliveryPlace,
        };
        resolve();
        setInformation(data);
      });
    });
  }; 

  useEffect(() => {
    listGeneralInformation();
    return () => {
      setInformation([]); 
    };
  }, [])

 
  return (
    <>
    <Logo/>
      <TopScreen>
        <TitleScreen>Prazo cadastrado</TitleScreen>
      </TopScreen>
      <WhiteAreaWithoutScrollView>
       {information.length === 0 ? <GrayTextCenter>Sem períodos cadastrados</GrayTextCenter> : null}

       <View style={styles.container}>
      <View style={styles.label}>

        <View style={styles.labelInfo}>
          <Text
            style={[styles.text, {fontSize: 18, fontFamily: 'Roboto-Bold'}]}>
              Data de fechamento: {''}
              <Text style={[styles.text, {color: theme.pallete.primary005}]}>
                {information.closingDate}</Text>
          </Text>

          <Text
            style={[styles.text, {fontSize: 18, fontFamily: 'Roboto-Bold'}]}>
              Data da entrega:  {''}
              <Text style={[styles.text, {color: theme.pallete.primary005}]}>
                {information.deliveryDate}</Text>
          </Text>

          <Text
            style={[styles.text, {fontSize: 18, fontFamily: 'Roboto-Bold'}]}>
              Local da entrega: {''}
            <Text style={[styles.text, {color: theme.pallete.primary005}]}>
              {information.deliveryPlace}</Text>
          </Text>
          
        </View>
      </View>     
    </View>
      </WhiteAreaWithoutScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
