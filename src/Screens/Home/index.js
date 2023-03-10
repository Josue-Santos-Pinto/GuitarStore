import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import database from '@react-native-firebase/database';
import ListItem from "../../Components/ListItem";
import { useDispatch, useSelector } from "react-redux";
import Icon  from "react-native-vector-icons/FontAwesome5";
import Cart from "../Cart";
import auth from '@react-native-firebase/auth'
import { setUID } from "../../redux/reducers/userReducer";



export default () => {
    const navigation = useNavigation()
    const [item,setItem] = useState([])
    const [loading,setLoading] = useState(true)
    const cart = useSelector(state=>state.cart)
    const badget = useSelector(state=>state.cart.length)
    const dispatch = useDispatch()

    useEffect(()=>{
        if (auth().currentUser !== null) 
        dispatch(setUID(auth().currentUser.uid))
    },[])

    useEffect(()=>{
        
            navigation.setOptions({
                headerTitle: '',
                headerRight: () => (
                    <View className='flex-row'>
                        <TouchableOpacity onPress={()=>navigation.navigate('Search')}
                        className="m-4 w-10 h-10 rounded-full items-center justify-center">
                                <Icon name='search' size={24} color='#6e6d75' />
                                
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>navigation.navigate('Cart')}
                        className="m-4 w-10 h-10 rounded-full items-center justify-center">
                                <Icon name='shopping-cart' size={24} color='#6e6d75' />
                                <View className='w-4 h-4 rounded-full absolute right-px items-center justify-center ' style={{top: -8}}>
                                    <Text className='text-black bold'>{badget}</Text>
                                </View>
                        </TouchableOpacity>
                    </View>
                    
                )
            })
        
    },[cart])


    useEffect(()=>{
        database()
        .ref('/products')
        .on('value', snapshot => {
            setItem(snapshot.val());
        });
    },[])
   
    
    
    

    return (
        <View className="flex-1 bg-slate-800 ">        
                <FlatList
                    data={item}
                    className="flex-1 w-full overflow-hidden"
                    renderItem={({item,index})=><ListItem data={item}/>}
                    keyExtractor={(item)=>item.id}
              />
        </View>
    )
}