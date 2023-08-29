import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import colors from '../themes/Colors';
import ShirtIconWithPlus from './Components/PlusSignShirt';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../Reducers/RootReducer';
import { Item } from '../ReduxActions/ActionTypes/LuggageActionTypes';
import { addItem } from '../ReduxActions/LuggageActions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LuggageStackParamList } from '../Navigation/LuggageStackNavigator';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';
import { categories, categoryEmojis } from './data/CategoryData';
interface AddItemFormProps {
  addItem: (suitcase: Item) => void;
  navigation: NativeStackNavigationProp<LuggageStackParamList, 'AddItemForm'>;

}

const AddItemForm: React.FC<AddItemFormProps> = ({ addItem, navigation, route }) => {
  const [category, setCategory] = useState<string>('');
  const [selectedImageData, setSelectedImageData] = useState<Blob | null>(null);
  const [name, setName] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const handleImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 200,
        height: 200,
        cropping: true,
      });

      const response = await fetch(image.path);
      const blob = await response.blob();

      setSelectedImageData(blob);
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  const handleAddItem = async () => {
    if (uploading) {
      return;
    }

    if (!selectedImageData) {
      console.log('No image selected.');
      return;
    }

    setUploading(true);

    try {
      const storageRef = ref(storage, `images/${Date.now()}`);
      await uploadBytes(storageRef, selectedImageData);
      const imageUrl = await getDownloadURL(storageRef);

      const newItem = {
        name: name,
        image: imageUrl,
        category: category,
        suitcaseId: route?.params?.suitcaseId,
        userId: 'rBPi3msspFXpCaECKSDfaX8lCEE3',
      };

      addItem(newItem, navigation);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };


  const handleCategorySelection = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };



  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Image Upload */}
        <View style={styles.selectContainer}>
          <Text style={styles.selectText}>Select Image</Text>
          <TouchableOpacity style={styles.imageContainer} onPress={handleImagePicker}>
            {selectedImageData ? (
              <Image
                source={{ uri: URL.createObjectURL(selectedImageData) }}
                style={styles.image}
              />
            ) : (
              <View style={styles.emptyImageContainer}>
                <ShirtIconWithPlus />
              </View>
            )}
          </TouchableOpacity>
        </View>
        {/* Clothing Category Selection */}
        <View style={styles.selectContainer}>
          <Text style={styles.selectText}>Select Category:</Text>
          <View style={styles.rowContainer}>
            {/* First Row of Categories*/}
            {categories.map((item) => (
              <TouchableOpacity
                key={item.key}
                style={[
                  styles.categoryButton,
                  category === item.key && styles.selectedCategory,
                ]}
                onPress={() =>
                  category !== item.key ? handleCategorySelection(item.key) : handleCategorySelection('')
                }>
                <Text style={styles.categoryIcon}>{categoryEmojis[item.key]}</Text>
                <Text style={styles.categoryText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Name input */}
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>Add Name: (Optional)</Text>
          <TextInput
            style={styles.nameInput}
            placeholder="Enter Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <TouchableOpacity onPress={handleAddItem} disabled={uploading}>
          <View style={styles.addButtonContainer}>
            <Text style={styles.addButtonText}>
              {uploading ? 'Adding...' : 'Add To Suitcase'}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state: RootState) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      addItem,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddItemForm);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 1,
    backgroundColor: colors.background,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 0,
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    width: '31%',
    backgroundColor: colors.primary,
    marginVertical: 3
  },
  selectedCategory: {
    backgroundColor: colors.secondary,
  },
  categoryIcon: {
    alignSelf: 'center',
    fontSize: 32
  },
  categoryText: {
    alignSelf: 'center',
    color: 'black',
    fontWeight: '500',
    fontSize: 16
  },
  imageContainer: {
    marginTop: 6,
    alignItems: 'center',
    marginBottom: 2
  },
  emptyImageContainer: {
    borderWidth: 2,
    borderStyle: 'dashed'
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderColor: 'black',
    borderWidth: 1
  },
  selectText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    marginTop: 30
  },
  selectContainer: {
    marginBottom: 2,
  },
  addButtonContainer: {
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 40,
    borderRadius: 6,
    backgroundColor: colors.button,
    marginVertical: 18
  },
  addButtonText: {
    fontSize: 20
  },
  nameContainer: {
    marginTop: 20,
  },
  nameText: {
    textAlign: 'center',
    fontSize:16,
    fontWeight: '500',
  },
  nameInput: {
    alignSelf: 'center',
    borderWidth: 0.5,
    backgroundColor:'lightgrey',
    width:'64%'
  },
});





