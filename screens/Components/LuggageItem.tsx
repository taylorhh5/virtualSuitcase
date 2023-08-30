import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import React from 'react';
import { Item } from '../../ReduxActions/ActionTypes/LuggageActionTypes';
import FastImage from 'react-native-fast-image';


interface LuggageItemProps {
    item: Item;
    handleItemPress: (item: Item) => void;
}

const LuggageItem: React.FC<LuggageItemProps> = ({ item, handleItemPress }) => {
    return (
        <View style={styles.itemContainer}>
            <TouchableHighlight
                underlayColor="transparent"
                onPress={() => {
                    handleItemPress(item);
                }}>
                <View>
                    <FastImage
                        source={{ uri: item.image }}
                        style={{ width: 100, height: 100 }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={styles.itemName}>
                        {item.name}
                    </Text>
                </View>
            </TouchableHighlight>
        </View>
    )
}

export default LuggageItem


const styles = StyleSheet.create({
    itemContainer: {
        marginRight: 16,
        alignItems: 'center',
        borderWidth: 0.3,
        padding: 1
    },
    itemName: {
        marginTop: 8,
        textAlign: 'center',
    },
});