import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {theme} from '../global/styles/theme';

const TitleScreen = ({children, textAlign}) => {
  return <Text style={[styles.title, {textAlign: textAlign}]}>{children}</Text>;
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
