import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Badge} from 'react-native-paper';
import {theme} from '../global/styles/theme';

const RegisterProduct = ({navigation}) => {
  return (
    <View>
      <Icon
        name="plus-circle"
        size={32}
        color={theme.pallete.textTitleScreen}
      />
    </View>
  );
};

export default RegisterProduct;
