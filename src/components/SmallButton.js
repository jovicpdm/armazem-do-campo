import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

import {theme} from '../global/styles/theme';

const SmallButton = ({type, name, onPress}) => {
  const primary = {
    backgroundColor: theme.pallete.primary,
    color: theme.pallete.white,
  };

  const secondary = {
    backgroundColor: theme.pallete.white,
    color: theme.pallete.primary,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor:
            type === 'primary'
              ? primary.backgroundColor
              : secondary.backgroundColor,
        },
        styles.button,
      ]}>
      <Text
        style={[
          {
            color: type === 'primary' ? primary.color : secondary.color,
          },
          styles.text,
        ]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 8,
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize:17
    
  },
});

export default SmallButton;
