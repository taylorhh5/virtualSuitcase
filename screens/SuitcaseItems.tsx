import { StyleSheet, Text, View, FlatList, ScrollView, Modal, TouchableOpacity, Button, } from 'react-native';
import React, { useState, useEffect } from 'react';
import colors from '../themes/Colors';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { RootState } from '../Reducers/RootReducer';
import { Item } from '../ReduxActions/ActionTypes/LuggageActionTypes';
import { addItem, deleteItem, editItem, fetchItemsInSuitcase } from '../ReduxActions/LuggageActions';
import EditLuggageForm from './Components/EditLuggageForm';
import { categories, CategoryMapper } from './data/CategoryData';
import LuggageItem from './Components/LuggageItem';
import ConfirmDelete from './Components/ConfimDelete';

type SuitcaseItemsProps = {
    luggageState: Item[];
    deleteItem: (id: string) => void;
    editItem: (id: string, updatedItem: Partial<Item>) => (dispatch: Dispatch<AnyAction>) => void,
    fetchItemsInSuitcase: (id: string) => void;
};

const SuitcaseItems: React.FC<SuitcaseItemsProps> = (props) => {
    const [luggage, setLuggage] = useState<Item[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState<Item | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const categorizedItems: { [category: string]: Item[] } = {};
    
    props.luggageState.forEach(item => {
        if (!categorizedItems[item.category]) {
            categorizedItems[item.category] = [];
        }
        categorizedItems[item.category].push(item);
    });

    const handleItemPress = (item: Item) => {
        setSelectedItemForEdit(item);
        setIsModalVisible(true);
    };

    const handleModalDelete = (id: string) => {
        console.log('delete');
        props.deleteItem(selectedItemForEdit.id)
        setIsModalVisible(false);

    };

    useEffect(() => {
        console.log('useeffect')
        props.fetchItemsInSuitcase(props.suitcaseId)
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

    const showEditForm = () => {
        setIsEdit(true);
    };

    const showDeleteForm = () => {
        setIsModalVisible(false)
        setIsDelete(true);
    };

    const renderEditForm = () => {
        if (!selectedItemForEdit) return null;

        return (
            <EditLuggageForm
                selectedItemForEdit={selectedItemForEdit}
                setSelectedItemForEdit={setSelectedItemForEdit}
                selectedCategory={selectedCategory}
                handleSave={handleSave}
                setIsEdit={setIsEdit}
                setSelectedCategory={setSelectedCategory}
                setIsModalVisible={setIsModalVisible}
                editItem={props.editItem}
                categories={categories}
            />
        );
    };

    const onDelete = () => {
        console.log('deleted')
    }

    const renderDeleteForm = () => {
        return (
            <ConfirmDelete text={selectedItemForEdit.name} onCancel={() => setIsDelete(false)} onConfirm={onDelete} />);
    };

    return (
        <ScrollView style={styles.luggageContainer}>
            {Object.entries(categorizedItems).map(([category, items]) => (
                <View key={category} style={styles.categoryContainer}>
                    <Text style={styles.categoryTitle}>{CategoryMapper[category]} ({items.length} items)</Text>
                    <View style={styles.flatListContainer}>
                        <FlatList
                            data={items}
                            renderItem={({ item }) => (
                                <LuggageItem item={item} handleItemPress={handleItemPress} />
                            )} keyExtractor={item => item.name}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
            ))}
            <Modal visible={isModalVisible} animationType="slide" transparent={true}
            >
                <View style={styles.modalContainer}>
                    {isEdit ?
                        renderEditForm()

                        :
                        <View>
                            <Text>Edit or Delete?</Text>
                            <TouchableOpacity onPress={showEditForm}>
                                <Text>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => showDeleteForm()} >
                                <Text>Delete</Text>
                            </TouchableOpacity>
                            <Button title="Close" onPress={() => setIsModalVisible(false)} />
                        </View>
                    }
                </View>

            </Modal>
            {isDelete && renderDeleteForm()}
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
            fetchItemsInSuitcase,
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
