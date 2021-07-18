import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../../constants';
import { normalize } from '../../../helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryDark,
  },
  title: {
    fontSize: normalize(28),
    textAlign: 'center',
    color: colors.white,
    marginHorizontal: metrics.baseSpace,
  },
  itemContainer: {
    marginHorizontal: metrics.baseSpace,
    backgroundColor: colors.primaryPurple,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: metrics.baseRadius,
    padding: metrics.baseSpace * 1.5,
    marginTop: metrics.baseSpace,
    borderWidth: 2,
    borderColor: colors.primaryPurple,

    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 12,
  },
  firstPlace: {
    borderColor: colors.yellow,
    shadowColor: colors.yellow,
  },
  secondPlace: {
    borderColor: colors.silver,
    shadowColor: colors.silver,
  },
  thirdPlace: {
    borderColor: colors.bronze,
    shadowColor: colors.bronze,
  },
  username: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default styles;
