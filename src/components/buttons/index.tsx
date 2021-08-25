import { StyledText } from 'components/buttons/styles';
import { Text } from 'components/texts';
import React from 'react';
import { Pressable } from 'react-native';

type ButtonProps = {
  onPress?: () => void;
  title: string;
  isDisabled?: boolean;
};

/**
 * Not using styled components because pressable is not properly supported
 */
export const Button = ({ onPress, title, isDisabled }: ButtonProps) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => ({
      backgroundColor: pressed ? '#f558b4' : '#ff0095',
      padding: 10,
      minWidth: 90,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    })}
    disabled={isDisabled}>
    <StyledText>{title}</StyledText>
  </Pressable>
);
