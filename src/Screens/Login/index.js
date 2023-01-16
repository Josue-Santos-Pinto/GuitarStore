import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import auth from '@react-native-firebase/auth';
import { useDispatch } from "react-redux";
import { setEmail } from '../../redux/reducers/userReducer';

export default () => {

    const navigation = useNavigation()

    const dispatch = useDispatch(state=>state.user)

    const [emailLogin,setEmailLogin] = useState('')
    const [password,setPassword] = useState('')

    

    const handleSignIn = () => {
        if(emailLogin.trim().length > 6 && password.trim().length > 5){
        auth()
            .signInWithEmailAndPassword(emailLogin, password)
            .then(() => {
                dispatch(setEmail(emailLogin))
                navigation.reset({index:1,routes:[{name:'MainDrawer'}]});
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });
        } else if(emailLogin.trim().length < 6){
            alert('O Email deve ter mais de 6 caracteres')
        } else if(password.trim().length < 4){
            alert('A senha deve ter mais de 4 caracteres')
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex-1 bg-slate-800 items-center pb-24">
                <View className="w-36 h-36 rounded-full bg-white items-center justify-center overflow-hidden mt-20 mb-12">
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
                        value={emailLogin}
                        onChangeText={(e)=>setEmailLogin(e)}
                    />
                </View>

                <View className="w-full h-28 items-start px-6">
                    <Text className="text-white text-base">Senha: </Text>
                    <TextInput 
                        className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(e)=>setPassword(e)}
                    />
                </View>

                <TouchableOpacity  onPress={handleSignIn}
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
        </ScrollView>
    )
}