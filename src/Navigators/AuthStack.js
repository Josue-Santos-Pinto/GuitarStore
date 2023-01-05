import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../Screens/Login'
import Preload from "../Screens/Preload";
import Register from '../Screens/Register'
import Home from '../Screens/Home'

export default () => {

    const Stack = createStackNavigator()

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Preload" component={Preload} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} 
            options={{
                headerShown: true,
                title:'',
                headerTintColor:'#FFF', 
                headerStyle: {
                        height: 60,
                        backgroundColor:'rgb(15,23,42)'
                    }
                }}
                />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )
}