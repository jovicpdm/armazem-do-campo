import React from 'react';
import {StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {theme} from '../global/styles/theme';

const WhiteArea = ({children}, props) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default WhiteArea;

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: theme.pallete.white,
    maxHeight: '100%',
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 16,
  },
});
