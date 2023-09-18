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
                        style={{ width: 114, height: 114, borderRadius: 8,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    {/* <Text style={styles.itemName}>
                        {item.name}
                    </Text> */}
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
        // shadowColor: "#000",
        // shadowOpacity: 0.2,
        // shadowRadius: 5,
        // backgroundColor:'#fefefe',
        // borderRadius:8,
        // padding:6,  
    },
    itemName: {
        marginTop: 8,
        textAlign: 'center',
    },
});