import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import Icon from "react-native-vector-icons/FontAwesome5";


export default (props) => {

    const navigation = useNavigation()

    const menus = [
        {title: 'Inicio', icon: 'home', screen: 'Home' },
        {title: 'Minhas Compras', icon: 'th-large', screen: 'MyAddStack' },
        {title: 'Favoritos', icon: 'heart', screen: 'MyAccountScreen' },
        {title: 'Minha Conta', icon: 'user', screen: 'Dashboard' }

    ]
    const handleSignout = () => {
        auth()
        .signOut()
        .then(() => navigation.reset({index:1,routes:[{name:'Login'}]}));

    }

    return (
        <View className=" flex-1 flex-column py-4 justify-between">
            <View>
                {menus.map((item,index)=>(
                    <TouchableOpacity key={index} className="flex-row my-2.5  items-center ">
                        <View className={`w-2 h-10 rounded-r mr-4 ${props.state.routes[props.state.index].name === item.screen ? 'bg-violet-700' : 'bg-transparent'}`}></View>
                        <Icon name={item.icon} size={24} color={`${props.state.routes[props.state.index].name === item.screen ? 'rgb(109, 40, 217)' : '#CCC'}`} />
                            <Text className={` ml-4 text-base ${props.state.routes[props.state.index].name === item.screen ? 'text-violet-800' : 'text-slate-400'}`}>{item.title}</Text>
                        
                    </TouchableOpacity>
                ))}
            </View>
            <View className="w-full items-center justify-center">
                <TouchableOpacity 
                    onPress={handleSignout}
                    className="bg-purple-700 w-48 h-12 items-center justify-center mt-8 rounded-md mb-12"
                >
                    <Text className="text-white text-base">Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}