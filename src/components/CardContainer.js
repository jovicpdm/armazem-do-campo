import React from 'react';
import {View, StyleSheet} from 'react-native';
import {theme} from '../global/styles/theme';

const CardContainer = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: theme.pallete.primary004,
  },
});

export default CardContainer;
