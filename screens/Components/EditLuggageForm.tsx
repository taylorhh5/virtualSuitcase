import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from '../../themes/Colors';

interface Item {
  id: string;
  name: string;
  image: string;
  category: string;
}
interface Category {
  key: string;
  label: string;
}

type EditFormProps = {
  selectedItemForEdit: Item;
  setSelectedItemForEdit: React.Dispatch<React.SetStateAction<Item | null>>;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  setIsEdit: (isEdit: boolean) => void;
  setIsModalVisible: (isVisible: boolean) => void;
  editItem: (id: string, item: Item) => void;
  handleSave: () => void;
  categories: Category[];
};

const EditLuggageForm: React.FC<EditFormProps> = ({
  selectedItemForEdit,
  setSelectedItemForEdit,
  selectedCategory,
  setSelectedCategory,
  setIsEdit,
  setIsModalVisible,
  editItem,
  handleSave,
  categories,
}) => {


  return (
    <View style={styles.editContainer}>
      {/* ... other edit form components */}
      <Text>Edit Item</Text>
      <FastImage
        source={{ uri: selectedItemForEdit.image }}
        style={{ width: 100, height: 100 }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.currentCategoryText}>Category: {selectedCategory ? selectedCategory : selectedItemForEdit.category}</Text>
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
            <View style={styles.categoryTextContainer}>
            <Text style={styles.categoryText}>{item.label}</Text>
            </View>
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
<View style={styles.buttonContainer}>
<TouchableOpacity
    style={[styles.button, styles.cancelButton]} // Style for the Cancel button
    onPress={() => {
      setIsEdit(false);
      setSelectedCategory('');
      setIsModalVisible(false);
    }}
  >
    <Text style={styles.buttonText}>Cancel</Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={[styles.button, styles.saveButton]} // Style for the Save button
    onPress={() => {
      handleSave();
      setIsEdit(false);
      setSelectedCategory('');
      setIsModalVisible(false);
      editItem(selectedItemForEdit.id, { ...selectedItemForEdit, category: selectedCategory });
    }}
  >
    <Text style={styles.buttonText}>Save</Text>
  </TouchableOpacity>

</View>
    </View>
  );
};

export default EditLuggageForm;

const styles = StyleSheet.create({
  editContainer: {
    width: '80%', 
    height: '30%', // Set your desired height
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
    padding:3,
    
  },
  currentCategoryText:{
    fontSize:16,
  },
  categoryTextContainer:{
    borderWidth:1,
    borderRadius:8,
    padding:2,
    marginHorizontal:3,
    marginTop:4,
    backgroundColor:colors.primary
  },
  categoryText:{
    fontSize:16
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,    
  },
  buttonText: {
    fontSize: 20,
    color: 'black', 
    textAlign: 'center',
  },
  
});