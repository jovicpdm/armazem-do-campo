import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {LogBox} from 'react-native';
LogBox.ignoreWarnings([
  'Warning: Async Storage has been extracted from react-native core',
]);

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
    <>
      <NavigationContainer theme={MyTheme}>
        <Router />
      </NavigationContainer>
    </>
  );
}
