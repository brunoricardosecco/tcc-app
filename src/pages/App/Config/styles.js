import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../../constants';
import { normalize } from '../../../helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryDark,
    paddingHorizontal: metrics.baseSpace,
  },
  label: {
    fontSize: normalize(14),
    color: colors.white,
  },
  title: {
    fontSize: normalize(20),
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default styles;
