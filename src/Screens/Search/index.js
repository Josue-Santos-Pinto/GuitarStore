import React,{useEffect, useState} from "react";


import { FlatList, StatusBar, TextInput, View,Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ListItem from "../../Components/ListItem";
import  Icon  from "react-native-vector-icons/FontAwesome";

import database from '@react-native-firebase/database';

export default () => {

    const [items,setItems] = useState([])
    const navigation = useNavigation()
    const [list,setList] = useState(items)
    const [searchText,setSearchText] = useState('')

    
    useEffect(()=>{
        database()
        .ref('/products')
        .on('value', snapshot => {
            setItems(snapshot.val());
        });
    },[])
   
    


    useEffect(()=>{
        navigation.setOptions({
            headerTitle: '',
            headerRight: () => (
                <View className='w-full h-12 rounded flex-row'>
                    <View className='w-11/12 h-full rounded-l border-2 flex-row justify-between'>
                        <TextInput
                                    value={searchText}
                                    placeholder='Procurar Produto'
                                    placeholderTextColor="#ccc"
                                    onChangeText={(e)=>setSearchText(e)}
                                    className='text-black p-1 rounded-l'
                                />
                                {searchText != '' &&
                                    <TouchableOpacity className='h-full w-12 justify-center items-center' onPress={()=>setSearchText('')} >
                                        <Icon name='close' size={24} color='#000' />
                                    </TouchableOpacity>
                                }
                    </View>
                                         
                </View>
            )
        })
        if(searchText === ''){
            setList(items)
        } else {
            setList(items.filter((item)=>{
                if((item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)){
                    return true
                } else {
                    return false
                }
                
            }))
        }
      
    },[searchText])

 
    


    return (
        <View className='flex-1 bg-slate-800'>
            <StatusBar backgroundColor='#121214' />
            {searchText != '' &&
                <FlatList 
                    data={list}
                    renderItem={({item,index})=><ListItem data={item} />}
                    keyExtractor={(item)=>item.id}
                />
            }
            {searchText == '' &&
             <View className='flex-1 h-96 w-full justify-center items-center'>
                <View className='w-40 h-40 justify-center items-center'>
                    <Text className='text-white'>Pesquise Algo</Text>
                </View>
            </View>
            }
            {searchText != '' && list.length == 0 &&
            <View>
                <Text className='text-white'>Produto não encontrado</Text>
            </View>
            }
        </View>
    )
}