import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './screens/Login';

const {Navigator, Screen} = createNativeStackNavigator();

const MyTheme = {
  colors: {
    background: '#1B5338',
  },
};

function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Navigator
        headerMode="none"
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: 'transparent',
          },
        }}>
        <Screen name="Home" component={Login} />
      </Navigator>
    </NavigationContainer>
  );
}

export default App;
