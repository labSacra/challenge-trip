import React from 'react';
import { Pressable, Text } from 'react-native';

type ButtonProps = {
  onPress?: () => void;
  title: string;
};

/**
 * Not using styled components because pressable is not properly supported
 */
export const Button = ({ onPress, title }: ButtonProps) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => ({
      backgroundColor: pressed ? '#d2f6f7' : '#afeef0',
      padding: 10,
      minWidth: 90,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    })}>
    <Text>{title}</Text>
  </Pressable>
);
