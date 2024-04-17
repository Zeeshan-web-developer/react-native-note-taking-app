import React from 'react';
import {Text} from 'react-native';
import {View} from 'react-native';
import {useRoute} from '@react-navigation/native';

type Props = {};

export default function ViewNote({}: Props) {
  const route = useRoute();
  const {todo} = route.params;

  return (
    <View>
      <Text>{todo}</Text>
    </View>
  );
}
