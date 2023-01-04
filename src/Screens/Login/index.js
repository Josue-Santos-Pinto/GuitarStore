import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default () => {

    const navigation = useNavigation()

    return (
        <View className="flex-1 bg-slate-800 items-center ">
            <View className="w-36 h-36 rounded-full bg-white items-center justify-center overflow-hidden mt-20 mb-12">
                <Image 
                    source={require('../../assets/icons/guitar-removebg.png')}
                    resizeMode='contain'
                    style={{width: '90%',height: '90%'}}
                />
            </View>
            
            <View className="w-full h-28 items-start px-6">
                <Text className="text-white text-base">Usuário: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3"
                />
            </View>

            <View className="w-full h-28 items-start px-6">
                <Text className="text-white text-base">Senha: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3"

                />
            </View>

            <TouchableOpacity 
            className="bg-purple-700 w-48 h-12 items-center justify-center mt-8 rounded-md">
                <Text className="text-white text-base">Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={()=>navigation.navigate('Register')}
                className="mt-8"
            >
                <Text className="text-white text-base">Cadastrar-se</Text>
            </TouchableOpacity>

        </View>
    )
}