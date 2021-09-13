import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login';
import Register from '../screens/Register'


const { Navigator, Screen } = createNativeStackNavigator();

const MyTheme = {
    colors: {
        background: '#1B5338',
    },
};

function App() {
    return (
        <NavigationContainer theme={MyTheme}>
            <Navigator
            initialRouteName= "Login"
                headerMode="none"
                screenOptions={{
                    headerShown: false,
                    cardStyle: {
                        backgroundColor: 'transparent',
                    },
                }}>
                <Screen name="Login" component={Login} />
                <Screen name="Register" component={Register} />
            </Navigator>
        </NavigationContainer>
    );
}

export default App;