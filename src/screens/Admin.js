import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {getDatabase, ref, onValue} from 'firebase/database';
import { useIsFocused } from '@react-navigation/native';

import ProfilePhoto from '../components/ProfilePhoto';
import {theme} from '../global/styles/theme';
import TitleScreen from '../components/TitleScreen';
import Logo from '../components/Logo';

import TopScreen from '../components/TopScreen';
import WhiteArea from '../components/WhiteArea';
import GrayTextCenter from '../components/GrayTextCenter';
import CardContainer from '../components/CardContainer';
import TextCard from '../components/TextCard';
import IconMedium from '../components/IconMedium';

export default function Admin({navigation: {navigate}, route}) {
  
const [user, setUser] = useState({});
const db = getDatabase();
const isFocused = useIsFocused();

const searchUser = async () => {
  let data = {};
  const dbRef = ref(db, 'users/' + route.params.id);
  await new Promise(resolve => {
    onValue(dbRef, snapshot => {
      const {photo, name, email, address, phone, presentation} = snapshot.val();
      data = {
        id: snapshot.key,
        photo: photo,
        name: name,
        email: email,
        address: address,
        phone: phone,
        presentation: presentation,
      };
      resolve();
      setUser(data);
    });
  });
};

useEffect(()=>{
  searchUser() 
 },[isFocused])

  return (    
    <SafeAreaView>
      <Logo />
        <SafeAreaView style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TitleScreen>Bem-vindo {user.name}</TitleScreen>
           <ProfilePhoto photo={`data:image/gif;base64,${user.photo}`}/>
        </SafeAreaView> 
        <TopScreen/> 

      <WhiteArea>
        <SafeAreaView style={{marginTop: 4, alignItems: 'center'}}>
          <GrayTextCenter>Gerenciar</GrayTextCenter>
        </SafeAreaView>
        <SafeAreaView style={{marginVertical: 8}} />

        <SafeAreaView>
          <CardContainer
            background={theme.pallete.primary004}
            onPress={() => {
              navigate('ProductManagement');
            }}>
            <TextCard>Produtos</TextCard>
            <IconMedium
              name="shopping-outline"
              color={theme.pallete.primary002}
            />
          </CardContainer>

          <CardContainer
            background={theme.pallete.primary004}
            onPress={() => navigate('ParticipantManagement')}>
            <TextCard>Participantes</TextCard>
            <IconMedium
              name="account-group-outline"
              color={theme.pallete.primary002}
            />
          </CardContainer>

          <CardContainer
            background={theme.pallete.primary004}
            onPress={() => navigate('Orders')}>
            <TextCard>Pedidos</TextCard>
            <IconMedium
              name="book-outline"
              color={theme.pallete.primary002}
            />
          </CardContainer>
        </SafeAreaView>        
      </WhiteArea>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textCard: {
    color: theme.pallete.primary004,
    // marginHorizontal: 24,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textAlign: 'right',
  },
});
