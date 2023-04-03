import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {setUID, setEmail} from '../../redux/reducers/userReducer';
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';

export default props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const [menus, setMenus] = useState([]);

  const [img, setImg] = useState('');

  const uid = user.uid;

  let menu = [
    {title: 'Inicio', icon: 'home', screen: 'Home'},
    {title: 'Favoritos', icon: 'heart', screen: 'Favorites'},
    {title: 'Minha Conta', icon: 'user', screen: 'MyAccount'},
    {title: 'Carrinho', icon: 'shopping-cart', screen: 'Cart'},
  ];

  // useEffects

  useEffect(() => {
    if (user.email.toLowerCase() === 'admin@gmail.com') {
      let i = [...menu];
      i.push({
        title: 'Adicionar produtos',
        icon: 'plus',
        screen: 'AddProducts',
      });
      setMenus(i);
    } else {
      setMenus(menu);
    }
  }, [user]);

  if (uid != '') {
    database()
      .ref(`users/${uid}`)
      .on('value', snapshot => {
        if (snapshot.val() != null) {
          setImg(snapshot.val().img);
        }
      });
  }

  const handleSignout = async () => {
    auth()
      .signOut()
      .then(() => navigation.reset({index: 1, routes: [{name: 'Login'}]}));

    dispatch(setEmail(''));
    dispatch(setUID(''));
  };

  return (
    <View className=" flex-1 flex-column py-4 justify-between">
      <View>
        <View className="w-full h-32 justify-center items-center my-4">
          <View className="w-24 h-24 rounded-full justify-center items-center border-2 border-black">
            {img == '' && <Icon name="user" size={25} color="#000" />}
            {img && (
              <Image
                source={{uri: img}}
                className="h-full w-full rounded-full"
              />
            )}
          </View>
          <Text className="text-black my-4">{user.email}</Text>
        </View>
        {menus.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row my-2.5  items-center "
            onPress={() => navigation.navigate(item.screen)}>
            <View
              className={`w-2 h-10 rounded-r mr-4 ${
                props.state.routes[props.state.index].name === item.screen
                  ? 'bg-violet-700'
                  : 'bg-transparent'
              }`}></View>
            <Icon
              name={item.icon}
              size={24}
              color={`${
                props.state.routes[props.state.index].name === item.screen
                  ? 'rgb(109, 40, 217)'
                  : '#CCC'
              }`}
            />
            <Text
              className={` ml-4 text-base ${
                props.state.routes[props.state.index].name === item.screen
                  ? 'text-violet-800'
                  : 'text-slate-400'
              }`}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="w-full items-center justify-center">
        <TouchableOpacity
          onPress={handleSignout}
          className="bg-purple-700 w-48 h-12 items-center justify-center mt-8 rounded-md mb-12">
          <Text className="text-white text-base">Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
