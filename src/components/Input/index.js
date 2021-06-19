import React, { forwardRef } from 'react';
import { Input as RNEInput } from 'react-native-elements';
import { colors } from '../../contants';

function Input({ style, containerStyle, titleStyle, ...rest }, ref) {
  return (
    <RNEInput
      ref={ref}
      inputContainerStyle={{ borderBottomColor: colors.primaryPurple }}
      {...rest}
      inputStyle={{ color: colors.white }}
    />
  );
}

export default forwardRef(Input);
