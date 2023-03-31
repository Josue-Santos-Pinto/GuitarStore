import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Screens/Login';
import Preload from '../Screens/Preload';
import Animation from '../Screens/Animation';
import Register from '../Screens/Register';
import MainDrawer from './MainDrawer';

export default () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Animation" component={Animation} />
      <Stack.Screen name="Preload" component={Preload} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
          title: '',
          headerTintColor: '#FFF',
          headerStyle: {
            height: 60,
            backgroundColor: 'rgb(15,23,42)',
          },
        }}
      />
      <Stack.Screen name="MainDrawer" component={MainDrawer} />
    </Stack.Navigator>
  );
};
