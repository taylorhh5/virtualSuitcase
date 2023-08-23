import AsyncStorage from '@react-native-async-storage/async-storage';

const localDeviceStorage = {
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('Error in localDeviceStorage');

    }
  },
};

export default localDeviceStorage;
