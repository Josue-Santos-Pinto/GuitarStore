import React, {useEffect, useState} from 'react';
import {TailwindProvider} from 'tailwindcss-react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/Navigators/AuthStack';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import MainDrawer from './src/Navigators/MainDrawer';

export default () => {
  return (
    <TailwindProvider>
      <Provider store={store}>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </Provider>
    </TailwindProvider>
  );
};
