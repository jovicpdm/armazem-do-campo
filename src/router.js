import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {theme} from './global/styles/theme';
import Login from './screens/Login';
import Register from './screens/Register';
import Purchase from './screens/Purchase';
import RegisterProduct from './screens/RegisterProduct';
import Feedback from './screens/Feedback';
import Admin from './screens/Admin';
import ParticipantManagement from './screens/ParticipantManagement';
import ProductManagement from './screens/ProductManagement';
import ProductList from './screens/ProductList';
import EditProduct from './screens/EditProduct';
import EditItem from './screens/EditItem';
import ProductListDelete from './screens/ProductListDelete';
import GeneralInformation from './screens/GeneralInformation';
import Requests from './screens/Requests';
import Payment from './screens/Payment';
import ProductInfo from './screens/ProductInfo';
import Profile from './screens/Profile';
import Basket from './screens/Basket';
import Orders from './screens/Orders';

const {Navigator, Screen} = createNativeStackNavigator();

const MyTheme = {
  dark: false,
  colors: {
    background: theme.pallete.primary,
  },
};

const Router = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
        >
        <Screen name="Login" component={Login} />
        <Screen name="Register" component={Register} />
        <Screen name="Purchase" component={Purchase} />
        <Screen name="RegisterProduct" component={RegisterProduct} />
        <Screen name="Feedback" component={Feedback} />
        <Screen name="Admin" component={Admin} />
        {/* <Screen name="Payment" component={Payment} /> */}
        <Screen name="ParticipantManagement" component={ParticipantManagement}/>
        <Screen name="ProductManagement" component={ProductManagement} />
        <Screen name="ProductList" component={ProductList} />
        <Screen name="EditProduct" component={EditProduct} />
        <Screen name="EditItem" component={EditItem} />
        <Screen name="ProductListDelete" component={ProductListDelete} />
        <Screen name="GeneralInformation" component={GeneralInformation} />
        <Screen name="Requests" component={Requests} />
        <Screen name="ProductInfo" component={ProductInfo} />

        <Screen name="Profile" component={Profile} />
        <Screen name="Basket" component={Basket} />
        <Screen name="Orders" component={Orders} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Router;
