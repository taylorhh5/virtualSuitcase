import { StyleSheet, Text, View, FlatList, } from 'react-native';
import React from 'react';
import colors from '../themes/Colors';
import OutfitBox from './Components/OutfitBox';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { connect } from 'react-redux';
import { RootState } from '../Reducers/RootReducer';
import { Outfit } from '../ReduxActions/ActionTypes/OutfitTypes';
import LottieView from 'lottie-react-native';

type OutfitsScreenProps = {
  navigation: NativeStackNavigationProp<LuggageStackParamList, 'Outfits'>;
  outfitState: Outfit[];
  loadingOutfits: boolean;
}

const Outfits: React.FC<OutfitsScreenProps> = ({ navigation, outfitState, loadingOutfits }) => {

  if (loadingOutfits) {
    return (
      <View style={{ flex: 1 }}>
        <LottieView source={require("../Icons/assets/paperPlaneLottie.json")} autoPlay loop />
        <Text style={{ fontWeight: '500', marginTop: 12, alignSelf: 'center', fontSize: 16 }}>Loading outfits...</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {!outfitState ? <Text style={styles.outfitHeader}>You haven't added any outfits.</Text> :
        <FlatList
          data={outfitState}
          renderItem={({ item, index }) => (
            <OutfitBox item={item} index={index} navigation={navigation} />
          )} keyExtractor={(item, index) => index.toString()}
        />
      }
    </View>
  );
};

const mapStateToProps = (state: RootState) => ({
  outfitState: state.outfits.outfits,
  loadingOutfits: state.outfits.loading,

});

export default connect(mapStateToProps)(Outfits);

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
    fontSize: 18,
    textAlign: 'center',
    marginTop: 4
  },

  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 200,
    marginHorizontal: 70
  },
});

