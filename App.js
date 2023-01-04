import React from "react";
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./src/Navigators/AuthStack";


export default () => {
  return (
    <TailwindProvider>
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    </TailwindProvider>
  )
}