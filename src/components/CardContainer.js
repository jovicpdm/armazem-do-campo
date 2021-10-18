import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

const CardContainer = ({children, background, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {backgroundColor: background}]}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default CardContainer;
