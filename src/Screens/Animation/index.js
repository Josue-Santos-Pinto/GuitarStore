import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AnimatedLottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

export default () => {
    const navigation = useNavigation()
    useEffect(()=>{
        setTimeout(()=>{
            navigation.reset({index:1,routes:[{name:'Preload'}]})
        },2000)
    },[])
  
    return (
        <View className="flex-1 items-center justify-center bg-slate-800 ">
            <AnimatedLottieView 
                source={require('../../assets/lottie/electric-guitar-music.json')}
                autoPlay={true}
                loop={true}
                resizeMode='contain'
            />
        </View>
    )
}