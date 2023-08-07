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
        { category: "shoes", name: "Chucks", image: "data:image/jpeg;base64,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" },
        { category: "shoes", name: "Running", image: "data:image/jpeg;base64,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" },
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