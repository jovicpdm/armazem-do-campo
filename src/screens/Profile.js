import React from 'react';
import {Text, View} from 'react-native';
import {Avatar, AccessoryProps} from 'react-native-elements';
import CardContainer from '../components/CardContainer';

import ProfilePhoto from '../components/ProfilePhoto';
import TextCard from '../components/TextCard';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';

export default function Profile() {
  return (
    <View>
      <TopScreen>
        <TitleScreen>Perfil</TitleScreen>
      </TopScreen>
      <WhiteAreaWithoutScrollView>
        <View style={{marginTop: 8}}>
          <Avatar
            rounded
            size={64}
            source={{
              uri: 'https://emoff.ig.com.br/wp-content/uploads/2021/11/neymarjr-254529721_282681760417405_5748955508485612656_n-1.jpg',
            }}
            onPress={() => {
              alert('clicou na imagem');
            }}>
            <Avatar.Accessory size={20} {...AccessoryProps} />
          </Avatar>
          <CardContainer />
          <CardContainer>
            <TextCard></TextCard>
          </CardContainer>
        </View>
      </WhiteAreaWithoutScrollView>
    </View>
  );
}
