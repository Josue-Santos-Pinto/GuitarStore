import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {removeItem} from '../../redux/reducers/favReducer';
import {useNavigation} from '@react-navigation/native';

export default () => {
  const [favBoolean, setFavBoolean] = useState(true);

  const fav = useSelector(state => state.fav);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  let desc = fav.desc;

  return (
    <>
      {fav.length > 0 && (
        <View className="flex-1 bg-slate-800">
          <ScrollView>
            {fav.map((item, index) => (
              <View
                className="w-full h-60 my-4 flex-row min-h-min bg-white"
                key={item.id}>
                <View className="w-36 h-full items-center justify-center">
                  <Image
                    source={{uri: item.img}}
                    resizeMode="cover"
                    className="w-full h-full"
                  />
                </View>
                <View className="flex-1 p-4">
                  <View className="w-full flex-row justify-end">
                    <TouchableOpacity
                      onPress={() => dispatch(removeItem(item.id))}>
                      <Icon name="heart" size={20} color="red" />
                    </TouchableOpacity>
                  </View>

                  <Text className="text-black bold text-2xl">{`${(item.name =
                    item.name.length > 12
                      ? `${item.name.slice(0, 22)}...`
                      : item.name)}`}</Text>

                  <Text className="text-black " style={{minHeight: 80}}>
                    {`${(desc =
                      item.desc.length > 100
                        ? `${item.desc.slice(0, 100)}...`
                        : item.desc)}`}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Product', fav[0])}
                    className="w-24 h-12 justify-center items-center bg-slate-600">
                    <Text className="text-white">Ver mais</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
      {fav.length == 0 && (
        <View className="flex-1 h-96 w-full justify-center items-center bg-slate-800 px-3  ">
          <Ionicons name="heart-dislike" color="#fff" size={250} />
        </View>
      )}
    </>
  );
};
