import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Login';
import Register from './screens/Register';

const {Navigator, Screen} = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Navigator
      initialRouteName= "Register"
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: 'transparent',
          },
        }}>
        <Screen name="Login" component={Login} />
        <Screen name="Register" component={Register} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Router;
