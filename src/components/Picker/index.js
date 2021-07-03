import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
import { colors, metrics } from '../../constants';
import { normalize } from '../../helpers';

export default function Picker({
  items,
  onValueChange,
  errorMessage,
  ...rest
}) {
  return (
    <>
      <RNPickerSelect
        onValueChange={onValueChange}
        items={items}
        {...rest}
        useNativeAndroidPickerStyle={false}
        style={pickerSelectStyles}
        placeholder={placeholder}
      />
      <TextInput
        style={{
          color: 'red',
          fontSize: 13,
          textAlign: 'left',
          width: '100%',
          marginLeft: 30,
          marginBottom: 10,
        }}
      >
        {errorMessage || ''}
      </TextInput>
    </>
  );
}

const placeholder = {
  label: 'Selecione',
  value: null,
  color: colors.black,
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: normalize(16),
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryPurple,
    borderRadius: metrics.baseRadius,
    color: colors.white,
    paddingRight: 30, // to ensure the text is never behind the icon
    marginHorizontal: 5,
  },
  inputAndroid: {
    fontSize: normalize(16),
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.primaryPurple,
    borderRadius: metrics.baseRadius,
    color: colors.white,
    paddingRight: 30, // to ensure the text is never behind the icon
    marginHorizontal: 5,
  },
  placeholder: {
    fontSize: normalize(16),
    color: colors.grey,
  },
});
