import { StyleSheet, Text, View, FlatList, ScrollView, Modal, TouchableOpacity, } from 'react-native';
import React, { useState, } from 'react';
import colors from '../themes/Colors';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { RootState } from '../Reducers/RootReducer';
import { Item } from '../ReduxActions/ActionTypes/LuggageActionTypes';
import { addItem, deleteItem, editItem, } from '../ReduxActions/LuggageActions';
import { categories, CategoryMapper } from './data/CategoryData';
import LuggageItem from './Components/LuggageItem';
import FastImage from 'react-native-fast-image';
import { categoryOrder } from './data/CategoryData';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';

type AllLuggageItemsProps = {
    suitcaseId: string;
    allLuggageItems: Item[];
    deleteItem: (id: string) => void;
    editItem: (id: string, updatedItem: Partial<Item>, action: string) => (dispatch: Dispatch<AnyAction>) => void,
    loadingItems: boolean;
};

const AllLuggageItems: React.FC<AllLuggageItemsProps> = (props) => {
    const [luggage, setLuggage] = useState<Item[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState<Item | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const categorizedItems: { [category: string]: Item[] } = {};

    props.allLuggageItems.forEach(item => {
        if (!categorizedItems[item.category]) {
            categorizedItems[item.category] = [];
        }
        categorizedItems[item.category].push(item);
    });

    const sortedCategories = categoryOrder
        .filter(category => categorizedItems.hasOwnProperty(category))
        .map(category => ({
            category,
            items: categorizedItems[category],
        }));


    const handleItemPress = (item: Item) => {
        setSelectedItemForEdit(item);
        setIsModalVisible(true);
    };



    const handleSave = () => {
        if (selectedItemForEdit) {
            // Update the category of the selected item
            const updatedItem = { ...selectedItemForEdit, category: selectedCategory };
            // Update the luggage array with the updated item
    
        }
        setIsModalVisible(false);        
        setSelectedItemForEdit(null);

    };

    const addItemToSuitcase = () => {
        if (selectedItemForEdit) {
       props.editItem(selectedItemForEdit.id, { ...selectedItemForEdit, suitcaseId: [...selectedItemForEdit.suitcaseId, props.suitcaseId] }, "add")
        setIsModalVisible(false);        
        setSelectedItemForEdit(null);
        }

    };




    if (props.loadingItems) {
        return (
          <View style={{ flex: 1 }}>
            <LottieView source={require("../Icons/assets/telescopeLottie.json")} autoPlay loop />
            <Text style={{ fontWeight: '500', marginTop: 12, alignSelf: 'center', fontSize: 16 }}>Finding all your luggage...</Text>
          </View>
        )
      }

          if (!props.loadingItems && props.allLuggageItems.length === 0) return (<View style={{ flex: 1 }}>
            <LottieView source={require("../Icons/assets/windLottie.json")} autoPlay loop />
            <Text style={styles.noItemsMessage}>Luggage items from all your suitcases will show here.</Text>
          </View>)


    return (
        <ScrollView style={styles.luggageContainer}>
            {sortedCategories.map(categoryObj => (
                <View key={categoryObj.category} style={styles.categoryContainer}>
                    <Text style={styles.categoryTitle}>
                        {CategoryMapper[categoryObj.category]} ({categoryObj.items.length} items)
                    </Text>
                    <View style={styles.flatListContainer}>
                        <FlatList
                            data={categoryObj.items}
                            renderItem={({ item }) => (
                                <LuggageItem item={item} handleItemPress={handleItemPress} />
                            )}
                            keyExtractor={item => item?.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
            ))}
            <Modal visible={isModalVisible} animationType="slide" transparent={true}
            >
                <View style={styles.modalContainer}>
                    
                        <View style={styles.modalContent}>
                            {/* <Text style={styles.editDeleteHeaderText}>Edit or Delete?</Text> */}
                            <View style={{ height: '58%', width: '58%', marginBottom: 18, }}>
                                <FastImage
                                    source={{ uri: selectedItemForEdit?.image }}
                                    style={{
                                        width: '100%', height: '100%', shadowColor: "#000",
                                        shadowOpacity: 1,
                                        shadowRadius: 3,
                                        shadowOffset: {
                                            height: 0,
                                            width: 0,
                                        },
                                    }}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            </View>
                            <TouchableOpacity style={styles.editDeleteTextContainer} onPress={addItemToSuitcase}>
                                <Text style={styles.closeButton}>Add Item To Suitcase</Text>
                            </TouchableOpacity>
                         
                            <TouchableOpacity style={styles.closeContainer} onPress={() => setIsModalVisible(false)}>
                                <Text style={styles.closeButton}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    
                </View>

            </Modal>
        </ScrollView>
    );
};

const mapStateToProps = (state: RootState) => ({
    allLuggageItems: state.luggage.allLuggage,
    loadingItems: state.luggage.allLuggageLoading,

});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            addItem,
            deleteItem,
            editItem,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AllLuggageItems);

const styles = StyleSheet.create({
    luggageContainer: {
        paddingHorizontal: 10,
        marginTop: 30,
        backgroundColor: colors.background
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    multiDeleteButton: {
        color: 'red',
        fontWeight: 'bold',
    },
    categoryContainer: {
        marginBottom: 20,

    },
    categoryTitle: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '400'
    },
    flatListContainer: {
    },
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
    deletedItemName: {
        textDecorationLine: 'line-through',
        color: 'red',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: colors.background,
        padding: 10,
        borderRadius: 10,
        elevation: 5,
        width: '80%',
        height: '60%',
        borderWidth: 2,
        alignItems: 'center',
    },
    editContainer: {
        backgroundColor: colors.background,
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    noItemsMessage: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 16,
    },
    editDeleteTextContainer: {
        borderWidth: 1,
        marginBottom: 12,
        backgroundColor: colors.primary,
        padding: 4,
        borderRadius: 4,
        width: '50%',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOpacity: 1,
        shadowRadius: 1,
        shadowOffset: {
            height: 0,
            width: 0,
        },
    },
    editDeleteHeaderText: {
        fontSize: 20,
        textAlign: 'center'
    },
    editDeleteText: {
        fontSize: 18,
        textAlign: 'center'
    },
    closeContainer: {
        borderWidth: 1,
        backgroundColor: colors.primary,
        padding: 2,
        borderRadius: 4,
        shadowColor: "#000",
        shadowOpacity: 1,
        shadowRadius: 1,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        width: '70%',
        marginTop:10

    },
    closeButton: {
        fontSize: 20,
        textAlign: 'center',

    },
});
