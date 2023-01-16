import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerCustom from '../Components/DrawerCustom';

import Home from '../Screens/Home';
import Cart from '../Screens/Cart';
import MyProducts from '../Screens/MyProducts';
import Favorites from '../Screens/Favorites';
import MyAccount from '../Screens/MyAccount'
import Search from '../Screens/Search';

const Drawer = createDrawerNavigator();

export default () => {
  return (
    <Drawer.Navigator drawerContent={(props)=><DrawerCustom {...props}/>}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Cart" component={Cart} options={{title:'Carrinho'}}/>
      <Drawer.Screen name="Search" component={Search} options={{title:''}}/>
      <Drawer.Screen name="MyProducts" component={MyProducts} options={{title:'Minhas Compras'}}/>
      <Drawer.Screen name="Favorites" component={Favorites} options={{title:'Favoritos'}}/>
      <Drawer.Screen name="MyAccount" component={MyAccount} options={{title:'Minha Conta'}} />
    </Drawer.Navigator>
  );
}