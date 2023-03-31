import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../redux/reducers/cartReducer';
import {addToFav} from '../../redux/reducers/favReducer';

export default ({data, isLast}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const [favorite, setFavorite] = useState(false);

  const cart = useSelector(state => state.cart);
  const fav = useSelector(state => state.fav);
  const discount = data.price / 10;

  console.log(isLast);

  useEffect(() => {
    if (favorite == true) {
      dispatch(addToFav(data));
    }
  }, [favorite]);

  useEffect(() => {
    console.log(fav);
  }, [favorite]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      isLast
      className={` ${
        isLast
          ? 'w-1/2 bg-slate-100  border-2 border-gray-300'
          : ' flex-1 bg-slate-100  border-2 border-gray-300'
      } `}>
      <View className=" h-56 items-center justify-center">
        <Image
          className="w-full h-full"
          source={{uri: data.img}}
          resizeMode="cover"
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        className=" w-8 h-8 justify-center items-center rounded-full  bg-slate-100"
        style={{position: 'absolute', top: 5, right: 10}}
        onPress={() => setFavorite(!favorite)}>
        {favorite == false && <Icon name="heart-o" size={20} color="red" />}
        {favorite == true && <Icon name="heart" size={20} color="red" />}
      </TouchableOpacity>
      <View className="w-60 h-72 ">
        <View className="w-36 h-12  m-4 overflow-hidden">
          <Text className="text-black text-sm bold">{`${
            data.name.trim().length > 30
              ? data.name.slice(0, 30) + '...'
              : data.name
          }`}</Text>
        </View>

        <View className="px-4">
          <Text className="text-black text-sm my-2 leading-relaxed">
            R$ {parseFloat(data.price).toFixed(2)}
          </Text>
          <Text className="text-green-600 text-xs ">
            {`em 10x R$${parseFloat(discount).toFixed(2)} sem juros`}
          </Text>
        </View>

        <View className="px-4 mt-3">
          <Text className="text-green-600 text-xs ">Frete Gratis</Text>
        </View>
        {/*<TouchableOpacity
            onPress={() => dispatch(addToCart(data))}
            className="bg-purple-700 p-3 w-32 h-12  items-center justify-center  rounded-md  ">
            <Text>Adicionar ao carrinho</Text>
  </TouchableOpacity>*/}
      </View>
    </TouchableOpacity>
  );
};
