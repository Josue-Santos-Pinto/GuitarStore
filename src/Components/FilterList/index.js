import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

export default ({filterName, changeFilter}) => {
  return (
    <TouchableOpacity className="p-4" onPress={changeFilter}>
      <Text className="text-white">{filterName}</Text>
    </TouchableOpacity>
  );
};
