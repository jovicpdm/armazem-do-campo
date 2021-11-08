import React from 'react';
import {View, StyleSheet} from 'react-native';

const TopScreen = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

export default TopScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
