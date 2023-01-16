import React, { useEffect, useState } from "react";
import { View,Text,Image, TouchableOpacity, ScrollView } from "react-native";
import  Icon  from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import { increment,decrement,removeItem } from "../../redux/reducers/cartReducer";

import {cartTotalPriceSelector} from '../../redux/Selectors';

export default () => {

    const cart = useSelector(state=>state.cart)

    const totalPrice = useSelector(cartTotalPriceSelector);

    const dispatch = useDispatch()

    
    
    

    return (
        <View className='flex-1 bg-slate-800'>
            <ScrollView>

                {cart.length == 0 &&
                    <View className='flex-1 h-96 w-full justify-center items-center'>
                        <View className='w-40 h-40 justify-center items-center'>
                            <Text className='text-white'>Carrinho Vazio</Text>
                        </View>
                    </View>
                }

                {cart.length > 0 &&
                    <>
                    {cart.map((item,index)=>(
                <View className="w-full h-60 my-4 flex-row min-h-min bg-white" key={item.id}>
                    <View className="w-36 h-full items-center justify-center">
                        <Image 
                            source={{uri:item.img}}
                            resizeMode='cover'
                            className='w-full h-full'
                        />
                    </View>
                    <View className="flex-1 p-4">
                        <Text className="text-black bold text-2xl">{`${ item.name.trim().length > 12 ? `${item.name.slice(0,22)}...` : item.name}`}</Text>

                        <Text className="text-black">Quantidade: </Text>

                        <View className="flex-row w-full p-4 items-center">

                            <TouchableOpacity onPress={()=>dispatch(decrement(item.id))}
                            className='w-6 h-6 bg-gray-200 items-center justify-center rounded mx-3'>
                                <Text className="text-black"> - </Text>
                            </TouchableOpacity>

                            <Text className="text-black text-center">{item.quantity}</Text>

                            <TouchableOpacity onPress={()=>dispatch(increment(item.id))}
                            className='w-6 h-6 bg-gray-200 items-center justify-center rounded mx-3'>
                                <Text className="text-black"> + </Text>
                            </TouchableOpacity>

                        </View>

                        <Text className="text-black">R$ { parseFloat(item.price * item.quantity).toFixed(2)}</Text>

                        <View className="w-full flex-row justify-end p-4">
                            <TouchableOpacity onPress={()=>dispatch(removeItem(item.id))}>
                                <Icon name="trash-alt" size={23} color='red' />
                            </TouchableOpacity>
                        </View>
                        
                    </View>

                </View>
            ))}

            <View className="justify-between flex-row p-4">
                <Text className="text-white">Valor Total: </Text>
                <Text className="text-green-400 bold text-xl">R$ {totalPrice.toFixed(2)}</Text>
            </View>
            
                <View className="w-full items-center justify-center">
                    <TouchableOpacity onPress={null}
                    className="bg-purple-700 w-48 h-12 items-center justify-center  rounded-md my-4">
                        <Text>Comprar</Text>
                    </TouchableOpacity>
                </View>
                    </>
                }
                
            
            

        </ScrollView>
        </View>
    )
}