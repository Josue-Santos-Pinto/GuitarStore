import React, { useEffect, useState } from "react";
import { Image, Text,TouchableOpacity,View } from "react-native";
import  Icon  from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/reducers/cartReducer";


export default ({data}) => {

    const dispatch = useDispatch()
    const user = useSelector(state=>state.user)

    const [favorite,setFavorite] = useState(false)

    const cart = useSelector(state=>state.cart)

    

    return (
        <View className="w-full h-72 flex-row justify-around my-6 bg-white py-5 ">
            <View className="w-28 h-full justify-center items-center bg-black">
                <Image className="w-full h-full" source={{uri:data.img}} resizeMode='cover' />
            </View>
            <View className="w-44 h-44  items-center">
                <TouchableOpacity className=" w-5 h-5" style={{position:'absolute',top: -17,right:0}} onPress={()=>setFavorite(!favorite)}>
                    {favorite == false &&
                        <Icon name="heart-o" size={20} color='red' />
                        }
                    {favorite == true &&
                        <Icon name="heart" size={20} color='red' />
                        }
                </TouchableOpacity>
            
                <Text className="text-black text-lg bold">{data.name}</Text>
                <Text className="text-black">{data.desc}</Text>
                <Text className="text-green-400 text-xl my-2">R$ {parseFloat(data.price).toFixed(2)}</Text>

                <TouchableOpacity onPress={()=>dispatch(addToCart(data))}
                className="bg-purple-700 w-48 h-12 items-center justify-center  rounded-md">
                    <Text>Adicionar ao carrinho</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}