import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {theme} from '../global/styles/theme';

const WhiteArea = ({children}) => {
  return <ScrollView style={styles.container}>{children}</ScrollView>;
};

export default WhiteArea;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.pallete.white,
    maxHeight: '100%',
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
