import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState, useEffect, useLayoutEffect} from 'react';

import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToFav} from '../../redux/reducers/favReducer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {addToCart} from '../../redux/reducers/cartReducer';

export default () => {
  const navigation = useNavigation();
  const route = useRoute();

  const dispatch = useDispatch();

  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (favorite == true) {
      dispatch(addToFav(data));
    }
  }, [favorite]);

  const data = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="m-1 w-10 h-10 rounded-full items-center justify-center">
            <FontAwesome name="arrow-left" size={24} color="#6e6d75" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  return (
    <View className="flex-1 bg-slate-100">
      <View className="h-52 w-full py-4 bg-white justify-center items-center">
        <Image
          source={{uri: data.img}}
          resizeMode="contain"
          className="w-full h-full "
        />
      </View>

      <View className="w-full h-10 my-3 justify-center items-center">
        <Text className="text-2xl text-black">{data.name}</Text>
      </View>
      <View className="w-full max-h-36 px-8 my-3 justify-center items-center">
        <Text className="text-xs text-black">{data.desc}</Text>
      </View>

      <View className="w-full h-8 flex-row px-4  my-3  justify-between">
        <Text className="text-base text-black">Total: </Text>
        <Text className="text-xl text-black">
          R${parseFloat(data.price).toFixed(2)}
        </Text>
      </View>

      <View className="w-full items-center my-4 absolute bottom-0">
        <TouchableOpacity
          onPress={() => dispatch(addToCart(data))}
          className="w-3/4 items-center flex-row bg-slate-800 rounded p-2 ">
          <FontAwesome name="shopping-cart" size={25} color="#fff" />
          <Text className="text-xl p-4 text-white">Adicionar ao carrinho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
