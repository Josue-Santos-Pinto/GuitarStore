import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";

export default () => {
    const navigation = useNavigation()

    const handleSignout = () => {
        auth()
        .signOut()
        .then(() => navigation.reset({index:1,routes:[{name:'Login'}]}));

    }

    return (
        <View className="flex-1 items-center justify-center ">
            <TouchableOpacity 
                onPress={handleSignout}
                className="bg-purple-700 w-48 h-12 items-center justify-center mt-8 rounded-md mb-12"
            >
                <Text className="text-white text-base">Sair</Text>
            </TouchableOpacity>
        </View>
    )
}