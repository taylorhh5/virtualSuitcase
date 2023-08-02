import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React, { useState } from 'react';
import colors from '../themes/Colors';
import HomeIcon from '../Icons/HomeIcon';
import { waitForDebugger } from 'inspector';

type SuitcasesScreenProps = {

}

const Suitcases: React.FC<SuitcasesScreenProps> = () => {
    const [suitcases, setSuitcases] = useState<string[]>(['Montana', 'Beach', 'Roadtrip']); // State for the suitcases

    const suitCase = ({ item }: { item: string }) => {
        return (
            <View style={styles.suitcaseContainer}>
                <Image
                    source={require('../Icons/SuitcaseIcon.png')}
                    style={{ width: 100, height: 100 }} />
                <Text style={styles.suitcaseText}>{item} 🧳</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text>Suitcases</Text>
            <View style={styles.newSuitcaseContainer}>
                <Image
                    source={require('../Icons/BasicSuitcaseIcon.png')}
                    style={{ width: 120, height: 120 }} />
                <Text style={styles.suitcaseText}>Create new suitcase</Text>
            </View>
            {!suitcases.length ? <Text>Add a suitcase to get started</Text> : <Text>Your suitcases</Text> }
            <View>
                <FlatList
                    data={suitcases}
                    renderItem={suitCase}
                    keyExtractor={(item) => item}
                    numColumns={2} // Set the number of columns to 2
                    columnWrapperStyle={styles.row} // Apply style to wrap items as rows
                    contentContainerStyle={styles.contentContainer} // Apply padding to the container

                />
            </View></View>
    )
}

export default Suitcases

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:20,
        backgroundColor: colors.background,
    },
    contentContainer: {
        padding: 6,
    },
    row: {
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    newSuitcaseContainer: {
        paddingHorizontal: 18,
        borderWidth: 2,
        backgroundColor: colors.primary,
        width:'50%',
        marginBottom:'12%',
        marginTop:10,
    },
    suitcaseContainer: {
        paddingHorizontal: 18,
        borderWidth: 2,
        backgroundColor: colors.primary,
        marginTop:16,
        borderRadius:20


    },
    suitcaseText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10
    },
})