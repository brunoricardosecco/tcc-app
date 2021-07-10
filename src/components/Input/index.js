import React, { forwardRef } from 'react';
import { Input as RNEInput } from 'react-native-elements';
import { colors, metrics } from '../../constants';

function Input({ style, containerStyle, titleStyle, ...rest }, ref) {
  return (
    <RNEInput
      ref={ref}
      inputContainerStyle={{
        borderBottomColor: colors.primaryPurple,
        paddingHorizontal: 0,
        marginRight: 0,
        marginLeft: 0,
        ...style,
      }}
      inputStyle={{
        color: colors.white,
        paddingHorizontal: 0,
        marginHorizontal: 0,
        marginRight: 0,
        marginLeft: 0,
      }}
      containerStyle={{
        paddingRight: metrics.baseSpace,
        paddingLeft: metrics.baseSpace,
      }}
      placeholderStyle={{ color: colors.grey }}
      {...rest}
    />
  );
}

export default forwardRef(Input);
