import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

const CardContainer = ({children, background, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container]}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderBottomWidth: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CardContainer;
