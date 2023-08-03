import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import colors from '../themes/Colors';

import SuitcaseItems from './SuitcaseItems';
import Outfits from './Outfits';

enum ActiveScreen {
    Luggage,
    Outfits,
}

const InsideSuitcase = () => {
    const [activeScreen, setActiveScreen] = useState<ActiveScreen>(ActiveScreen.Luggage);

    const changeScreen = (screen: ActiveScreen) => {
        setActiveScreen(screen);
    };

    return (
        <View style={styles.container}>
            <View style={styles.screenButtonContainer}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        activeScreen === ActiveScreen.Luggage && styles.activeButton,
                    ]}
                    onPress={() => changeScreen(ActiveScreen.Luggage)}
                >
                    <Text>Luggage</Text>
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
            <View style={styles.screenContentContainer}>
                {activeScreen === ActiveScreen.Luggage ? <SuitcaseItems /> : <Outfits />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
        paddingTop: 30,
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
