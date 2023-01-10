import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import database from '@react-native-firebase/database';
import ListItem from "../../Components/ListItem";
import { useSelector } from "react-redux";



export default () => {
    const navigation = useNavigation()
    const [item,setItem] = useState([])
    const [loading,setLoading] = useState(true)
    const user = useSelector(state=>state.user)

    useEffect(()=>{
        database()
        .ref('/produtos')
        .on('value', snapshot => {
            setItem(snapshot.val());
        });
    },[])
   
    
    

    return (
        <View className="flex-1">        
                <FlatList
                    data={item}
                    className="flex-1 w-full overflow-hidden"
                    renderItem={({item,index})=><ListItem data={item}/>}
                    keyExtractor={(item)=>item.id}
              /> 
        </View>
    )
}