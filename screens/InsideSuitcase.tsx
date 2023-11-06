import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import colors from '../themes/Colors';
import SuitcaseItems from './SuitcaseItems';
import Outfits from './Outfits';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { fetchItemsInSuitcase } from '../ReduxActions/LuggageActions';
import { fetchOutfits } from '../ReduxActions/OutfitActions';
import { RootState } from '../Reducers/RootReducer';


enum ActiveScreen {
    Items,
    Outfits,
}

const InsideSuitcase = (props) => {
    const [activeScreen, setActiveScreen] = useState<ActiveScreen>(ActiveScreen.Items);
    const suitcaseId = props.route.params.suitcaseId
    useEffect(() => {
        props.fetchItemsInSuitcase(suitcaseId)
    }, []);

    useEffect(() => {
        props.fetchOutfits(suitcaseId)
      }, []);
    
    const changeScreen = (screen: ActiveScreen) => {
        setActiveScreen(screen);
    };

    const navigateToAddOutfit = () => {
        props.navigation.navigate('CreateOutfit', {
            edit: false,
            suitcaseId: suitcaseId
        });
    };

    const navigateToAddItem = () => {
        props.navigation.navigate('AddItemsOptions', {
            suitcaseId: suitcaseId
        })
    };
    console.log(props.route, 'params')

    return (
        <View style={styles.container}>
            <View style={styles.screenButtonContainer}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        activeScreen === ActiveScreen.Items && styles.activeButton,
                    ]}
                    onPress={() => changeScreen(ActiveScreen.Items)}
                >
                    <Text style={styles.dashboardText}>ITEMS</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        activeScreen === ActiveScreen.Outfits && styles.activeButton,
                    ]}
                    onPress={() => changeScreen(ActiveScreen.Outfits)}
                >
                    <Text style={styles.dashboardText}>OUTFITS</Text>
                </TouchableOpacity>
            </View>
            {activeScreen === ActiveScreen.Items ? (
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>You have {props?.luggageState?.length} items</Text>
                    <TouchableOpacity style={styles.addOutfitContainer} onPress={() => navigateToAddItem()}>
                        <Text style={styles.addOutfitText}>ADD ITEM +</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>You have {props?.outfitState?.length} outfits</Text>
                    <TouchableOpacity style={styles.addOutfitContainer} onPress={() => navigateToAddOutfit()}>
                        <Text style={styles.addOutfitText}>ADD OUTFIT +</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.screenContentContainer}>
                {activeScreen === ActiveScreen.Items ? <SuitcaseItems suitcaseId={suitcaseId} /> : <Outfits navigation={props.navigation} suitcaseId={suitcaseId} />}
            </View>
        </View>
    );
};

const mapStateToProps = (state: RootState) => ({
    luggageState: state.luggage.luggage,
    outfitState: state.outfits.outfits,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            fetchItemsInSuitcase,
            fetchOutfits,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(InsideSuitcase);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 10,
    },
    screenButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25, 
        borderWidth: 2,
        borderColor: colors.primary,
        overflow: 'hidden', 
        marginHorizontal: 40,
        marginBottom: 30
    },
    button: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: colors.background, 
    },
    activeButton: {
        backgroundColor: colors.primary, 
    },
    screenContentContainer: {
        flex: 1,
        borderTopWidth: 0.4,
        // marginTop:8
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
    },
    headerText: {
        alignSelf: 'flex-end',
        color: 'grey',
        fontSize:16,
        fontWeight:'600'
    },
    addOutfitContainer: {
        backgroundColor: colors.primary,
        padding: 8,
        borderRadius: 28,
        marginBottom:6,
        
    },
    addOutfitText: {
        fontSize: 14,
        color: 'black',
        fontWeight: '400'
    },
    dashboardText: {
        fontSize: 14,
        fontWeight: '500'
    },
});

