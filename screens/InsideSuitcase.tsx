import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import colors from '../themes/Colors';

import SuitcaseItems from './SuitcaseItems';
import Outfits from './Outfits';

enum ActiveScreen {
    Items,
    Outfits,
}

const InsideSuitcase = (props) => {
    const [activeScreen, setActiveScreen] = useState<ActiveScreen>(ActiveScreen.Items);
    const suitcaseId = props.route.params.suitcaseId 

    const changeScreen = (screen: ActiveScreen) => {
        setActiveScreen(screen);
    };

    const navigateToAddOutfit = () => {
        props.navigation.navigate('CreateOutfit')
    };

    const navigateToAddItem = () => {
        props.navigation.navigate('AddItemForm')
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
                    <Text>Items</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        activeScreen === ActiveScreen.Outfits && styles.activeButton,
                    ]}
                    onPress={() => changeScreen(ActiveScreen.Outfits)}
                >
                    <Text>Outfits</Text>
                </TouchableOpacity>
            </View>
            {activeScreen === ActiveScreen.Items ? (
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>You have 17 items</Text>
                    <TouchableOpacity style={styles.addOutfitContainer} onPress={() => navigateToAddItem()}>
                        <Text style={styles.addOutfitText}>Add item +</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>You have 3 outfits</Text>
                    <TouchableOpacity style={styles.addOutfitContainer} onPress={() => navigateToAddOutfit()}>
                        <Text style={styles.addOutfitText}>Add outfit +</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.screenContentContainer}>
                {activeScreen === ActiveScreen.Items ? <SuitcaseItems suitcaseId={suitcaseId}/> : <Outfits navigation={props.navigation} suitcaseId={suitcaseId}/>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 10,
    },
    screenButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25, // Oval shape
        borderWidth: 2,
        borderColor: colors.primary,
        overflow: 'hidden', // Clip child views to the container's rounded corners
        marginHorizontal: 40,
        marginBottom: 30
    },
    button: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: colors.primary, // Non-active button background color
    },
    activeButton: {
        backgroundColor: colors.button, // Active button background color
    },
    screenContentContainer: {
        flex: 1,
        borderTopWidth: 1
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12
    },
    headerText: {
        alignSelf: 'flex-end',
        color: colors.dark
    },
    addOutfitContainer: {
        // borderWidth: 1,
        // backgroundColor: colors.button,
        // padding: 6,
        // borderRadius: 28
    },
    addOutfitText: {
        fontSize: 18,
        color: colors.button,
        fontWeight: '800'
    },
});

export default InsideSuitcase;
