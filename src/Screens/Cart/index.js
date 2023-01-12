import React, { useEffect, useState } from "react";
import { View,Text } from "react-native";
import { useSelector } from "react-redux";
import ListItem from "../../Components/ListItem";


export default () => {

    const cart = useSelector(state=>state.cart)


    useEffect(()=>{
        console.log(cart)
    },[cart])

    
    

    return (
        <View className='w-full h-full'>
            {cart.map((item,index)=>(
                <Text className='text-black' key={item.id}>{item.name}</Text>
            ))}
        </View>
    )
}