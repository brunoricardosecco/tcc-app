import React, { forwardRef } from 'react';
import { Input as RNEInput } from 'react-native-elements';
import { colors } from '../../constants';

function Input({ style, containerStyle, titleStyle, ...rest }, ref) {
  return (
    <RNEInput
      ref={ref}
      inputContainerStyle={{ borderBottomColor: colors.primaryPurple }}
      inputStyle={{ color: colors.white }}
      placeholderStyle={{ color: colors.grey }}
      {...rest}
    />
  );
}

export default forwardRef(Input);
