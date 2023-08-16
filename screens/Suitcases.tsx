import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Modal, TextInput, Button } from 'react-native'
import React, { useState, useEffect} from 'react';
import colors from '../themes/Colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../Reducers/RootReducer';
import { Suitcase } from '../ReduxActions/ActionTypes/SuitcaseActionTypes';

type SuitcasesScreenProps = {
    navigation: NativeStackNavigationProp<LuggageStackParamList, 'Home'>;
    suitcases: Suitcase[];
    // addSuitcase: typeof addSuitcase;
    // fetchSuitcases: typeof fetchSuitcases;
  }

const Suitcases: React.FC<SuitcasesScreenProps> = ({ navigation, suitcases }) => {
    const [suitcase, setSuitcase] = useState<Suitcase[]>([{id:'1', name:'Montana'}]); // State for the suitcase
    const [isNewSuitcaseModalVisible, setNewSuitcaseModalVisible] = useState(false); // State for modal visibility
    const [newSuitcaseName, setNewSuitcaseName] = useState('');
console.log(suitcases, 'suitcases')
    const navigateToSuitCase = (name: string) => {
        navigation.navigate('InsideSuitcase', {
            name: name,
        });
    };

    const openNewSuitcaseModal = () => {
        setNewSuitcaseModalVisible(true);
    };

    const closeNewSuitcaseModal = () => {
        setNewSuitcaseModalVisible(false);
        setNewSuitcaseName(''); // Clear input when modal is closed
    };

    const createNewSuitcase = () => {
        if (newSuitcaseName.trim() !== '') {
            setSuitcase([...suitcase, newSuitcaseName]);
            closeNewSuitcaseModal();
        }
    };


    const suitCase = ({ item }: { item: Suitcase }) => {
        return (
            <TouchableOpacity style={styles.suitcaseContainer} onPress={() => navigateToSuitCase(item.name)}>
                <Image
                    source={require('../Icons/SuitcaseIcon.png')}
                    style={{ width: 100, height: 100 }} />
                <Text style={styles.suitcaseText}>{item.name} 🧳</Text>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        setSuitcase(suitcases)
      }, []);
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <TouchableOpacity style={styles.newSuitcaseContainer} onPress={openNewSuitcaseModal}>
                    <Image
                        source={require('../Icons/BasicSuitcaseIcon.png')}
                        style={{ width: 70, height: 70 }} />
                    <Text style={styles.suitcaseText}>Create new suitcase</Text>
                </TouchableOpacity>
                <View style={styles.topRightSection}>
                    <Text style={styles.listHeaderText}>Welcome!</Text>
                    {!suitcase.length ? <Text style={styles.topRightSectionText}>Add a suitcase to get started!</Text> : <Text style={styles.topRightSectionText}>You have {suitcase.length} suitcase.</Text>}
                </View>
            </View>
            < View style={styles.suitcaseListContainer}>
                <FlatList
                    data={suitcase}
                    renderItem={suitCase}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.contentContainer}
                />
            </View>
            <Modal visible={isNewSuitcaseModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeaderText}>Create New Suitcase</Text>
                        <TextInput
                            placeholder="Enter suitcase name"
                            value={newSuitcaseName}
                            onChangeText={setNewSuitcaseName}
                            style={styles.input}
                        />
                        <Button title="Create Suitcase" onPress={createNewSuitcase} />
                        <Button title="Cancel" onPress={closeNewSuitcaseModal} />
                    </View>
                </View>
            </Modal></View>
    )
}

const mapStateToProps = (state: RootState) => ({
    suitcases: state.suitcases.suitcases,
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
      {
        // addSuitcase,
        // fetchSuitcases,
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(Suitcases);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: colors.background,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        paddingBottom:8
    },
    topRightSection: {
        alignSelf:'center',
        alignItems: 'center',
        width:'50%'
    },
    topRightSectionText: {
        fontSize: 16,
        marginHorizontal:4,
        textAlign:'center'
    },
    contentContainer: {
        padding: 6,
    },
    row: {
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    newSuitcaseContainer: {
        paddingHorizontal: 10,
        backgroundColor: colors.primary,
        width: '40%',
        alignItems: 'center',
    },
    suitcaseContainer: {
        paddingHorizontal: 18,
        borderWidth: 2,
        backgroundColor: colors.primary,
        marginTop: 16,
        borderRadius: 20
    },
    suitcaseText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10
    },
    suitcaseListContainer: {
        flex: 1,
        paddingVertical: 8
    },
    listHeaderText: {
        fontSize: 16,
        marginTop: 2
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: colors.background,
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalHeaderText: {
        fontSize: 20,
        fontWeight: '400'
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 8,
        marginBottom: 10,
        marginTop: 16,
        borderRadius: 5,
    },
})