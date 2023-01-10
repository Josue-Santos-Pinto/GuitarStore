import React, { useEffect } from "react";
import { Text,View } from "react-native";


export default ({data}) => {

    useEffect(()=>{
        console.log(data)
    },[data])

    return (
        <View className="w-full h-32 bg-black">
            <>
                <Text>{data}</Text>
            </>
        </View>
    )
}