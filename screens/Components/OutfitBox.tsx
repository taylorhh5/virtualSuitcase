import { StyleSheet, View, Image, Text, FlatList } from 'react-native';
import React from 'react';
import colors from '../../themes/Colors';

interface ClothingItem {
  category: string;
  name: string;
  image: string;
}

interface Outfit {
  items: ClothingItem[];
}

interface OutfitBoxProps {
  item: Outfit;
  index: number;
}

const OutfitBox: React.FC<OutfitBoxProps> = (props) => {
    console.log(props.item, 'props')
  const { items } = props.item;

  return (
    <View style={styles.container}>
    <Text style={styles.outfitTitle}>Outfit {props.index + 1}</Text>
    <View style={styles.outfitBox}>
    <FlatList
      data={items}
      
      keyExtractor={(clothingItem, index) => index.toString()} 
      renderItem={({ item }) => (
        <Image
          source={{ uri: item.image }}
          style={styles.outfitImage}
        />
      )}
      numColumns={3}
      // horizontal 
      // showsHorizontalScrollIndicator={false}
    />
  </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:14,
    paddingTop:8
  },
  outfitBox: {
    flexDirection:'row',
    padding: 10,
    borderWidth:0.4,
    borderRadius:4,
    backgroundColor:'lightgrey',    
    justifyContent:'center'
  },
  outfitImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    margin:3
  },
  outfitTitle:{
    textAlign:'center',
    fontSize:16,
    fontWeight:'500',
    marginBottom:2
  },
});

export default OutfitBox;
