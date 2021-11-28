import React from 'react';
import {YellowBox, StatusBar} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {theme} from './global/styles/theme';
import Router from './router';

YellowBox.ignoreWarnings();

export default function App() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.pallete.primary,
    },
  };
  return (
    <>
      <NavigationContainer theme={MyTheme}>
        <StatusBar backgroundColor={theme.pallete.primary} hidden={false} />
        <Router />
      </NavigationContainer>
    </>
  );
}
