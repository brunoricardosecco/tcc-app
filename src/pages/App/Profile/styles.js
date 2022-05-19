import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../../constants';
import { normalize } from '../../../helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: metrics.baseSpace,
    alignItems: 'center',
    paddingHorizontal: metrics.baseSpace * 4,
  },
  title: {
    fontSize: normalize(20),
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: metrics.baseSpace * 4,
  },
  username: {
    fontSize: normalize(14),
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: metrics.baseSpace * 4,
  },
  menuButtonContainer: {
    borderTopColor: colors.white,
    borderTopWidth: 1,
    width: '100%',
    alignItems: 'center',
    paddingVertical: metrics.baseSpace,
  },
  menuButtonLabel: {
    fontSize: normalize(14),
    color: colors.white,
  },
});

export default styles;
