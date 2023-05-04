import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {theme} from '../global/styles/theme';
import {getDatabase, ref, update} from 'firebase/database';
import NotificationService from '../../NotificationService';
const RequestCard = ({name, photo, email, address, phone, presentation, id,token}) => {

    const approve = (id, response) => {
    const db = getDatabase();
    update(ref(db, 'users/' + id), {
      status: response === 'y' ? 'aprovado' : 'reprovado',
    });
    if (response === 'y'){
    Alert.alert('Atenção', 'Consumidor aprovado com sucesso');
    console.log('token===>',token)
    console.log('type',typeof(token))
   
      sendPushNotification(token,'Armazém do Campo','Seu cadastro foi aprovado com sucesso')

     
    }
    else {
      Alert.alert('Atenção', 'Infelizmente');
      sendPushNotification(token,'Armazém do Campo','Infelizmente seu cadastro não foi aprovado')
    }
  };
  const sendPushNotification = async (registrationToken,titleNotification,bodyNotification) => {
    let notificationData = {
       title:titleNotification,
       body:bodyNotification,
       token:registrationToken
    }
    await NotificationService.sendSingleDeviceNotification(notificationData)
  };


  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Image
          style={styles.profilePhoto}
          source={{
            uri: photo,
          }}
        />

        <View style={styles.labelInfo}>
          <Text
            style={[styles.text, {fontSize: 16, fontFamily: 'Roboto-Bold'}]}>
            {name}
          </Text>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {color: theme.pallete.primary005}]}>
              Email:{' '}
            </Text>
            <Text style={styles.text}>{email}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {color: theme.pallete.primary005}]}>
              Telefone:{' '}
            </Text>
            <Text style={styles.text}>{phone}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {color: theme.pallete.primary005}]}>
              Endereço:{' '}
            </Text>
            <Text style={styles.text}>{address}</Text>
          </View>
        </View>
      </View>

      <View style={{marginTop: 5}}>
        <Text style={[styles.text, {color: theme.pallete.primary005}]}>
          Apresentação:{' '}
        </Text>

        <Text style={styles.text}>{presentation + ' '} </Text>
        <View style={styles.buttonArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              approve(id, 'y');
            }}>
            <Icon
              name="check"
              type="material-community"
              size={24}
              color={theme.pallete.primary007}
            />
            <Text
              style={[styles.textButton, {color: theme.pallete.primary007}]}>
              Aprovar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              approve(id, 'n');
            }}>
            <Icon
              name="close"
              type="material-community"
              size={24}
              color={theme.pallete.red}
            />
            <Text style={[styles.textButton, {color: theme.pallete.red}]}>
              Reprovar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RequestCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.pallete.primary004,
    marginTop: 8,
    borderRadius: 8,
    padding: 8,
    elevation: 4,
    shadowColor: theme.pallete.primary002,
  },
  profilePhoto: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelInfo: {
    marginLeft: 8,
    justifyContent: 'space-evenly',
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: theme.pallete.white,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    // marginRight: 40,
  },
  buttonArea: {
    marginTop: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textButton: {
    fontFamily: 'Roboto-Mediun',
  },
});
