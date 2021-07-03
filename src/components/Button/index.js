import React from 'react';
import { View } from 'react-native';
import { Button as RNEButton } from 'react-native-elements';
import { colors } from '../../constants';

export default function Button({ style, containerStyle, titleStyle, ...rest }) {
  return (
    <View style={{ width: '100%', ...containerStyle }}>
      <RNEButton
        buttonStyle={{ backgroundColor: colors.primaryPurple, ...style }}
        {...rest}
        titleStyle={{ ...titleStyle }}
      />
    </View>
  );
}
