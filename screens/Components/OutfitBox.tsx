import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import ConfirmDelete from './ConfimDelete';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LuggageStackParamList } from '../../Navigation/LuggageStackNavigator';
import { Item } from '../../ReduxActions/ActionTypes/LuggageActionTypes';
import { useDispatch } from 'react-redux';
import { deleteOutfit } from '../../ReduxActions/OutfitActions';
import FastImage from 'react-native-fast-image';
import colors from '../../themes/Colors';
import GearSVG from '../../Icons/GearSVG';


interface ClothingItem {
  category: string;
  name: string;
  image: string;
}

interface Outfit {
  items: ClothingItem[];
  id: string;
}

interface OutfitBoxProps {
  navigation: NativeStackNavigationProp<LuggageStackParamList, 'OutfitBox'>;
  index: number;
  item: {
    id: string;
    items: string[];
    suitcaseId: string;
    userId: string;
  };
}


const OutfitBox: React.FC<OutfitBoxProps> = (props) => {
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 60) / 3; // Calculate the item width based on the screen width and padding

  const luggageItems = props.item.luggageItems || [];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState<Item | null>(null);
  const [isDelete, setIsDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();


  const handleItemPress = (item: Item) => {
    setSelectedItemForEdit(item);
    setIsModalVisible(!isModalVisible);
  };

  const toggleSelection = (itemId: string) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };

  const cancelEdit = () => {
    setIsModalVisible(false)
    setIsEditing(false)
    setSelectedItems([])
  }

  const handleNavigateToEditOutfit = () => {
    setIsModalVisible(false)
    props.navigation.navigate('CreateOutfit', {
      selectedOutfitItems: luggageItems,
      edit: true,
      id: props?.item?.id,
      outfitName: props?.item?.name
    });
  };

  const onDelete = () => {
    dispatch(deleteOutfit(props.item.id))
    setIsDelete(false)
    setIsModalVisible(false)
  }

  const renderDeleteForm = () => {
    return (
      <ConfirmDelete text={selectedItemForEdit.name} onCancel={() => setIsDelete(false)} onConfirm={onDelete} />
    );
  };


  return (
    <View style={styles.container}>
      {/* <Text style={styles.outfitTitle}>
        {props?.item?.name ? props?.item?.name : `Outfit ${props.index + 1}`}
      </Text> */}
      <View style={styles.outfitBox}>
        {!isEditing ?
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => handleItemPress(props.item.id)}>
              <GearSVG style={{ width: 22, height: 24, }} />
            </TouchableOpacity>
            {isModalVisible ? (
              <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity style={{ ...styles.editButtonsContainer }} onPress={() => handleNavigateToEditOutfit()}>
                  <Text style={styles.optionText}>✏️ Edit Outfit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButtonsContainer} onPress={() => setIsDelete(true)}>
                  <Text style={styles.optionText}>🗑️ Delete Outfit</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.outfitTitle}>
                {props?.item?.name ? props?.item?.name : `Outfit ${props.index + 1}`}
              </Text>)}
          </View>
          :
          <View style={styles.editTextContainer}>
            <TouchableOpacity onPress={() => cancelEdit()}>
              <Text style={styles.optionText}>Cancel</Text>
            </TouchableOpacity>
            <Text>Select Items to delete</Text>
            <TouchableOpacity onPress={() => console.log('delete', selectedItems)}>
              <Text style={styles.optionText}>Delete Selected</Text>
            </TouchableOpacity>
          </View>
        }


        <FlatList
          data={luggageItems}
          keyExtractor={(item) => item?.id.toString()}
          renderItem={({ item }) => (
            // <TouchableOpacity
            //   onPress={isEditing ? () => toggleSelection(item.image) : undefined}
            //   style={[
            //     styles.outfitImageContainer,
            //     selectedItems.includes(item?.image) && styles.selectedImageContainer,
            //     { width: itemWidth, height: itemWidth },
            //   ]}
            // >
            <View style={[
              styles.outfitImageContainer,
              selectedItems.includes(item?.image) && styles.selectedImageContainer,
              { width: itemWidth, height: itemWidth },
            ]}>
              <FastImage
                source={{ uri: item?.image }}
                style={styles.outfitImage}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            // </TouchableOpacity>
          )}
          numColumns={3}
        />
      </View>
      {isDelete && renderDeleteForm()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
    paddingTop: 8,
  },

  outfitBox: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  outfitImageContainer: {
    margin: 3,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      height: 0,
      width: 0,
    },

  },
  selectedImageContainer: {
    borderColor: 'red',
  },
  outfitImage: {
    resizeMode: 'cover',
    borderRadius: 8,
    flex: 1,
  },
  outfitTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
    marginRight: '40%'
  },
  optionText: {
    color: 'black',
    paddingVertical: 2,
    fontWeight: '500',
  },
  editTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButtonsContainer: {
    marginRight: '10%',
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.primary,
    marginBottom: 8,
    marginHorizontal: 10
  }

});

export default OutfitBox;