import React, { useEffect, useState } from "react";
import { View,Text,Image, TouchableOpacity, ScrollView } from "react-native";
import  Icon  from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../redux/reducers/favReducer";


export default () => {

    const [favBoolean,setFavBoolean] = useState(true)

    const fav = useSelector(state=>state.fav)


    const dispatch = useDispatch()

    
    
    

    return (
        <View className='flex-1 bg-slate-800'>
            <ScrollView>

                {fav.length == 0 &&
                    <View className='flex-1 h-96 w-full justify-center items-center'>
                        <View className='w-40 h-40 justify-center items-center'>
                            <Text className='text-white'>Sem Favoritos</Text>
                        </View>
                    </View>
                }

                {fav.length > 0 &&
                    <>
                    {fav.map((item,index)=>(
                <View className="w-full h-60 my-4 flex-row min-h-min bg-white" key={item.id}>
                    <View className="w-36 h-full items-center justify-center">
                        <Image 
                            source={{uri:item.img}}
                            resizeMode='cover'
                            className='w-full h-full'
                        />
                    </View>
                    <View className="flex-1 p-4">

                        <View className='w-full flex-row justify-end'>
                            <TouchableOpacity onPress={()=>dispatch(removeItem(item.id))}>
                                <Icon name="heart" size={20} color='red' />
                            </TouchableOpacity>          
                        </View>

                        <Text className="text-black bold text-2xl">{`${item.name = item.name.length > 12 ? `${item.name.slice(0,22)}...` : item.name}`}</Text>

                        <Text className="text-black ">{item.desc}</Text>
                    </View>

                </View>
            ))}

                    </>
                }
                
            
            

        </ScrollView>
        </View>
    )
}