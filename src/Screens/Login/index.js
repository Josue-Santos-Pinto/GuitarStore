import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {setEmail} from '../../redux/reducers/userReducer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default () => {
  const navigation = useNavigation();

  const dispatch = useDispatch(state => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const [emailLogin, setEmailLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (emailLogin.trim() != '' && password.trim() != '') {
      setIsLoading(true);
      auth()
        .signInWithEmailAndPassword(emailLogin, password)
        .then(() => {
          dispatch(setEmail(emailLogin));
          navigation.reset({index: 1, routes: [{name: 'MainDrawer'}]});
        })
        .catch(error => {
          alert(error);
        })
        .finally(() => setIsLoading(false));
    } else {
      alert('Preencha os campos');
    }
  };

  const handleForgotPassword = () => {
    if (emailLogin) {
      auth()
        .sendPasswordResetEmail(emailLogin)
        .then(() =>
          Alert.alert(
            'Redefinir senha',
            'Email para redefinição de senha enviado com sucesso',
          ),
        );
    } else {
      Alert.alert(
        'Digite o email',
        'É necessário informar o email para redefinir a senha',
      );
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex-1 bg-slate-800 items-center pb-24">
        <View className="w-36 h-36 rounded-full bg-white items-center justify-center overflow-hidden mt-20 mb-12">
          <Image
            source={require('../../assets/icons/guitar-removebg.png')}
            resizeMode="contain"
            style={{width: '90%', height: '90%'}}
          />
        </View>

        <View className="w-full h-28 items-start px-6">
          <Text className="text-white text-base">Email: </Text>
          <TextInput
            className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
            value={emailLogin}
            onChangeText={e => setEmailLogin(e)}
          />
        </View>

        <View className="w-full h-28 items-start px-6">
          <Text className="text-white text-base">Senha: </Text>
          <TextInput
            className="bg-slate-200 px-2.5 w-full rounded-md mt-3 text-gray-900"
            secureTextEntry={true}
            value={password}
            onChangeText={e => setPassword(e)}
          />
        </View>

        <TouchableOpacity
          onPress={handleSignIn}
          className="bg-purple-700 w-48 h-12 items-center justify-center mt-4 rounded-md">
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white text-base">Entrar</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row items-center justify-around w-full h-20">
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            className="mt-8 flex-row items-center">
            <FontAwesome5 name="user-plus" size={20} color="#fff" />
            <Text className="text-white text-xs ml-2">Cadastrar-se</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleForgotPassword}
            className="mt-8 flex-row items-center">
            <FontAwesome5 name="envelope" size={20} color="#fff" />
            <Text className="text-white text-xs ml-2">Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
