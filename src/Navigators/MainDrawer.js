import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerCustom from '../Components/DrawerCustom';

import Home from '../Screens/Home';
import Cart from '../Screens/Cart';
import AddProducts from '../Screens/AddProducts';
import Favorites from '../Screens/Favorites';
import MyAccount from '../Screens/MyAccount';
import Search from '../Screens/Search';
import Product from '../Screens/Product';

const Drawer = createDrawerNavigator();

export default () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerCustom {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{headerStyle: {elevation: 0, borderBottomWidth: 0}}}
      />
      <Drawer.Screen
        name="Cart"
        component={Cart}
        options={{title: 'Carrinho'}}
      />
      <Drawer.Screen name="Search" component={Search} options={{title: ''}} />
      <Drawer.Screen
        name="Product"
        component={Product}
        options={{title: '', headerTransparent: true}}
      />
      <Drawer.Screen
        name="AddProducts"
        component={AddProducts}
        options={{title: 'Adicionar Produtos'}}
      />
      <Drawer.Screen
        name="Favorites"
        component={Favorites}
        options={{title: 'Favoritos'}}
      />
      <Drawer.Screen
        name="MyAccount"
        component={MyAccount}
        options={{title: 'Minha Conta'}}
      />
    </Drawer.Navigator>
  );
};
