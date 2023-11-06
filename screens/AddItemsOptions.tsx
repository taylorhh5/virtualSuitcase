import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import colors from '../themes/Colors';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, } from 'redux';
import { RootState } from '../Reducers/RootReducer';
import AddItemForm from './AddItemForm';
import AllLuggageItems from './AllLuggageItems';
import { fetchAllUserLuggageItems } from '../ReduxActions/LuggageActions';

enum ActiveScreen {
    AddNew,
    Inventory,
}
interface Props {
    route: {
        params: {
            suitcaseId: string; 
        };
    };
    auth: {
        uid: string; 
    };
    fetchAllUserLuggageItems: (userId: string, suitcaseId: string) => void;
}

const AddItemsOptions: React.FC<Props> = (props) => {    
    const [activeScreen, setActiveScreen] = useState<ActiveScreen>(ActiveScreen.AddNew);
    const suitcaseId = props.route.params.suitcaseId

    useEffect(() => {
        props.fetchAllUserLuggageItems(props.auth.uid, suitcaseId)
    }, []);

    
    const changeScreen = (screen: ActiveScreen) => {
        setActiveScreen(screen);
    };

    return (
        <View style={styles.container}>
            <View style={styles.screenButtonContainer}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        activeScreen === ActiveScreen.AddNew && styles.activeButton,
                    ]}
                    onPress={() => changeScreen(ActiveScreen.AddNew)}
                >
                    <Text style={styles.dashboardText}>Add New</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        activeScreen === ActiveScreen.Inventory && styles.activeButton,
                    ]}
                    onPress={() => changeScreen(ActiveScreen.Inventory)}
                >
                    <Text style={styles.dashboardText}>Add From Inventory</Text>
                </TouchableOpacity>
            </View>
            {activeScreen === ActiveScreen.AddNew ? (
                null
            ) : (
                <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Items below are from your other suitcases</Text>

                </View>
            )}

            <View style={styles.screenContentContainer}>
                {activeScreen === ActiveScreen.AddNew ? <AddItemForm navigation={props.navigation}  suitcaseId={suitcaseId} /> : <AllLuggageItems />}
            </View>
        </View>
    );
};

const mapStateToProps = (state: RootState) => ({
    auth: state.auth.user,

});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            fetchAllUserLuggageItems
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AddItemsOptions);


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

