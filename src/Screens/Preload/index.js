import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import AnimatedLottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

export default () => {
    // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const navigation = useNavigation()

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    
    
  }, []);

  if (initializing) return null;

  if (!user) {
    setTimeout(()=>{
        navigation.reset({index:1,routes:[{name:'Login'}]})
    },2000)
     
  } else {
    setTimeout(()=>{
        navigation.reset({index:1,routes:[{name:'MainDrawer'}]})
    },2000)
    
  }
    

    return (
        <View className="flex-1 items-center justify-center bg-slate-800 ">
            <AnimatedLottieView 
                source={require('../../assets/lottie/electric-guitar-music.json')}
                autoPlay={true}
                loop={true}
                resizeMode='contain'
            />
        </View>
    )
}


  

  

  

 

 

 
   

/*import React, { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

export default () => {
    

    useEffect(()=>{
        setTimeout(()=>{
            navigation.reset({
                index: 1,
                routes:[{name:'Login'}]
            })
        },2000)
    },[])


    return (
        <View className="flex-1 items-center justify-center bg-slate-800 ">
            <AnimatedLottieView 
                source={require('../../assets/lottie/electric-guitar-music.json')}
                autoPlay={true}
                loop={true}
                resizeMode='contain'
            />
        </View>
    )
}
*/