import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import {DefaultTheme} from '@react-navigation/native';
import {theme} from './global/styles/theme';
import Router from './router';

export default function App() {

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.pallete.primary,
    },
  };
  return (
    <SafeAreaView>
      <StatusBar hidden={true} animated />
      <Router />
    </SafeAreaView>
  );
}
