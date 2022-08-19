import React from 'react';
import {StatusBar, SafeAreaView, LogBox} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {theme} from './global/styles/theme';
import Router from './router';

LogBox.ignoreAllLogs();

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
