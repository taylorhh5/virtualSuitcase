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

interface AddItemFormProps {
  addItem: (suitcase: Item) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({addItem}) => {
  const [category, setCategory] = useState<string>(''); //State for category
  const [selectedImage, setSelectedImage] = useState<string>(''); //State for image selection
  const [name, setName] = useState<string>(''); // State for the "Name" input
  const [suitcase, setSuitcase] = useState<string>(''); // State for the suitcase dropdown

  const handleImagePicker = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 200,
        height: 200,
        cropping: true,
        includeBase64: true,
      });
      setSelectedImage(image.path);
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  };

  const handleCategorySelection = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  // Define the list of suitcases. Will change to API data
  const suitcases = ['Beach', 'Vegas', 'Hiking'];


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
  // Define the category mapping with emojis. May add directly to category objects
  const categoryEmojis: { [key: string]: string } = {
    hat: '🧢',
    shoes: '👟',
    top: '👕',
    bottom: '👖',
    toiletries: '🪥',
    miscellaneous: '🔧',
    underwear: '🩲',
    socks: '🧦',
    makeup: '💄'
  };

  const handleAddItem = () => {
    //error handling check
    addItem({name:name, image:selectedImage, category:category })
};


  return (
    <View style={styles.container}>
      <ScrollView>
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
        {/* Image Upload */}
        <View style={styles.selectContainer}>
          <Text style={styles.selectText}>Select Image</Text>
          <TouchableOpacity style={styles.imageContainer} onPress={handleImagePicker}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.image} />
            ) : (
              <View style={styles.emptyImageContainer}>
              {/* <Image
                    source={require('../Icons/shirtIcon.png')}
                    style={{ width: 200, height: 200 }} resizeMode="contain"/> */}
                    <ShirtIconWithPlus/>
                    </View>
            )}
          </TouchableOpacity>
        </View>
        {/* Name input */}
        <View style={styles.selectContainer}>
          <Text style={styles.selectText}>Add Name: (Optional)</Text>
          <TextInput
            style={styles.nameInput}
            placeholder="Enter Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <TouchableOpacity onPress={handleAddItem}>
          <View style={styles.addButtonContainer}><Text style={styles.addButtonText}>Add To Suitcase</Text></View>
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
    paddingTop:20,
    backgroundColor: colors.background,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 0,
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    width: '31%',
    backgroundColor: colors.primary,
    marginVertical:3
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
    marginBottom:2
  },
  emptyImageContainer: {
    borderWidth:2,
    borderStyle:'dashed'
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
  nameInput: {
    alignSelf: 'center'
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
    marginVertical:18
  },
  addButtonText: {
    fontSize: 20
  },
});





