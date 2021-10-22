import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';

const IconMedium = ({name, color}) => {
  return <Icon name={name} type="material-community" size={24} color={color} />;
};

export default IconMedium;
