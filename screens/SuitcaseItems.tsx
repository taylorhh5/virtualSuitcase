import { StyleSheet, Text, View, FlatList, Image, TouchableHighlight, ScrollView, Modal, TouchableOpacity, Button, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import colors from '../themes/Colors';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../Reducers/RootReducer';
import { Item } from '../ReduxActions/ActionTypes/LuggageActionTypes';
import { addItem, deleteItem, editItem } from '../ReduxActions/LuggageActions';
type SuitcaseItemsProps = {
    luggageState: Item[];
    deleteItem: (id: string) => void;
    editItem:  (id:string, item:Item | null) => void;
};

const SuitcaseItems: React.FC<SuitcaseItemsProps> = (props) => {
    const [luggage, setLuggage] = useState<Item[]>([]);

    const [deletedItems, setDeletedItems] = useState<string[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState<Item | null>(null);
    const [isMultiDeleteMode, setIsMultiDeleteMode] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('');


    const CategoryMapper: { [key: string]: string } = {
        hat: 'Hats',
        shoes: 'Shoes',
        top: 'Tops',
        bottom: 'Bottoms',
    };

    const categorizedItems: { [category: string]: Item[] } = {};

    luggage.forEach(item => {
        if (!categorizedItems[item.category]) {
            categorizedItems[item.category] = [];
        }
        categorizedItems[item.category].push(item);
    });

    const handleItemPress = (item: Item) => {
        setSelectedItemForEdit(item);
        setIsModalVisible(true);
    };



    const handleModalDelete = (id:string) => {
        console.log('delete');
        props.deleteItem(id)
        setIsModalVisible(false);
    };

    const handleMultiDeleteToggle = () => {
        if (isMultiDeleteMode) {
            setDeletedItems([])
        }
        setIsMultiDeleteMode(!isMultiDeleteMode);
    };

    const handleMultiDelete = (itemName: string) => {
        if (deletedItems.includes(itemName)) {
            setDeletedItems(prevDeletedItems => prevDeletedItems.filter(item => item !== itemName));
        } else {
            setDeletedItems(prevDeletedItems => [...prevDeletedItems, itemName]);
        }
    };

    const clothingItem = ({ item }: { item: Item }) => (
        <View style={styles.itemContainer}>
            <TouchableHighlight
                underlayColor="transparent"
                onPress={() => {
                    if (isMultiDeleteMode) {
                        handleMultiDelete(item.name);
                    } else {
                        handleItemPress(item);
                    }
                }}
            >
                <View>
                    <Image
                        source={{ uri: item.image }}
                        style={{ width: 100, height: 100 }}
                        onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
                    />
                    <Text style={[styles.itemName, deletedItems.includes(item.name) && styles.deletedItemName]}>
                        {item.name}
                    </Text>
                </View>
            </TouchableHighlight>
        </View>
    );
    

    useEffect(() => {
        setLuggage(props.luggageState)
      }, []);

    const handleSave = () => {
        if (selectedItemForEdit) {
            // Update the category of the selected item
            const updatedItem = { ...selectedItemForEdit, category: selectedCategory };
            // Update the luggage array with the updated item
            setLuggage(prevluggage =>
                prevluggage.map(item =>
                    item === selectedItemForEdit ? updatedItem : item
                )
            );
        }
        setIsEdit(false);
        setIsModalVisible(false);
    };


    const handleEdit = () => {
        console.log('edit name');
        setIsEdit(true);
    };

    // Define the category mapping
    const categories = [
        { key: 'hat', label: 'Hat' },
        { key: 'shoes', label: 'Shoes' },
        { key: 'top', label: 'Top' },
        { key: 'bottom', label: 'Bottom' },
        { key: 'toiletries', label: 'Toiletries' },
        { key: 'miscellaneous', label: 'Misc' },
        { key: 'underwear', label: 'Underwear' },
        { key: 'socks', label: 'Socks' },
        { key: 'makeup', label: 'Makeup' }


    ];

    const renderEditForm = () => {
        if (!selectedItemForEdit) return null;

        return (
            <View style={styles.editContainer}>
                {/* ... other edit form components */}
                <Text>Edit Item</Text>
                <Image
                    source={{ uri: selectedItemForEdit.image }}
                    style={{ width: 100, height: 100 }}
                    onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
                />
                <Text>Category: {selectedCategory ? selectedCategory : selectedItemForEdit.category}</Text>
                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.categoryButton,
                                selectedCategory === item.key && styles.selectedCategory,
                            ]}
                            onPress={() => setSelectedCategory(item.key)}
                        >
                            <Text style={styles.categoryText}>{item.label}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.key}
                />
                <TextInput
                    style={styles.input}
                    value={selectedItemForEdit.name}
                    onChangeText={(text) =>
                        setSelectedItemForEdit(prevItem =>
                            prevItem
                                ? {
                                    ...prevItem,
                                    name: text,
                                }
                                : prevItem
                        )
                    }
                />
                <Button title="Save" onPress={() => { handleSave(); setIsEdit(false); setSelectedCategory(''); setIsModalVisible(false); props.editItem(selectedItemForEdit.id, {...selectedItemForEdit, category:selectedCategory}) }} />
                <Button title="Cancel" onPress={() => { setIsEdit(false); setSelectedCategory(''); setIsModalVisible(false); }} />
            </View>
        );
    };


    return (
        <ScrollView style={styles.luggageContainer}>
            {/* <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Your Luggage</Text>
                <TouchableOpacity onPress={handleMultiDeleteToggle}>
                    <Text style={styles.multiDeleteButton}>{isMultiDeleteMode ? 'Cancel delete' : 'Delete multiple items'}</Text>
                </TouchableOpacity>
            </View>
            {isMultiDeleteMode ? <Text>Select items to delete</Text> : null} */}
            {Object.entries(categorizedItems).map(([category, items]) => (
                <View key={category} style={styles.categoryContainer}>
                    <Text style={styles.categoryTitle}>{CategoryMapper[category]} ({items.length} items)</Text>
                    <View style={styles.flatListContainer}>
                    <FlatList
                        data={items}
                        renderItem={clothingItem}
                        keyExtractor={item => item.name}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                    </View>
                </View>
            ))}
            <Modal visible={isModalVisible} animationType="slide" transparent={true}
            >
                <View style={styles.modalContainer}>
                    {!isEdit ?
                        <View>
                            <Text>Edit or Delete?</Text>
                            <TouchableOpacity onPress={handleEdit}>
                                <Text>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>handleModalDelete(selectedItemForEdit.id)}>
                                <Text>Delete</Text>
                            </TouchableOpacity>
                            <Button title="Close" onPress={() => setIsModalVisible(false)} />

                        </View>
                        :
                        renderEditForm()
                    }
                </View>

            </Modal>

        </ScrollView>
    );
};

const mapStateToProps = (state: RootState) => ({
    luggageState: state.luggage.luggage,
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(SuitcaseItems);

const styles = StyleSheet.create({
    luggageContainer: {
        paddingHorizontal: 10,
        marginTop: 30
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
        fontWeight:'400'
    },
    flatListContainer:{
    },
    itemContainer: {
        marginRight: 16,
        alignItems: 'center',
        borderWidth:0.3,
        padding:1
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
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 200,
        marginHorizontal: 70

    },
    editContainer: {
        backgroundColor: 'yellow',
        alignItems: 'center',
        borderWidth: 1,
    },
});
