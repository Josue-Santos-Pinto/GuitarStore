import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import database from '@react-native-firebase/database';
import ListItem from "../../Components/ListItem";



export default () => {
    const navigation = useNavigation()
    const [item,setItem] = useState([])

    useEffect(()=>{
        database()
        .ref('/produtos')
        .on('value', snapshot => {
            setItem(snapshot.val());
        });
    },[])
   
    useEffect(()=>{
        console.log(item)
    },[item])

    return (
        <View className="flex-1 items-center justify-center ">
            <FlatList 
                className="flex-1"
                data={item}
                renderItem={({item,index})=><ListItem data={item}/>}
                keyExtractor={(item)=>item.name}
            />
        </View>
    )
}