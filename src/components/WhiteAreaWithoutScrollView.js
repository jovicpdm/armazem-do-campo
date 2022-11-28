import React from 'react';
import {View, StyleSheet,ScrollView} from 'react-native';

import {theme} from '../global/styles/theme';

const WhiteAreaWithoutScrollView = ({children}, props) => {
  return <View style={styles.container}>{children}</View>;
};

export default WhiteAreaWithoutScrollView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.pallete.white,
    height: '100%',
    maxHeight:'100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  message: {
    alignItems: 'center',
    borderRadius: 8,
    textAlign: 'center',
  },
});
