import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import ListItem from '../../Components/ListItem';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Cart from '../Cart';
import auth from '@react-native-firebase/auth';
import {setUID} from '../../redux/reducers/userReducer';

export default () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState([]);
  const [filter, setFilter] = useState('');
  const cart = useSelector(state => state.cart);
  const badget = useSelector(state => state.cart.length);
  const length = item.length;

  const ref = database().ref('products');

  console.log(filter);
  const filterNames = [
    {name: 'Todos', cat: ''},
    {name: 'Guitarras', cat: 'guitarra'},
    {name: 'Violões', cat: 'violao'},
    {name: 'Baixos', cat: 'baixo'},
    {name: 'Cordas', cat: 'corda'},
    {name: 'Amplificadores', cat: 'amplificador'},
  ];

  if (filter == '') {
    var categoriaQuery = ref.orderByChild('cat').startAt('');
  } else {
    var categoriaQuery = ref.orderByChild('cat').equalTo(filter);
  }

  const changeFilter = filterName => {
    setIsLoading(true);
    setItem([]);
    setFilter(filterName);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    setItem([]);
    categoriaQuery.on('value', snapshot => {
      const produtosObj = snapshot.val();
      const produtosArr = [];

      Object.keys(produtosObj).forEach(key => {
        const produto = produtosObj[key];
        produtosArr.push(produto);
      });

      console.log(produtosArr);
      setItem(produtosArr);
      setIsLoading(false);
    });
  }, [filter]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth().currentUser !== null) dispatch(setUID(auth().currentUser.uid));
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerRight: () => (
        <View className="flex-row">
          <TouchableOpacity
            onPress={() => navigation.navigate('Search')}
            className="m-4 w-10 h-10 rounded-full items-center justify-center">
            <Icon name="search" size={24} color="#6e6d75" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            className="m-4 w-10 h-10 rounded-full items-center justify-center">
            <Icon name="shopping-cart" size={24} color="#6e6d75" />
            <View
              className="w-4 h-4 rounded-full absolute right-px items-center justify-center "
              style={{top: -8}}>
              <Text className="text-black bold">{badget}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [cart]);

  return (
    <View className="flex-1 bg-slate-400 ">
      {item.length > 0 && !isLoading ? (
        <>
          <View className="w-full h-20 justify-center items-center ">
            <View className="w-full h-14 bg-black flex-row rounded-md items-center">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {filterNames.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    className="p-2"
                    onPress={() => setFilter(item.cat)}>
                    <Text className="text-white">{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
          <FlatList
            data={item}
            renderItem={({item, index}) => (
              <ListItem data={item} isLast={index === length - 1} />
            )}
            keyExtractor={item => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
};
