import React from 'react';
import {View, StyleSheet} from 'react-native';
import FlashMessage from 'react-native-flash-message';

import {theme} from '../global/styles/theme';

const WhiteAreaWithoutScrollView = ({children}, props) => {
  return (
    <View style={styles.container}>
      <FlashMessage style={[styles.message, props.style]} duration={2000} />
      {children}
    </View>
  );
};

export default WhiteAreaWithoutScrollView;

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
