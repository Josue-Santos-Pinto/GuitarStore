import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState,useRef } from "react";
import { Alert, Image, PermissionsAndroid, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import cepApi from "../../services/cepApi";
import { TextInputMask } from "react-native-masked-text";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import database from '@react-native-firebase/database';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {setImage} from '../../redux/reducers/userReducer'


export default () => {

    const navigation = useNavigation()

     //dist = district = Bairro

     // Variaveis

    const [name,setName] = useState('')

    const [img,setImg] = useState('')

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
    
    
    const [key,setKey] = useState('')
    
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user)
    
    
    
    const email = user.email
    const uid = user.uid


    //UseEffects

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

    
    


    useEffect(()=>{
        if(uid != ''){
            database()
            .ref(`users/${uid}`)
            .on('value', snapshot => {
                if(snapshot.val() != null){
                    console.log(snapshot.val())
                setName(snapshot.val().name);
                setImg(snapshot.val().img)
                setTel(snapshot.val().tel);
                setCep(snapshot.val().cep);
                setCpf(snapshot.val().cpf);
                setUnmaskedCpf(snapshot.val().cpf);
                setUnmaskedTel(snapshot.val().tel);
                setUnmaskedCep(snapshot.val().cep);
                setUnmaskedCpf(snapshot.val().cpf);
                setCity(snapshot.val().city);
                setStreet(snapshot.val().street);
                setDist(snapshot.val().dist);
                setNum(snapshot.val().num);
                }
            });
        }
        
    },[uid])

    // Funções

        // Camera

        let options = {
            saveToPhotos: true,
            mediaType:'photo'
        }

    const handleImageUser = () => {
        Alert.alert(
            "Selecione",
            "Informe de onde você deseja pegar a foto",
            [
                {
                    text:"Camera",
                    onPress: () => pickImageFromCamera(),
                    style: 'default'
                },

                {
                        text:"Galeria",
                        onPress: () => pickImageFromGallery(),
                        style: 'default'
                },
                
                ],
                {
                        cancelable: true,
                        onDimiss:()=>console.log('Depois ve')
                }
            )
    }

    

    const pickImageFromCamera = async () => {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA
        )
        if(granted == PermissionsAndroid.RESULTS.GRANTED){
            const result = await launchCamera(options)
            setImg(result.assets[0].uri)
        }
        
    }

    const pickImageFromGallery = async () => {
        const result = await launchImageLibrary(options);
        setImg(result.assets[0].uri)
    }


    // Push para o firebase 

    const submitData = () => {

       

            // Atualização de dados do Firebase

            database()
            .ref(`/users/${uid}`)
            .update({
                name,
                img,
                tel: unmaskedTel,
                cpf: unmaskedCpf,
                cep: unmaskedCep,
                email,
                city,
                street,
                dist,
                num
            })
            .then(() => alert('Alterações salvas'),navigation.navigate('Home'));
        
        

    }


    return (
        <View className='bg-slate-800'>
            <ScrollView>

                <View className="w-full h-36 items-center justify-center my-6">

                    <View className="w-36 h-36 rounded-full items-center justify-center border-2">
                        {img  &&
                            <Image source={{uri:img}} className="w-full h-full rounded-full" resizeMode="cover" />
                        }
                        {!img &&
                            <Icon name="user" size={45} color='#000'/>
                        }
                        
                        <TouchableOpacity onPress={handleImageUser}
                        className="w-12 h-12 rounded-full absolute right-0 bottom-0 bg-gray-200 items-center justify-center z-10">
                            <Icon name="camera" size={25} color='#000'/>
                        </TouchableOpacity>
                    </View>

                </View>

            <View className="w-full h-28 items-start px-6">
                <Text className="text-white text-base">Nome Completo: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
                    maxLength={25}
                    value={name}
                    onChangeText={(e)=>setName(e)}
                />
            </View>

            <View className="w-full h-28 items-start px-6">
                <Text className="text-white text-base">Email: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-400"
                    maxLength={25}
                    value={email}
                    editable={false}
                />
            </View>

            <View className="w-full h-28 items-start px-6">
                <Text className="text-white text-base">Telefone: </Text>
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
                <Text className="text-white text-base">CPF: </Text>
                <TextInputMask 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
                    value={cpf}
                    includeRawValueInChangeText={true}
                    onChangeText={(e,rawText)=>{setCpf(e),setUnmaskedCpf(rawText)}} 
                    type={"cpf"}
                />
            </View>

            <View className="w-full h-28 items-start px-6">
                <Text className="text-white text-base">CEP: </Text>
                <TextInputMask 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
                    value={cep}
                    includeRawValueInChangeText={true}
                    onChangeText={(e,rawText)=>{setCep(e),setUnmaskedCep(rawText)}} 
                    type={'zip-code'}

                />
            </View>

            <View className="w-full h-28 items-start px-6">
                <Text className="text-white text-base">Cidade: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
                    value={city}
                    onChangeText={(e)=>setCity(e)}
                />
            </View>

            <View className="w-full h-28 items-start px-6">
                <Text className="text-white text-base">Rua: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
                    value={street}
                    onChangeText={(e)=>setStreet(e)}
                />
            </View>

        {/*Alinhar o Bairro e o Numero */}

        <View className="flex-row"> 

            <View className="w-64 h-28 items-start px-6">
                <Text className="text-white text-base">Bairro: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
                    value={dist}
                    onChangeText={(e)=>setDist(e)}
                />
            </View>

            <View className="w-28 h-28 items-start px-6">
                <Text className="text-white text-base">Número: </Text>
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