/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Icon} from 'react-native-elements';
import DatePicker from 'react-native-date-picker';

import {theme} from '../global/styles/theme';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import WhiteArea from '../components/WhiteArea';
import HighlightedText from '../components/HighlightedText';
import CardContainer from '../components/CardContainer';
import AdminNotification from '../components/AdminNotification';
import TextCard from '../components/TextCard';
import IconMedium from '../components/IconMedium';

export default function Admin({navigation: {navigate}}) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View>
      <TopScreen>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TitleScreen>Seja bem vindo, Admin!</TitleScreen>
          <Icon
            name="account-circle-outline"
            type="material-community"
            size={48}
            color={theme.pallete.textTitleScreen}
          />
        </View>
      </TopScreen>

  
      <WhiteArea>
        {/* <Button title="Open" onPress={() => setOpen(true)} />
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        /> */}
        <View style={{marginTop: 4  , alignItems: 'center'}}>
          <HighlightedText>Gerenciamento</HighlightedText>
        </View>
        <View style={{marginVertical: 8}} />
        <View>
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
        </View>
      </WhiteArea>
      
    </View>
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
