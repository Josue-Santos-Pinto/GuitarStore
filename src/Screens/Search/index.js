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
                <View className='w-full h-12 justify-center   rounded flex-row'>
                    <View className='w-44 h-full rounded-l bg-stone-400 flex-row'>
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
                    <TouchableOpacity className='h-full w-12 justify-center items-center border-2 rounded'>
                        <Icon name='filter' size={24} color='#000' />
                    </TouchableOpacity>
                            
                 
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
        <View>
            <StatusBar backgroundColor='#121214' />
            {searchText != '' &&
                <FlatList 
                    data={list}
                    renderItem={({item,index})=><ListItem data={item} />}
                    keyExtractor={(item)=>item.id}
                />
            }
            {searchText == '' &&
            <View className='flex-1 justify-center items-center'>
                <Text className='text-black'>Pesquise algum produto</Text>
            </View>
            }
            {searchText != '' && list.length == 0 &&
            <View>
                <Text className='text-black'>Produto não encontrado</Text>
            </View>
            }
        </View>
    )
}