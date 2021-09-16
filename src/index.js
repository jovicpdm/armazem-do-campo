import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { theme } from './global/styles/theme';
import Router from './router';
import firebaseConfig from './config/firebase';

const initFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(initFirebase);


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
