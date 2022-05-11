import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../../constants';
import { normalize } from '../../../helpers';

const styles = StyleSheet.create({
  profitCircle: (isPositive) => ({
    paddingTop: normalize(20),
    alignItems: 'center',
    width: normalize(150),
    height: normalize(150),
    borderRadius: 300,
    backgroundColor: colors.primaryDark,
    borderWidth: 1,
    borderTopWidth: 1,
    borderColor: isPositive ? colors.green : colors.red,
    alignSelf: 'center',
    shadowColor: isPositive ? colors.green : colors.red,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 12,
  }),
  baseText: {
    color: colors.white,
    fontSize: normalize(16),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  containerRow: {
    flexDirection: 'row',
    marginBottom: metrics.baseSpace / 2,
  },
  profitValue: {
    color: colors.white,
    fontSize: normalize(30),
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: metrics.baseSpace,
    position: 'absolute',
    top: normalize(40),
  },
  profitLabel: {
    color: colors.white,
    fontSize: normalize(11),
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const pickerStyle = {
  inputIOS: {
    width: normalize(80),
    fontSize: normalize(16),
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: colors.primaryPurple,
    borderRadius: metrics.baseRadius,
    color: colors.white,
    marginHorizontal: 5,
  },
  inputAndroid: {
    fontSize: normalize(16),
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: colors.primaryPurple,
    borderRadius: metrics.baseRadius,
    color: colors.white,
    marginHorizontal: 5,
  },
  placeholder: {
    fontSize: normalize(16),
    color: colors.grey,
  },
};

export { pickerStyle };

export default styles;
