import {View, TouchableOpacity, Text} from 'react-native';

export function SwiperItem({text}) {
  return (
    <View className="flex-1 justify-center items-center pb-6">
      <TouchableOpacity
        className="w-11/12 h-3/4 bg-black rounded-xl p-3"
        activeOpacity={0.7}>
        <Text>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}
