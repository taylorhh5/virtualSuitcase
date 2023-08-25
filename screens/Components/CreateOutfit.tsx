import { StyleSheet, Text, View, FlatList, Image, TouchableHighlight, ScrollView, Modal, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import colors from '../../themes/Colors';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../../Reducers/RootReducer';
import { addOutfit } from '../../ReduxActions/OutfitActions';
import { ClothingItem } from '../../ReduxActions/ActionTypes/OutfitTypes';
import { RouteProp } from '@react-navigation/native';
import { LuggageStackParamList } from '../../Navigation/LuggageStackNavigator';

type CreateOutfitProps = {
    addOutfit: (suitcase: ClothingItem[]) => void;
    route: RouteProp<LuggageStackParamList, 'CreateOutfit'>;


};

const CreateOutfit: React.FC<CreateOutfitProps> = ({ addOutfit, route }) => {

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

    // Initialize the selectedOutfitItems array using useState
    const [selectedOutfitItems, setSelectedOutfitItems] = useState<ClothingItem[]>([]);

    // Create an object to categorize the items
    const categorizedItems: { [category: string]: ClothingItem[] } = {};

    // Iterate through suitcases and categorize items
    suitcases.forEach(item => {
        if (!categorizedItems[item.category]) {
            categorizedItems[item.category] = [];
        }
        categorizedItems[item.category].push(item);
    });

    // Handle item press to add/remove from the outfit
    const handleItemPress = (item: ClothingItem) => {
        if (selectedOutfitItems.some(selectedItem => selectedItem.name === item.name)) {
            // Remove the item if it's already selected
            setSelectedOutfitItems(prevItems =>
                prevItems.filter(selectedItem => selectedItem.name !== item.name)
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

    //Clear slectedItems
    const handleAddOutfit = () => {
        console.log('here')
        addOutfit(selectedOutfitItems)
    }



    useEffect(() => {
    if (route?.params?.selectedOutfitItems) {
        setSelectedOutfitItems(route.params.selectedOutfitItems);
    }
}, []);


    // Render individual items with 'Added' text if selected
    const renderItem = ({ item }: { item: ClothingItem }) => {
        // Check if the item is already selected
        const isSelected = selectedOutfitItems.some(selectedItem => selectedItem.name === item.name);

        return (
            <View style={styles.itemContainer}>
                <TouchableHighlight
                    underlayColor="transparent"
                    onPress={() => handleItemPress(item)}
                >
                    <View>
                        {isSelected ? <Text style={styles.addedText}>Added</Text> : <Text> </Text>}
                        <Image
                            source={{ uri: item.image }}
                            style={{ width: 100, height: 100 }}
                            onError={(e) => console.log('Error loading image:', e.nativeEvent.error)}
                        />
                        <Text style={styles.itemName}>
                            {item.name}
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    };

    // Return the JSX content of the component
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => clearSelected()}><Text style={styles.headerText}>Clear selected</Text></TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={handleAddOutfit}><Text style={styles.headerText}>Add outfit</Text></TouchableOpacity>
            </View>
            {/* Display selected items */}
            <ScrollView style={styles.selectedScrollview} >
                <View style={styles.selectedItems}>
                    {selectedOutfitItems.map(item => (
                        <Image
                            key={item.name}
                            source={{ uri: item.image }}
                            style={styles.selectedItemImage}
                        />
                    ))}</View>
            </ScrollView>
            <ScrollView>
                {/* Render categorized items */}
                {Object.entries(categorizedItems).map(([category, items]) => (
                    <View key={category} style={styles.categoryContainer}>
                        <Text style={styles.categoryTitle}>{category}</Text>
                        <FlatList
                            data={items}
                            renderItem={renderItem}
                            keyExtractor={item => item.name}
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
            addOutfit
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

