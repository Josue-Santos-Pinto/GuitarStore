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

    const [desc,setDesc] = useState('')
    const [fab,setFab] = useState('')
    const [price,setPrice] = useState('')

    const [unmaskedPrice,setUnmaskedPrice] = useState(0)
    
    const [item,setItem] = useState(0)
    
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user)
    
    const uid = user.uid
    
    //useEffects

    useEffect(()=>{
        
            database()
            .ref(`products`)
            .on('value', snapshot => {    
                    setItem(snapshot.val().length)
            });
        
        
    },[])

    useEffect(()=>{
        console.log(unmaskedPrice)
    },[price])
    

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

        
          database()
            .ref(`products/${item}`)
            .set({
                name,
                desc,
                fab,
                id: item + 1,
                price: unmaskedPrice,
                img
            })
            .then(() => navigation.reset({index:1,routes:[{name:'Home'}]}));
        

    }


    return (
        <View className='bg-slate-800'>
            <ScrollView>

                <View className="w-full h-36 items-center justify-center my-6">

                    <TouchableOpacity onPress={handleImageUser}
                    className="w-36 h-36 rounded items-center justify-center border-2 border-white">
                        {img  &&
                            <Image source={{uri:img}} className="w-full h-full rounded" resizeMode="cover" />
                        }
                        {!img &&
                            <Icon name="plus" size={45} color='#FFF'/>
                        }
                        
                        
                    </TouchableOpacity>

                </View>

            <View className="w-full h-28 items-start px-6">
                <Text className="text-white text-base">Titulo: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
                    maxLength={25}
                    value={name}
                    onChangeText={(e)=>setName(e)}
                />
            </View>

            <View className="w-full h-36 items-start px-6 mb-12">
                <Text className="text-white text-base">Descrição: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full h-full rounded-md mt-3 text-gray-400"
                    value={desc}
                    onChangeText={(e)=>setDesc(e)}
                    multiline={true}
                />
            </View>

            <View className="w-full h-28 items-start px-6">
                <Text className="text-white text-base">Preço: </Text>
                <TextInputMask 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
                    value={price}
                    includeRawValueInChangeText={true}
                    onChangeText={(e,rawText)=>{setPrice(e),setUnmaskedPrice(rawText)}} 
                    type={'money'}
                    options={{
                        precision: 2,
                        separator: ',',
                        delimiter: '.',
                        unit: 'R$',
                        suffixUnit: ''
                      }}
                />
            </View>

            <View className="w-full h-28 items-start px-6">
                <Text className="text-white text-base">Fabricante: </Text>
                <TextInput 
                    className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
                    value={fab}
                    includeRawValueInChangeText={true}
                    onChangeText={(e)=>{setFab(e)}}
                />
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