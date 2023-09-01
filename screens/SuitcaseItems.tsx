import { StyleSheet, Text, View, FlatList, ScrollView, Modal, TouchableOpacity, Button, } from 'react-native';
import React, { useState, } from 'react';
import colors from '../themes/Colors';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { RootState } from '../Reducers/RootReducer';
import { Item } from '../ReduxActions/ActionTypes/LuggageActionTypes';
import { addItem, deleteItem, editItem,  } from '../ReduxActions/LuggageActions';
import EditLuggageForm from './Components/EditLuggageForm';
import { categories, CategoryMapper } from './data/CategoryData';
import LuggageItem from './Components/LuggageItem';
import ConfirmDelete from './Components/ConfimDelete';

type SuitcaseItemsProps = {
    suitcaseId: string;
    luggageState: Item[];
    deleteItem: (id: string) => void;
    editItem: (id: string, updatedItem: Partial<Item>) => (dispatch: Dispatch<AnyAction>) => void,
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

    const onDelete = (id: string) => {
        props.deleteItem(selectedItemForEdit.id)
        setIsDelete(false)

    };

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
        setSelectedCategory(selectedItemForEdit.category)
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

   
    const renderDeleteForm = () => {
        return (
            <ConfirmDelete text={selectedItemForEdit.name} onCancel={() => setIsDelete(false)} onConfirm={onDelete} />);
    };

    if (props.luggageState.length === 0) return (<Text style={styles.noItemsMessage}>You haven't added any luggage items.</Text> )

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
                            )} keyExtractor={item => item?.id}
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
                        <View style={styles.modalContent}>
                            {/* <Text style={styles.editDeleteHeaderText}>Edit or Delete?</Text> */}
                            <TouchableOpacity style={styles.editDeleteTextContainer}onPress={showEditForm}>
                                <Text style={styles.editDeleteText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.editDeleteTextContainer}onPress={() => showDeleteForm()} >
                                <Text style={styles.editDeleteText}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.editDeleteTextContdainer}onPress={() => setIsModalVisible(false)}>
                                <Text style={styles.closeButton}>Close</Text>
                            </TouchableOpacity>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height:'40%'
    },
    modalContent: {
        backgroundColor: colors.background,
        padding: 40,
        borderRadius: 10,
        elevation: 5,
        height:'20%',
        width:'50%',
    },
    editContainer: {
        backgroundColor: colors.background,
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    noItemsMessage:{
        fontSize:18,
        textAlign:'center',
        marginTop:16
    },
    editDeleteTextContainer:{
        borderWidth:1,
        marginBottom:12,
        backgroundColor:colors.primary
    },
    editDeleteHeaderText:{
        fontSize:20,
        textAlign:'center'
    },
    editDeleteText:{
        fontSize:18,
        textAlign:'center'
    },
    closeButton:{
        fontSize:20,
        textAlign:'center',
        marginTop:14
    },
});
