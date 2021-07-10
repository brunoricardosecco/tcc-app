import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../../constants';
import { normalize } from '../../../helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    padding: metrics.baseSpace,
  },
  username: {
    color: colors.white,
    fontSize: normalize(24),
    textAlign: 'center',
  },
  profit: {
    color: colors.white,
    fontSize: normalize(24),
    textAlign: 'center',
  },
});

export default styles;
