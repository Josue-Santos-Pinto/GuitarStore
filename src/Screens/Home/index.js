import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import ListItem from '../../Components/ListItem';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Cart from '../Cart';
import auth from '@react-native-firebase/auth';
import {setUID} from '../../redux/reducers/userReducer';
import Swiper from 'react-native-swiper';
import {SwiperItem} from '../../Components/SwiperItem';

export default () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [currentFabId, setCurrentFabId] = useState(0);
  const [fab, setFab] = useState([]);
  const cart = useSelector(state => state.cart);
  const badget = useSelector(state => state.cart.length);
  const length = item.length;

  const ref = database().ref('products');

  const getProducts = () => {
    setIsLoading(true);
    setItem([]);
    ref.on('value', snapshot => {
      if (snapshot.exists()) {
        const produtosObj = snapshot.val();
        const produtosArr = Object.values(produtosObj);
        setItem(produtosArr);
        setIsLoading(false);
      } else {
        alert('Ocorreu um erro');
        setIsLoading(false);
      }
    });

    return () => produtosRef.off('value');
  };

  useEffect(() => {
    getProducts();
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    // Consulta para obter os dados de todos os fabricantes
    const fabricantesRef = database().ref('fab');
    fabricantesRef.on('value', snapshot => {
      if (snapshot.exists()) {
        // Converter o objeto de fabricantes em um array
        const fabricantesData = snapshot.val();
        const fabricantesArray = Object.values(fabricantesData);
        setFab(fabricantesArray);
      } else {
        // Caso não existam fabricantes
        setFab([]);
      }
    });

    // Limpar o ouvinte quando o componente é desmontado
    return () => fabricantesRef.off('value');
  }, []);

  useEffect(() => {
    if (auth().currentUser !== null) dispatch(setUID(auth().currentUser.uid));
  }, []);

  useEffect(() => {
    if (currentFabId !== 0) {
      setFilterList(item.filter(product => product.fab_id === currentFabId));
    } else {
      setFilterList([]);
    }
  }, [currentFabId]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerRight: () => (
        <View className="flex-row">
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
    <View className="flex-1 bg-white ">
      <ScrollView>
        {item.length > 0 && !isLoading ? (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('Search')}
              className="w-full h-20 justify-center items-center ">
              <View className="m-auto bg-gray-100 w-4/5 h-14 rounded-full items-center flex-row p-3">
                <Icon name="search" size={24} color="#6e6d75" />
              </View>
            </TouchableOpacity>

            <View className="flex-1 h-60 w-full ">
              <Swiper activeDotColor="#13874a" dotColor="#d2d2d1">
                <SwiperItem text="Swiper 1" />
                <SwiperItem text="Swiper 2" />
                <SwiperItem text="Swiper 3" />
              </Swiper>
            </View>
            <View className="w-full min-h-24 my-3 flex-row rounded-md items-center">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                  className={`w-24 h-24 rounded-full justify-center items-center mb-3 mx-2 overflow-hidden p-3 ${
                    currentFabId === 0 ? 'bg-gray-300' : 'bg-gray-100'
                  } 
                      `}
                  onPress={() => setCurrentFabId(0)}>
                  <Text className="text-black text-lg">Todos</Text>
                </TouchableOpacity>
                {fab &&
                  fab.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      className={`w-24 h-24 rounded-full justify-center items-center mb-3 mx-2 overflow-hidden p-3 ${
                        item.id === currentFabId ? 'bg-gray-300' : 'bg-gray-100'
                      }
                      `}
                      onPress={() => setCurrentFabId(item.id)}>
                      <Image
                        source={{uri: item.logo}}
                        className="w-full h-full"
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>
            <View className="flex-1 flex-row flex-wrap">
              {item &&
                filterList.length == 0 &&
                item.map((item, index) => (
                  <ListItem
                    data={item}
                    isLast={index === length - 1}
                    key={index}
                  />
                ))}
              {filterList.length > 0 &&
                filterList.map((item, index) => (
                  <ListItem
                    data={item}
                    isLast={index === length - 1}
                    key={index}
                  />
                ))}
            </View>
          </>
        ) : (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
      </ScrollView>
    </View>
  );
};
