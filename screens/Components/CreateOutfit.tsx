import { StyleSheet, Text, View, FlatList, Image, TouchableHighlight, ScrollView, Modal, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import colors from '../../themes/Colors';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../Reducers/RootReducer';
import { addOutfit, editOutfit } from '../../ReduxActions/OutfitActions';
import { ClothingItem } from '../../ReduxActions/ActionTypes/OutfitTypes';
import { NavigationProp } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { LuggageStackParamList } from '../../Navigation/LuggageStackNavigator';

type CreateOutfitProps = {
    addOutfit: (userId: string, suitcaseId: string, items: number[], navigation: NavigationProp<LuggageStackParamList, 'CreateOutfit'>) => void;
    editOutfit: (outfitId: string, items: number[], navigation: NavigationProp<LuggageStackParamList, 'CreateOutfit'>) => void;
    route: RouteProp<LuggageStackParamList, 'CreateOutfit'>;


};

const CreateOutfit: React.FC<CreateOutfitProps> = ({ addOutfit, editOutfit, route, luggageState, navigation }) => {


    // Initialize the selectedOutfitItems array using useState
    const [selectedOutfitItems, setSelectedOutfitItems] = useState<ClothingItem[]>([]);

    // Create an object to categorize the items
    const categorizedItems: { [category: string]: ClothingItem[] } = {};

    // Iterate through suitcases and categorize items
    luggageState.forEach(item => {
        if (!categorizedItems[item.category]) {
            categorizedItems[item.category] = [];
        }
        categorizedItems[item.category].push(item);
    });

    const selectedIds = selectedOutfitItems.map(item => item?.id);


    // Handle item press to add/remove from the outfit
    const handleItemPress = (item: ClothingItem) => {
        if (selectedOutfitItems.some(selectedItem => selectedItem?.id === item?.id)) {
            // Remove the item if it's already selected
            setSelectedOutfitItems(prevItems =>
                prevItems.filter(selectedItem => selectedItem?.id !== item?.id)
            );
        } else {
            // Add the item if it's not selected
            setSelectedOutfitItems(prevItems => [...prevItems, item]);
        }
    };

    //Clear slectedItems
    const clearSelected = () => {
        setSelectedOutfitItems([])
    }


    const handleAddOutfit = () => {
        addOutfit('rBPi3msspFXpCaECKSDfaX8lCEE3', '6OVpqtWacMeue6i1LnoM', selectedIds, navigation)
    }

    const handleEditOutfit = () => {
        editOutfit(route?.params?.id, selectedIds, navigation)
    }

    const handleSubmit = () => {
        if (!route?.params?.edit) {
            handleAddOutfit()
        }
        else {
            handleEditOutfit()
        }
    }

    useEffect(() => {
        if (route?.params?.selectedOutfitItems) {
            setSelectedOutfitItems(route.params.selectedOutfitItems);
        }
    }, []);

    // Render individual items with 'Added' text if selected
    const renderItem = ({ item }: { item: ClothingItem }) => {
        // Check if the item is already selected
        const isSelected = selectedOutfitItems.some(selectedItem => selectedItem?.id === item?.id);

        return (
            <View style={styles.itemContainer}>
                <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() => handleItemPress(item)}
                >
                    <View>
                        {isSelected ? <Text style={styles.addedText}>Added</Text> : <Text> </Text>}
                        <Image
                            source={{ uri: item?.image }}
                            style={{ width: 100, height: 100 }}
                            onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
                        />
                        <Text style={styles.itemName}>
                            {item?.name}
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => clearSelected()}><Text style={styles.headerText}>Clear selected</Text></TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}><Text style={styles.headerText}>{route.params?.edit ? 'Edit Outfit' : 'Add Outfit'}
                </Text></TouchableOpacity>
            </View>
            <ScrollView style={styles.selectedScrollview} >
                <View style={styles.selectedItems}>
                    {selectedOutfitItems.map(item => (
                        <Image
                            key={item?.id}
                            source={{ uri: item?.image }}
                            style={styles.selectedItemImage}
                        />
                    ))}</View>
            </ScrollView>
            <ScrollView>
                {Object.entries(categorizedItems).map(([category, items]) => (
                    <View key={category} style={styles.categoryContainer}>
                        <Text style={styles.categoryTitle}>{category}</Text>
                        <FlatList
                            data={items}
                            renderItem={renderItem}
                            keyExtractor={item => item?.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const mapStateToProps = (state: RootState) => ({
    luggageState: state.luggage.luggage,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            addOutfit,
            editOutfit
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(CreateOutfit);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 4,
        paddingHorizontal: 8
    },
    headerContainer: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
    },
    selectedScrollview: {
        height: '60%',
        paddingVertical: 1,
        borderBottomWidth: 1,

    },
    selectedItems: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 8,
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        gap: 4,
        paddingHorizontal: 40
    },
    selectedItemImage: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderRadius: 40
    },
    categoryContainer: {
        marginBottom: 20,
        marginTop: 10
    },
    categoryTitle: {
        fontSize: 16,
        marginBottom: 8,
    },
    itemContainer: {
        marginRight: 16,
        alignItems: 'center',
    },
    itemName: {
        marginTop: 8,
        textAlign: 'center',
    },
    buttonContainer: {
        backgroundColor: colors.primary,
        borderWidth: 1,
        borderRadius: 20,
        padding: 6
    },
    addedText: {
        color: colors.primary,
        textAlign: 'center',
    },
});

