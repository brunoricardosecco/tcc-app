import React from 'react';
import { View } from 'react-native';
import { Button as RNEButton, ButtonProps } from 'react-native-elements';
import { colors } from '../../contants';

export default function Button(props) {
  return (
    <View style={{ width: '100%' }}>
      <RNEButton
        buttonStyle={{ backgroundColor: colors.primaryPurple }}
        {...props}
      />
    </View>
  );
}
