import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView, Modal, Button } from 'react-native';
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
import LottieView from 'lottie-react-native';

interface AddItemFormProps {
  addItem: (suitcase: Item) => void;
  navigation: NativeStackNavigationProp<LuggageStackParamList, 'AddItemForm'>;

}

const AddItemForm: React.FC<AddItemFormProps> = ({ addItem, navigation, route, auth }) => {
  const [category, setCategory] = useState<string>('');
  const [selectedImageData, setSelectedImageData] = useState<Blob | null>(null);
  const [name, setName] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };


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

    // if (!selectedImageData) {
    //   console.log('No image selected.');
    //   return;
    // }

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
        userId: auth.uid,
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
                    <LottieView style={{height: '100%', width: 140, flex:1, marginBottom:-10}} source={require("../Icons/assets/questionItem.json")} autoPlay loop />
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
        {/* <View style={styles.nameContainer}>
          <Text style={styles.nameText}>Add Name: (Optional)</Text>
          <TextInput
            style={styles.nameInput}
            placeholder="Enter Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View> */}
        <TouchableOpacity onPress={showModal} disabled={uploading}>
          <View style={styles.addButtonContainer}>
            <Text style={styles.addButtonText}>
              {uploading ? 'Adding...' : 'Add To Suitcase'}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>(Optional) Item name:</Text>
            <TextInput
              style={styles.modalTextInput}
              onChangeText={text => setName(text)}
              value={name}
              placeholder='Add name or submit without'
            />
            <View style={styles.modalButtonContainer}>
            <Button title="Cancel" onPress={hideModal} color={colors.primary} />
              <Button title="Add" onPress={handleAddItem} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth.user,
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
    marginVertical: 3,
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
    width: 130,
    height: 130,
    resizeMode: 'cover',
  },
  selectText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    marginTop: 20
  },
  selectContainer: {
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,  
  },
  addButtonContainer: {
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 40,
    borderRadius: 6,
    backgroundColor: colors.primary,
    marginTop: 32,
    padding:5,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 5,   
  },
  addButtonText: {
    fontSize: 20
  },
  nameContainer: {
    marginTop: 20,
  },
  nameText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  nameInput: {
    alignSelf: 'center',
    borderWidth: 0.5,
    backgroundColor: 'lightgrey',
    width: '64%'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5,
    padding: 8,
    marginTop: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});





