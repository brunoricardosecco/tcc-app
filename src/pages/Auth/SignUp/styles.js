import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../../constants';
import { normalize } from '../../../helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: metrics.baseSpace,
    backgroundColor: colors.primaryDark,
  },
  photoIconContainer: {
    backgroundColor: colors.grey,
    width: normalize(84, true),
    height: normalize(84, true),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: normalize(42, true),
  },
});

export default styles;
