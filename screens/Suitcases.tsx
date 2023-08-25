import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Modal, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react';
import colors from '../themes/Colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../Reducers/RootReducer';
import { Suitcase } from '../ReduxActions/ActionTypes/SuitcaseActionTypes';
import { addSuitcase, fetchSuitcases, editSuitcaseName, deleteSuitcase } from '../ReduxActions/SuitcaseActions';
import ConfirmDelete from './Components/ConfimDelete';
type SuitcasesProps = {
    navigation: NativeStackNavigationProp<LuggageStackParamList, 'Home'>;
    suitcases: Suitcase[];
    addSuitcase: (suitcase: Suitcase) => void;
    loading: boolean;
    fetchSuitcases: () => void;
    editSuitcaseName: (id: string, name: string) => void;
    deleteSuitcase: (id: string) => void;
}

const Suitcases: React.FC<SuitcasesProps> = ({ navigation, suitcases, addSuitcase, loading, fetchSuitcases, editSuitcaseName, deleteSuitcase }) => {
    const [isNewSuitcaseModalVisible, setNewSuitcaseModalVisible] = useState(false);
    const [newSuitcaseName, setNewSuitcaseName] = useState('');
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [suitcaseToEditId, setSuitcaseToEditId] = useState('');
    const navigateToInsideSuitcase = (item: Suitcase) => {
        navigation.navigate('InsideSuitcase', {
            name: item.name,
            suitcaseId: item.id
        });
    };

    const openNewSuitcaseModal = () => {
        setNewSuitcaseModalVisible(true);
    };

    const openEditSuitcaseModal = (name: string, id: string) => {
        setIsEditModalVisible(true);
        setNewSuitcaseName(name);
        setSuitcaseToEditId(id);
    };

    const closeModal = () => {
        setNewSuitcaseModalVisible(false);
        setIsEditModalVisible(false);
        setIsDeleteModalVisible(false);
        setNewSuitcaseName('');
    };

    const createNewSuitcase = () => {
        if (newSuitcaseName.trim() !== '') {
            addSuitcase(newSuitcaseName, 'rBPi3msspFXpCaECKSDfaX8lCEE3');
            closeModal();
        }
    };

    const handleEditSuitcase = () => {
        editSuitcaseName(suitcaseToEditId, newSuitcaseName);
        closeModal();
        setSuitcaseToEditId('');
    };

    const showDeleteModal = () => {
        setIsEditModalVisible(false);
        setIsDeleteModalVisible(true);
    };

    const onDelete = () => {
        deleteSuitcase(suitcaseToEditId)
        setSuitcaseToEditId('');
        setIsDeleteModalVisible(false);
    }

    const renderSuitcase = ({ item }: { item: Suitcase }) => {
        return (
            <View style={styles.suitcaseContainer}>
                <TouchableOpacity onPress={() => openEditSuitcaseModal(item.name, item.id)}>
                    <Text style={styles.suitcaseTextDots}>...</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateToInsideSuitcase(item)}>
                    <Image source={require('../Icons/SuitcaseIcon.png')} style={{ width: 100, height: 100 }} />
                    <Text style={styles.suitcaseText}>{item.name} 🧳</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderDeleteForm = () => {
        console.log('this ran')
        return (
            <ConfirmDelete text={newSuitcaseName} onCancel={() => setIsDeleteModalVisible(false)} onConfirm={onDelete} />
        );
    };

    useEffect(() => {
        fetchSuitcases('rBPi3msspFXpCaECKSDfaX8lCEE3')
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <TouchableOpacity style={styles.newSuitcaseContainer} onPress={openNewSuitcaseModal}>
                    <Image source={require('../Icons/BasicSuitcaseIcon.png')} style={{ width: 70, height: 70 }} />
                    <Text style={styles.suitcaseText}>Create new suitcase</Text>
                </TouchableOpacity>
                <View style={styles.topRightSection}>
                    <Text style={styles.listHeaderText}>Welcome!</Text>
                    {!suitcases.length ? (
                        <Text style={styles.topRightSectionText}>Add a suitcase to get started!</Text>
                    ) : (
                        <Text style={styles.topRightSectionText}>You have {suitcases.length} suitcase.</Text>
                    )}
                </View>
            </View>
            <View style={styles.suitcaseListContainer}>
                <FlatList
                    data={suitcases}
                    renderItem={renderSuitcase}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.contentContainer}
                />
            </View>
            <Modal visible={isNewSuitcaseModalVisible || isEditModalVisible} animationType="slide" transparent={true}>
                {!isEditModalVisible ? (
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
                            <Button title="Cancel" onPress={closeModal} />
                        </View>
                    </View>
                ) : (
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalHeaderText}>Edit Suitcase</Text>
                            <TextInput
                                placeholder={newSuitcaseName}
                                value={newSuitcaseName}
                                onChangeText={setNewSuitcaseName}
                                style={styles.input}
                            />
                            <Button title="Edit Suitcase" onPress={handleEditSuitcase} />
                            <Button title="Cancel" onPress={closeModal} />
                            <Button title="Delete Suitcase" onPress={showDeleteModal} />
                        </View>
                    </View>
                )}
            </Modal>
            {isDeleteModalVisible && renderDeleteForm()}
        </View>
    );
};

const mapStateToProps = (state: RootState) => ({
    suitcases: state.suitcases.suitcases,
    loading: state.suitcases.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            addSuitcase,
            fetchSuitcases,
            editSuitcaseName,
            deleteSuitcase,
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
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        paddingBottom: 8
    },
    topRightSection: {
        alignSelf: 'center',
        alignItems: 'center',
        width: '50%'
    },
    topRightSectionText: {
        fontSize: 16,
        marginHorizontal: 4,
        textAlign: 'center'
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
    suitcaseTextDots: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '800',
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