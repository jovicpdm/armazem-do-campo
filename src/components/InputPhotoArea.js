import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../global/styles/theme';
import {Icon} from 'react-native-elements';

const InputPhotoArea = ({openGallery, openCamera}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Para melhor identificação, por favor adicione uma foto sua:
      </Text>
      <View style={styles.subContainer}>
        <TouchableOpacity style={styles.button} onPress={openGallery}>
          <Text style={styles.textButton}>GALERIA</Text>
          <Icon
            type="material-community"
            name="image"
            size={16}
            color={theme.pallete.white}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.textButton}>CÂMERA</Text>
          <Icon
            type="material-community"
            name="camera"
            size={16}
            color={theme.pallete.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InputPhotoArea;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginTop: 4,
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    textAlign: 'left',
    color: theme.pallete.gray
  },
  subContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: theme.pallete.primary004,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  textButton: {
    color: theme.pallete.white,
    marginRight: 4,
    fontFamily: 'Roboto-Bold',
    letterSpacing: 1.25,
    fontSize: 16,
  },
});
