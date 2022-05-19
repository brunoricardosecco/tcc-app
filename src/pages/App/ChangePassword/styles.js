import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../../constants';
import { normalize } from '../../../helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: metrics.baseSpace,
    backgroundColor: colors.primaryDark,
  },
  title: {
    fontSize: normalize(20),
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: metrics.baseSpace * 4,
  },
});

export default styles;
