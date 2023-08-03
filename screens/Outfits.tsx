import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import colors from '../themes/Colors';
import OutfitBox from './Components/OutfitBox';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


type OutfitsScreenProps = {
  navigation: NativeStackNavigationProp<LuggageStackParamList, 'Outfits'>;

}

type ClothingItem = {
  category: string;
  name: string;
  image: string;
};

type Outfit = {
  items: ClothingItem[];
};

const Outfits: React.FC <OutfitsScreenProps> = ({navigation}) => {
  const [outfits, setOutfits] = useState<Outfit[]>([
    {
      items: [
        { category: "top", name: "T-shirt", image: "https://www.mrporter.com/variants/images/3633577411310824/in/w2000_q60.jpg" },
        { category: "bottom", name: "Jeans", image: "https://images.boardriders.com/global/dcshoes-products/all/default/medium/adydp03056_dcshoes,f_bsnw_frt1.jpg" },
        { category: "shoes", name: "Chucks", image: "https://images.journeys.com/images/products/1_5122_ZM_THERO.JPG" }
      ]
    },
    {
      items: [
        { category: "top", name: "Jacket", image: "https://www.stormtechusa.com/cdn/shop/products/QX-1_FRONT_AzureBlue_2faa399c-44af-4a43-9fd8-4be87ff5fc41_2000x.jpg?v=1687562304" },
        { category: "bottom", name: "Shorts", image: "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Feb%2Fd3%2Febd33c012f0cfb070719a4a4c9d920d38c360522.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]" },
        { category: "shoes", name: "Chucks", image: "https://images.journeys.com/images/products/1_5122_ZM_THERO.JPG" },
        { category: "bottom", name: "Jeans", image: "https://images.boardriders.com/global/dcshoes-products/all/default/medium/adydp03056_dcshoes,f_bsnw_frt1.jpg" },

      ]
    }
  ]);

  const navigateToAddOutfit = () => {
   navigation.navigate('CreateOutfit')
  };


  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <TouchableOpacity style={styles.addOutfitContainer} onPress={()=> navigateToAddOutfit()}>
          <Text style={styles.addOutfitText}>Add outfit +</Text>
        </TouchableOpacity>
      </View>
      {!outfits.length ? <Text style={styles.outfitHeader}>You have no outfits</Text> : <Text style={styles.outfitHeader}>Your outfits</Text>}
      <FlatList
        data={outfits}
        renderItem={({ item, index }) => (
          <OutfitBox item={item} index={index} />
        )} keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background,
  },
  topView: {
    alignItems: 'flex-end'
  },
  addOutfitContainer: {
    borderWidth: 1,
    backgroundColor: colors.button,
    padding: 6,
    borderRadius: 28
  },
  addOutfitText: {
    fontSize: 18,

  },
  outfitContainer: {
    paddingHorizontal: 18,
    borderWidth: 2,
    backgroundColor: colors.primary,
    marginTop: 16,
    borderRadius: 20,
  },
  outfitBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  outfitImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  outfitHeader: {
    textAlign: 'center',
  },
});

export default Outfits;
