import { StyleSheet, Text, View, FlatList, Image, TouchableHighlight, ScrollView, Modal, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
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
import { CategoryMapper } from '../data/CategoryData';
import FastImage from 'react-native-fast-image';

type CreateOutfitProps = {
    addOutfit: (userId: string, suitcaseId: string, items: number[], navigation: NavigationProp<LuggageStackParamList, 'CreateOutfit'>) => void;
    editOutfit: (outfitId: string, items: number[], navigation: NavigationProp<LuggageStackParamList, 'CreateOutfit'>) => void;
    route: RouteProp<LuggageStackParamList, 'CreateOutfit'>;


};

const CreateOutfit: React.FC<CreateOutfitProps> = ({ addOutfit, editOutfit, route, luggageState, navigation, auth }) => {


    // Initialize the selectedOutfitItems array using useState
    const [selectedOutfitItems, setSelectedOutfitItems] = useState<ClothingItem[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [outfitName, setOutfitName] = useState('');

    const showModal = () => {
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };

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
        hideModal();
        if (selectedOutfitItems.length > 0) {
            addOutfit(auth.uid, route?.params?.suitcaseId, selectedIds, outfitName, navigation);
            setOutfitName('');
        } else {
            Alert.alert('Error', 'Please add items to the outfit.');
        }
    };

    const handleEditOutfit = () => {
        if (selectedOutfitItems.length > 0) {
            editOutfit(route?.params?.id, selectedIds, outfitName, navigation);
        } else {
            Alert.alert('Error', 'Please add items to the outfit.');
        }
    };

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
        if (route?.params?.outfitName) {
            setOutfitName(route.params.outfitName);
        }
    }, []);

    // Render individual items with 'Added' text if selected
    const renderOutfitImage = ({ item }: { item: ClothingItem }) => {
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
                        <FastImage
                            source={{ uri: item?.image }}
                            style={{ width: 100, height: 100 }}
                            resizeMode={FastImage.resizeMode.contain}
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
                <TouchableOpacity style={styles.buttonContainer} onPress={showModal}><Text style={styles.headerText}>{route.params?.edit ? 'Edit Outfit' : 'Add Outfit'}
                </Text></TouchableOpacity>
            </View>
            <ScrollView style={styles.selectedScrollview} >
                <View style={styles.selectedItems}>
                    {selectedOutfitItems.map(item => (
                        <FastImage
                            key={item?.id}
                            source={{ uri: item?.image }}
                            style={styles.selectedItemImage}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    ))}</View>
            </ScrollView>
            <ScrollView style={styles.categoryScrollView}>
                {Object.entries(categorizedItems).map(([category, items]) => (
                    <View key={category}>
                        <Text style={styles.categoryTitle}>{CategoryMapper[category]} ({items.length} items)</Text>
                        <FlatList
                            data={items}
                            renderItem={renderOutfitImage}
                            keyExtractor={item => item?.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                ))}
            </ScrollView>
            <Modal visible={isModalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>(Optional) Outfit name:</Text>
                        <TextInput
                            style={styles.modalTextInput}
                            onChangeText={text => setOutfitName(text)}
                            value={outfitName}
                            placeholder='Add name or submit without'
                        />
                        <View style={styles.modalButtonContainer}>
                            <Button title="Cancel" onPress={hideModal} color={colors.primary} />
                            <Button title="Add" onPress={handleSubmit} />
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

const mapStateToProps = (state: RootState) => ({
    luggageState: state.luggage.luggage,
    auth: state.auth.user,

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
        height: '56%',
        paddingVertical: 3,
        borderBottomWidth: 1,
    },
    selectedItems: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 8,
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        gap: 4,
        paddingHorizontal: 20,
    },
    selectedItemImage: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderRadius: 40
    },
    categoryScrollView: {
        paddingTop: 8
    },
    categoryTitle: {
        fontSize: 16,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    modalTextInput: {
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 5,
        padding: 8,
        marginTop: 10,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },

});

