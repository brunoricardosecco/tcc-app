import Reactotron from 'reactotron-react-native';

Reactotron.configure({ host: '192.168.0.166' }) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from // controls connection & communication settings
  .useReactNative({
    networking: {
      ignoreContentTypes: /^(image)\/.*$/i,
      ignoreUrls: /\/(logs|symbolicate)$/,
    },
  }) // add all built-in react native plugins
  .connect(); // let's connect!
