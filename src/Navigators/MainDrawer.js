import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerCustom from '../Components/DrawerCustom';

import Home from '../Screens/Home'

const Drawer = createDrawerNavigator();

export default () => {
  return (
    <Drawer.Navigator drawerContent={(props)=><DrawerCustom {...props}/>}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}