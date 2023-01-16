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
    const [passwordConfirm,setPasswordConfirm] = useState()


    const registerUser = () => {
        
        if(password === passwordConfirm){
            if(email && password){
                auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        navigation.reset({index: 1,routes:[{name:'Login'}]});
                    })
                    .catch(error => {
                        if (error.code === 'auth/email-already-in-use') {
                        alert('Esse Email ja está em uso');
                        }
    
                        if (error.code === 'auth/invalid-email') {
                        alert('Esse Email é invalido');
                        }
    
                        alert(error);
                    });
            } else {
                alert('Preencha todos os Campos')
            }
        } else {
            alert('As senhas devem ser iguais')
        }
            
        
    }

   


    return (
        
        <View className="flex-1 bg-slate-800 ">
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            
            <View className="w-full items-center justify-center">
                <View className="w-24 h-24 rounded-full bg-white items-center justify-center overflow-hidden mt-12 mb-8">
                    <Image 
                        source={require('../../assets/icons/guitar-removebg.png')}
                        resizeMode='contain'
                        style={{width: '90%',height: '90%'}}
                    />
                </View>
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

            <View className="w-full h-28 items-start px-6">
                <Text className="text-white text-base">Confirmar Senha: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
                    secureTextEntry={true}
                    maxLength={25}
                    value={passwordConfirm}
                    onChangeText={(e)=>setPasswordConfirm(e)}
                />
            </View>

            

            <View className="w-full items-center justify-center">
                <TouchableOpacity onPress={registerUser}
                className="bg-purple-700 w-48 h-12 items-center justify-center mt-8 rounded-md mb-12">
                    <Text className="text-white text-base">Cadastrar</Text>
                </TouchableOpacity>
            </View>

            
            </ScrollView>
        </View>
        
    )
}