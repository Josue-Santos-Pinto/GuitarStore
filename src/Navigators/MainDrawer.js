import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerCustom from '../Components/DrawerCustom';

import Home from '../Screens/Home';
import Cart from '../Screens/Cart';
import MyProducts from '../Screens/MyProducts';
import Favorites from '../Screens/Favorites';
import MyAccount from '../Screens/MyAccount'

const Drawer = createDrawerNavigator();

export default () => {
  return (
    <Drawer.Navigator drawerContent={(props)=><DrawerCustom {...props}/>}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Cart" component={Cart} />
      <Drawer.Screen name="MyProducts" component={MyProducts} />
      <Drawer.Screen name="Favorites" component={Favorites} />
      <Drawer.Screen name="MyAccount" component={MyAccount} options={{title:'Minha Conta'}} />
    </Drawer.Navigator>
  );
}