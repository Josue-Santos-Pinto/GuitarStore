import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default () => {

    const navigation = useNavigation()

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 bg-slate-800 items-center ">
            
            <View className="w-24 h-24 rounded-full bg-white items-center justify-center overflow-hidden mt-12 mb-8">
                <Image 
                    source={require('../../assets/icons/guitar-removebg.png')}
                    resizeMode='contain'
                    style={{width: '90%',height: '90%'}}
                />
            </View>
            
            <View className="w-full h-28 items-start px-6">
                <Text className="text-white text-base">Nome Completo: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3"
                />
            </View>

            <View className="w-full h-28 items-start px-6">
                <Text className="text-white text-base">Email: </Text>
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

            <View className="w-full h-28 items-start px-6">
                <Text className="text-white text-base">Telefone: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3"
                />
            </View>

            <View className="w-full h-28 items-start px-6">
                <Text className="text-white text-base">CEP: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3"
                />
            </View>

            <View className="w-full h-28 items-start px-6">
                <Text className="text-white text-base">Rua: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3"
                />
            </View>

        {/*Alinhar o Bairro e o Numero */}

        <View className="flex-row"> 

            <View className="w-64 h-28 items-start px-6">
                <Text className="text-white text-base">Bairro: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3"
                />
            </View>

            <View className="w-28 h-28 items-start px-6">
                <Text className="text-white text-base">Número: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3"
                />
            </View>

        </View>

            <TouchableOpacity 
            className="bg-purple-700 w-48 h-12 items-center justify-center mt-8 rounded-md mb-12">
                <Text className="text-white text-base">Cadastrar</Text>
            </TouchableOpacity>

            
            
        </View>
        </ScrollView>
    )
}