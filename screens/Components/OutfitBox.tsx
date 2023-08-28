import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import ConfirmDelete from './ConfimDelete';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LuggageStackParamList } from '../../Navigation/LuggageStackNavigator';
import { Item } from '../../ReduxActions/ActionTypes/LuggageActionTypes';
import { useDispatch } from 'react-redux';
import { deleteOutfit } from '../../ReduxActions/OutfitActions';

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
    props.navigation.navigate('CreateOutfit', {
      selectedOutfitItems: luggageItems,
      edit:true,
      id:props.item.id
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
      <Text style={styles.outfitTitle}>Outfit {props.index + 1}</Text>
      <View style={styles.outfitBox}>
        <View>
          <TouchableOpacity onPress={() => handleItemPress(props.item.id)}>
            {!isEditing ?
              <Text>...</Text>
              :
              <View style={styles.editTextContainer}><TouchableOpacity onPress={() => cancelEdit()}>
                <Text style={styles.optionText}>Cancel</Text>
              </TouchableOpacity>
                <Text>Select Items to delete</Text>
                <TouchableOpacity onPress={() => console.log('delete', selectedItems)}>
                  <Text style={styles.optionText}>Delete Selected</Text>
                </TouchableOpacity></View>}
          </TouchableOpacity>
          {isModalVisible ? (
            <>
              <TouchableOpacity onPress={() => handleNavigateToEditOutfit()}>
                <Text style={styles.optionText}>Edit Outfit</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => handleSelectEdit()}>
                <Text style={styles.optionText}>Delete Some Items</Text>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => setIsDelete(true)}>
                <Text style={styles.optionText}>Delete Outfit</Text>
              </TouchableOpacity>
            </>
          ) : (
            null
          )}</View>

        <FlatList
          data={luggageItems}
          keyExtractor={(item) => item?.id.toString()} 
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={isEditing ? () => toggleSelection(item.image) : undefined}
              style={[
                styles.outfitImageContainer,
                selectedItems.includes(item?.image) && styles.selectedImageContainer,
              ]}
            >
              <Image source={{ uri: item?.image }} style={styles.outfitImage} />
            </TouchableOpacity>
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
    // flexDirection: 'row',
    padding: 10,
    borderWidth: 0.4,
    borderRadius: 4,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
  },
  outfitImageContainer: {
    margin: 3,
    borderWidth: 2,
    borderColor: 'transparent', // Initial border color
  },
  selectedImageContainer: {
    borderColor: 'red', // Border color when selected
  },
  outfitImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  outfitTitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  optionRow: {
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  optionText: {
    color: 'blue',
    paddingVertical: 2,
  },
  editTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default OutfitBox;
