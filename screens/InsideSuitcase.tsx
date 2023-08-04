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

    const changeScreen = (screen: ActiveScreen) => {
        setActiveScreen(screen);
    };

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
            <View>{activeScreen === ActiveScreen.Items ? <Text>Here's whats in your suitcase</Text> : <Text>Here's your outfits</Text>}</View>
            <View style={styles.screenContentContainer}>
                {activeScreen === ActiveScreen.Items ? <SuitcaseItems /> : <Outfits navigation={props.navigation}/>}
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
        marginBottom: 10
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
});

export default InsideSuitcase;
