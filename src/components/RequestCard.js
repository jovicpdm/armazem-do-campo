import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {theme} from '../global/styles/theme';

const RequestCard = ({children}, {photo, email, phone, presentation, id}) => {
  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Image
          style={styles.profilePhoto}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Bra-Cos_%281%29_%28cropped%29.jpg',
          }}
        />
        <View style={styles.labelInfo}>
          <Text style={styles.text}>Neymar JR</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {color: theme.pallete.primary005}]}>
              Email:{' '}
            </Text>
            <Text style={styles.text}>neymar@email.com</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {color: theme.pallete.primary005}]}>
              Telefone:{' '}
            </Text>
            <Text style={styles.text}>94 111111111</Text>
          </View>
        </View>
      </View>
      <View style={{marginTop: 24}}>
        <Text style={[styles.text, {color: theme.pallete.primary005}]}>
          Apresentação:{' '}
        </Text>
        <Text style={styles.text}>
          Orem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit
          consectetur mi ac pharetra. Phasellus at euismod erat. Duis consec
          tetur odio purus, quis iaculis dui interdum nec. Donec velit neque,
          vestibulum eget mauris vel, elementum auctor nibh. Duis semper purus
          et massa sodales, eu facilisis mauris hendrerit. Mauris i{' '}
        </Text>
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
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  textButton: {
    fontFamily: 'Roboto-Mediun',
  },
});
