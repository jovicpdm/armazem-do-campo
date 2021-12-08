import React from 'react';
import {Icon} from 'react-native-elements';

const IconMedium = ({name, color, onPress}) => {
  return <Icon name={name} type="material-community" size={24} color={color} onPress={onPress}/>;
};

export default IconMedium;
