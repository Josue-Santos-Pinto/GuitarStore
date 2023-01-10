import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState,useRef } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import cepApi from "../../services/cepApi";
import { TextInputMask } from "react-native-masked-text";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useSelector } from "react-redux";
import database from '@react-native-firebase/database';

export default () => {

    const navigation = useNavigation()

     //dist = district = Bairro

     const [name,setName] = useState('')

    const [tel,setTel] = useState('')
    const [cpf,setCpf] = useState('')
    const [cep,setCep] = useState('')
    const [city,setCity] = useState('')
    const [street,setStreet] = useState('')
    const [dist,setDist] = useState('')
    const [num,setNum] = useState('')
    const [unmaskedCpf,setUnmaskedCpf] = useState('')
    const [unmaskedCep,setUnmaskedCep] = useState('')
    const [unmaskedTel,setUnmaskedTel] = useState('')
    const [validCpf,setValidCpf] = useState('')
    const [validTel,setValidTel] = useState('')
    const [validCep,setValidCep] = useState('')

    
    const user = useSelector(state=>state.user)
    
    const email = user.email

    useEffect(()=>{
        const getAddress = async () => {
            if(unmaskedCep.length == 8){
                const api = await cepApi.getApi(unmaskedCep)
                console.log(api)
                if(!api.erro){
                    setCity(api.localidade)
                    setStreet(api.logradouro)
                    setDist(api.bairro)
                } else if(api.erro == true){
                    alert('CEP Inexistente')
                }
            }
            
        }
        getAddress()
    },[cep])

    const submitData = () => {
        
            const newReference = database().ref('/usuarios').push();

            console.log('Auto generated key: ', newReference.key);

            newReference
            .set({
                name: 'josue',
            })
            .then(() => console.log('Data updated.'));
                    


    }


    return (
        <View >
            <ScrollView>

                <View className="w-full h-36 items-center justify-center my-6">

                    <View className="w-36 h-36 rounded-full bg-black">
                        <View className="w-12 h-12 rounded-full absolute right-0 bottom-0 bg-gray-200 items-center justify-center">
                            <Icon name="camera" size={25} color='#000'/>
                        </View>
                    </View>

                </View>

            <View className="w-full h-28 items-start px-6">
                <Text className="text-black text-base">Nome Completo: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
                    maxLength={25}
                    value={name}
                    onChangeText={(e)=>setName(e)}
                />
            </View>

            <View className="w-full h-28 items-start px-6">
                <Text className="text-black text-base">Email: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
                    maxLength={25}
                    value={email}
                    editable={false}
                />
            </View>

            <View className="w-full h-28 items-start px-6">
                <Text className="text-black text-base">Telefone: </Text>
                <TextInputMask 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
                    value={tel}
                    includeRawValueInChangeText={true}
                    onChangeText={(e,rawText)=>{setTel(e),setUnmaskedTel(rawText)}} 
                    type={'cel-phone'}
                    options={{
                        maskType:'BRL',
                        withDDD: true,
                        dddMask:'(99) '
                    }}
                />
            </View>

            <View className="w-full h-28 items-start px-6">
                <Text className="text-black text-base">CPF: </Text>
                <TextInputMask 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
                    value={cpf}
                    includeRawValueInChangeText={true}
                    onChangeText={(e,rawText)=>{setCpf(e),setUnmaskedCpf(rawText)}} 
                    type={"cpf"}
                />
            </View>

            <View className="w-full h-28 items-start px-6">
                <Text className="text-black text-base">CEP: </Text>
                <TextInputMask 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
                    value={cep}
                    includeRawValueInChangeText={true}
                    onChangeText={(e,rawText)=>{setCep(e),setUnmaskedCep(rawText)}} 
                    type={'zip-code'}

                />
            </View>

            <View className="w-full h-28 items-start px-6">
                <Text className="text-black text-base">Cidade: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
                    value={city}
                    onChangeText={(e)=>setCity(e)}
                />
            </View>

            <View className="w-full h-28 items-start px-6">
                <Text className="text-black text-base">Rua: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
                    value={street}
                    onChangeText={(e)=>setStreet(e)}
                />
            </View>

        {/*Alinhar o Bairro e o Numero */}

        <View className="flex-row"> 

            <View className="w-64 h-28 items-start px-6">
                <Text className="text-black text-base">Bairro: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
                    value={dist}
                    onChangeText={(e)=>setDist(e)}
                />
            </View>

            <View className="w-28 h-28 items-start px-6">
                <Text className="text-black text-base">Número: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
                    value={num}
                    onChangeText={(e)=>setNum(e)}
                />
            </View>  
        </View>

        <View className="w-full items-center">
            <TouchableOpacity onPress={submitData}
                className="bg-purple-700 w-48 h-12 items-center justify-center mt-8 rounded-md mb-12">
                    <Text className="text-white text-base">Salvar</Text>
            </TouchableOpacity>
        </View>

            </ScrollView>
        </View>
    )
}