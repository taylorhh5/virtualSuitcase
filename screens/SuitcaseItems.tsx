import { StyleSheet, Text, View, FlatList, Image, TouchableHighlight, ScrollView, Modal, TouchableOpacity, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import colors from '../themes/Colors';

type SuitcaseItemsProps = {};

interface ClothingItem {
    category: string;
    name: string;
    image: string;
}

const SuitcaseItems: React.FC<SuitcaseItemsProps> = () => {
    const [suitcases, setSuitcases] = useState<ClothingItem[]>([
        { category: "top", name: "T-shirt", image: "https://www.mrporter.com/variants/images/3633577411310824/in/w2000_q60.jpg" },
        { category: "bottom", name: "Jeans", image: "https://images.boardriders.com/global/dcshoes-products/all/default/medium/adydp03056_dcshoes,f_bsnw_frt1.jpg" },
        { category: "top", name: "Jacket", image: "https://www.stormtechusa.com/cdn/shop/products/QX-1_FRONT_AzureBlue_2faa399c-44af-4a43-9fd8-4be87ff5fc41_2000x.jpg?v=1687562304" },
        { category: "bottom", name: "Shorts", image: "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Feb%2Fd3%2Febd33c012f0cfb070719a4a4c9d920d38c360522.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]" },
        { category: "top", name: "Sweater", image: "https://shop.goop-img.com/cdn-cgi/image/height=324,width=324,dpr=3,format=auto,onerror=redirect,metadata=copyright/spree/images/attachments/000/094/002/large/open-uri20230707-29445-4vvygn?1688748557.webp" },
        { category: "bottom", name: "Skirt", image: "https://www.redvalentino.com/35/35468643fg_21_a.jpg" },
        { category: "shoes", name: "Chucks", image: "https://images.journeys.com/images/products/1_5122_ZM_THERO.JPG" },
        { category: "bottom", name: "Running shorts", image: "https://tracksmith-media.imgix.net/Spring23-Mens-Van-Cortlandt-Short-Red.png?auto=format,compress&crop=faces&dpr=2&fit=crop&h=640&w=640" },


    ]);

    const [deletedItems, setDeletedItems] = useState<string[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState<ClothingItem | null>(null);
    const [isMultiDeleteMode, setIsMultiDeleteMode] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('');


    const CategoryMapper: { [key: string]: string } = {
        hat: 'Hats',
        shoes: 'Shoes',
        top: 'Tops',
        bottom: 'Bottoms',
    };

    const categorizedItems: { [category: string]: ClothingItem[] } = {};

    suitcases.forEach(item => {
        if (!categorizedItems[item.category]) {
            categorizedItems[item.category] = [];
        }
        categorizedItems[item.category].push(item);
    });

    const handleItemPress = (item: ClothingItem) => {
        setSelectedItemForEdit(item);
        setIsModalVisible(true);
    };



    const handleModalDelete = () => {
        console.log('delete');
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

    const clothingItem = ({ item }: { item: ClothingItem }) => (
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
    //

    const handleSave = () => {
        if (selectedItemForEdit) {
            // Update the category of the selected item
            const updatedItem = { ...selectedItemForEdit, category: selectedCategory };
            // Update the suitcases array with the updated item
            setSuitcases(prevSuitcases =>
                prevSuitcases.map(item =>
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
                <Button title="Save" onPress={() => { handleSave(); setIsEdit(false); setSelectedCategory(''); setIsModalVisible(false); }} />
                <Button title="Cancel" onPress={() => { setIsEdit(false); setSelectedCategory(''); setIsModalVisible(false); }} />
            </View>
        );
    };


    return (
        <ScrollView style={styles.luggageContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Your Luggage</Text>
                <TouchableOpacity onPress={handleMultiDeleteToggle}>
                    <Text style={styles.multiDeleteButton}>{isMultiDeleteMode ? 'Cancel delete' : 'Delete multiple items'}</Text>
                </TouchableOpacity>
            </View>
            {isMultiDeleteMode ? <Text>Select items to delete</Text> : null}
            <View></View>
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
                            <TouchableOpacity onPress={handleModalDelete}>
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
export default SuitcaseItems;