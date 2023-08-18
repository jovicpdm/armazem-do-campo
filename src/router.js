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
import OrdersManagement from './screens/OrdersManagement';
import OrdersApproved from './screens/OrdersApproved';
import OrdersDisapproved from './screens/OrdersDisapproved';
import Orders from './screens/Orders';
import RequestConfirmed from './screens/RequestConfirmed';
import EditUsers from './screens/EditUsers';
import EditUser from './screens/EditUser';
import MethodPix from './screens/MethodPix';
import BankTransfer from './screens/BankTransfer'
import GeneralInformationListManagement from './screens/GeneralInformationListManagement';
import GeneralInformationList from './screens/GeneralInformationList';
import RegisterCategory from './screens/RegisterCategory';
import MyRequest from './screens/MyRequests'

 
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
        <Screen name = "MyRequests" component={MyRequest}/>
        <Screen name="ProductInfo" component={ProductInfo} />
        <Screen name="Profile" component={Profile} />
        <Screen name="Basket" component={Basket} />
        <Screen name="MethodPix" component={MethodPix} />
        <Screen name='BankTransfer' component={BankTransfer}/>
        <Screen name="RequestConfirmed" component={RequestConfirmed}></Screen>
        <Screen name="OrdersManagement" component={OrdersManagement} />
        <Screen name="OrdersApproved" component={OrdersApproved} />
        <Screen name="OrdersDisapproved" component={OrdersDisapproved} />
        <Screen name="Orders" component={Orders} />
        <Screen name="EditUsers" component={EditUsers} />
        <Screen name="EditUser" component={EditUser} />
        <Screen name="GeneralInformationListManagement" component={GeneralInformationListManagement} />
        <Screen name="GeneralInformationList" component={GeneralInformationList} />
        <Screen name="RegisterCategory" component={RegisterCategory} />



      </Navigator>
    </NavigationContainer>
  );
};

export default Router;
