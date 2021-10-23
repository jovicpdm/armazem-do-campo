/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {theme} from '../global/styles/theme';

const RequestCard = ({name, photo, email, phone, presentation, id}) => {
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
        </View>
      </View>
      <View style={{marginTop: 24}}>
        <Text style={[styles.text, {color: theme.pallete.primary005}]}>
          Apresentação:{' '}
        </Text>
        <Text style={styles.text}>{presentation + ' '} </Text>
        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button}>
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
          <TouchableOpacity style={styles.button}>
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
