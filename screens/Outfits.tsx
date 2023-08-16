import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import colors from '../themes/Colors';
import OutfitBox from './Components/OutfitBox';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../Reducers/RootReducer';
import { Outfit } from '../ReduxActions/ActionTypes/OutfitTypes';

type OutfitsScreenProps = {
  navigation: NativeStackNavigationProp<LuggageStackParamList, 'Outfits'>;
  outfitState: Outfit[];
}



const Outfits: React.FC <OutfitsScreenProps> = ({navigation, outfitState }) => {
  const [outfits, setOutfits] = useState<Outfit[]>([]);

  const navigateToAddOutfit = () => {
   navigation.navigate('CreateOutfit')
  };

  useEffect(() => {
    setOutfits(outfitState)
  }, []);

  return (
    <View style={styles.container}>
      {!outfits.length ? <Text style={styles.outfitHeader}>You have no outfits</Text> : null}
      <FlatList
        data={outfits}
        renderItem={({ item, index }) => (
          <OutfitBox item={item} index={index} />
        )} keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const mapStateToProps = (state: RootState) => ({
  outfitState: state.outfits.outfits,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      // addSuitcase,
      // fetchSuitcases,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Outfits);


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

