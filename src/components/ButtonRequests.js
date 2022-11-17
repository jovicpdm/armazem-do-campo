import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Button from './Button';
import {theme} from './../global/styles/theme';

const ButtonRequests = ({style, onPress, onFocus, children}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      onFocus={onFocus}
      
     
      activeOpacity={0.9}
      
      >
      {children}
      
    </TouchableOpacity>
  );
};

export default ButtonRequests;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6c5ce7',
    width:'92%',
    padding:10,
    borderRadius:10,
    alignItems:'center',
   
  },

});
