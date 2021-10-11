import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import FlashMessage from 'react-native-flash-message';

import {theme} from '../global/styles/theme';

const WhiteArea = ({children}, props) => {
  return (
    <ScrollView style={styles.container}>
      <FlashMessage style={[styles.message, props.style]} duration={2000} />
      {children}
    </ScrollView>
  );
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
  message: {
    alignItems: 'center',
    borderRadius: 8,
    textAlign: 'center',
  },
});
