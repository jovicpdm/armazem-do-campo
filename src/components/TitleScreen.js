import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {theme} from '../global/styles/theme';

const TitleScreen = ({children}) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default TitleScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.pallete.textTitleScreen,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },
});
