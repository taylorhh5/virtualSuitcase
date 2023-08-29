import AsyncStorage from '@react-native-async-storage/async-storage';

const clearStorage = async function() {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        console.error('Error clearing storage');
    }
}

export default clearStorage;