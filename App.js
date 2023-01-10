import React from "react";
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./src/Navigators/AuthStack";
import { Provider } from "react-redux";
import store from "./src/redux/store";


export default () => {
  return (
    <TailwindProvider>
      <Provider store={store}>
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
      </Provider>
    </TailwindProvider>
  )
}