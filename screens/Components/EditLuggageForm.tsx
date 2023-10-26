import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from '../../themes/Colors';
import { CategoryMapper } from '../data/CategoryData';
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
      <Text style={styles.currentCategoryText}>Edit Item</Text>
      <FastImage
        source={{ uri: selectedItemForEdit.image }}
        style={{ width: 160, height: 160 }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.currentCategoryText}>Category: <Text style={styles.selectedCategoryText}>{selectedCategory ? CategoryMapper[selectedCategory] : CategoryMapper[selectedItemForEdit.category]}</Text></Text>
      <View style={{ height: '20%', }}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryMainContainer,
                selectedCategory === item.key && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(item.key)}
            >
              <View>
                <Text style={styles.categoryText}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.key}
        /></View>
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
          style={[styles.button, styles.cancelButton]}
          onPress={() => {
            setIsEdit(false);
            setSelectedCategory('');
            setIsModalVisible(false);
          }}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.saveButton, { marginLeft: 10 }]}
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
    height: '60%',
    width: '80%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
    padding: 12,

  },
  currentCategoryText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  selectedCategoryText: {
    fontSize: 17,
    fontWeight:'600',
    marginBottom: 2,
    color:'grey'

  },
  categoryTextContainer: {
    padding: 2,
    marginHorizontal: 3,
    marginTop: 4,
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  categoryMainContainer: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  saveButton: {
    backgroundColor: colors.primary,
    width: '40%',
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  cancelButton: {
    backgroundColor: colors.primary,
    width: '40%',
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  selectedCategory: {
    backgroundColor: colors.primary,

  },
});
