import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';

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
      <Button title="Save" onPress={() => { handleSave(); setIsEdit(false); setSelectedCategory(''); setIsModalVisible(false); editItem(selectedItemForEdit.id, { ...selectedItemForEdit, category: selectedCategory }) }} />
      <Button title="Cancel" onPress={() => { setIsEdit(false); setSelectedCategory(''); setIsModalVisible(false); }} />
    </View>
  );
};

export default EditLuggageForm;

const styles = StyleSheet.create({
  editContainer: {
    backgroundColor: 'yellow',
    alignItems: 'center',
    borderWidth: 1,
  },
});