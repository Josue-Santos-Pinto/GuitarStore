import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState,useRef } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import cepApi from "../../services/cepApi";
import { TextInputMask } from "react-native-masked-text";
import auth from '@react-native-firebase/auth'

export default () => {

    const navigation = useNavigation()

   
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')


    const registerUser = () => {
        //if(name && email && password && tel && cpf && cep && city && street && dist && num){
            if(email && password){
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    navigation.reset({index: 1,routes:[{name:'Login'}]});
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                    alert('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                    alert('That email address is invalid!');
                    }

                    console.error(error);
                });
        } else {
            alert('Preencha todos os Campos')
        }
        
    }

   


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
                <Text className="text-white text-base">Email: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
                    value={email}
                    onChangeText={(e)=>setEmail(e)}
                />
            </View>

            <View className="w-full h-28 items-start px-6">
                <Text className="text-white text-base">Senha: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
                    secureTextEntry={true}
                    maxLength={25}
                    value={password}
                    onChangeText={(e)=>setPassword(e)}
                />
            </View>

            

            <TouchableOpacity onPress={registerUser}
            className="bg-purple-700 w-48 h-12 items-center justify-center mt-8 rounded-md mb-12">
                <Text className="text-white text-base">Cadastrar</Text>
            </TouchableOpacity>

            
            
        </View>
        </ScrollView>
    )
}