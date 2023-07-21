import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../redux/reducers/cartReducer';
import {addToFav} from '../../redux/reducers/favReducer';
import {useNavigation} from '@react-navigation/native';

export default ({data, isLast}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const navigation = useNavigation();

  const [favorite, setFavorite] = useState(false);

  const cart = useSelector(state => state.cart);
  const fav = useSelector(state => state.fav);
  const discount = data.price / 10;

  useEffect(() => {
    if (favorite == true) {
      dispatch(addToFav(data));
    }
  }, [favorite]);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Product', data)}
      activeOpacity={1}
      isLast
      className="w-1/2 p-5 ">
      <View className=" h-44 items-center justify-center p-3 bg-gray-100 rounded-md">
        <Image
          className="w-full h-full"
          source={{uri: data.img}}
          resizeMode="contain"
        />
        <TouchableOpacity
          activeOpacity={0.6}
          className=" w-8 h-8 justify-center items-center rounded-full"
          style={{position: 'absolute', top: 5, right: 10}}
          onPress={() => setFavorite(!favorite)}>
          {favorite == false && <Icon name="heart-o" size={20} color="#000" />}
          {favorite == true && <Icon name="heart" size={20} color="#f83333" />}
        </TouchableOpacity>
      </View>
      <View>
        <View className=" min-h-12  m-4 ">
          <Text className="text-black text-xs bold">{`${
            data.name.trim().length > 30
              ? data.name.slice(0, 30) + '...'
              : data.name
          }`}</Text>
          <Text className="text-black text-sm my-2 leading-relaxed">
            R$ {parseFloat(data.price).toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
