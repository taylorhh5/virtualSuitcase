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
import { logout } from '../ReduxActions/AuthActions';
import GearSVG from '../Icons/GearSVG';
import LottieView from 'lottie-react-native';
import { AuthState } from '../Reducers/AuthReducer';


type SuitcasesProps = {
    navigation: NativeStackNavigationProp<LuggageStackParamList, 'Home'>;
    suitcases: Suitcase[];
    addSuitcase: (suitcase: Suitcase) => void;
    loading: boolean;
    fetchSuitcases: (id: string) => void;
    editSuitcaseName: (id: string, name: string) => void;
    deleteSuitcase: (id: string) => void;
    logout: () => void;
    auth: AuthState;
    suitcasesLoading: boolean;
}

const Suitcases: React.FC<SuitcasesProps> = ({ navigation, suitcases, addSuitcase, logout, auth, fetchSuitcases, editSuitcaseName, deleteSuitcase, suitcasesLoading }) => {
    const [isNewSuitcaseModalVisible, setNewSuitcaseModalVisible] = useState(false);
    const [newSuitcaseName, setNewSuitcaseName] = useState('');
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [suitcaseToEditId, setSuitcaseToEditId] = useState('');
    const [isEditing, setIsEditing] = useState(false);

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
        setIsEditing(false)
    };

    const createNewSuitcase = () => {
        if (newSuitcaseName.trim() !== '') {
            addSuitcase(newSuitcaseName, auth.uid);
            closeModal();
        }
    };

    const handleEditSuitcase = () => {
        editSuitcaseName(suitcaseToEditId, newSuitcaseName);
        closeModal();
        setSuitcaseToEditId('');
        setIsEditing(false)
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
            <View style={styles.suitcaseWrapper}>
                <TouchableOpacity style={{ width:'26%', alignItems:'center',paddingTop:4}} onPress={() => openEditSuitcaseModal(item.name, item.id)}>               
                    <GearSVG style={{ width: 22, height: 24, }}/>
                </TouchableOpacity>
            <View style={styles.suitcaseContainer}>
                
                <TouchableOpacity onPress={() => navigateToInsideSuitcase(item)}>
                    <Image source={require('../Icons/suitcasePlane.png')} style={{ width: 114, height: 100 }} />
                    <Text style={styles.suitcaseText}>{item.name}</Text>
                </TouchableOpacity>
            </View></View>
        );
    };

    const renderDeleteForm = () => {
        return (
            <ConfirmDelete text={newSuitcaseName} onCancel={() => setIsDeleteModalVisible(false)} onConfirm={onDelete} />
        );
    };

    const handleLogout = () => {
        logout()
    };

    useEffect(() => {
        fetchSuitcases(auth.uid)
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <TouchableOpacity style={styles.newSuitcaseContainer} onPress={openNewSuitcaseModal}>
                <LottieView style={{}} source={require("../Icons/assets/suitcaseLottie.json")} autoPlay loop />
                    <Text style={styles.suitcaseText}>Add suitcase</Text>
                </TouchableOpacity>
                <View style={styles.topRightSection}>
                    <TouchableOpacity style={styles.logoutContainer} onPress={() => handleLogout()}>
                        <Text style={styles.logoutText}>Logout 👋</Text>
                    </TouchableOpacity>
                    <Text style={styles.welcomeText}>Hello, <Text style={styles.emailText}>{auth.email}.</Text></Text>
                    {!suitcases.length ? (
                        <Text style={styles.topRightSectionText}>Add a suitcase to get started!</Text>
                    ) : (
                        <Text style={styles.topRightSectionText}>
                            You have {suitcases.length} {suitcases.length === 1 ? 'suitcase' : 'suitcases'}.
                        </Text>
                    )}
                </View>
            </View>
            {suitcasesLoading ?
                <View style={{ flex: 1 }}>
                    <LottieView source={require("../Icons/assets/fishingLottie.json")} autoPlay loop />
                    <Text style={{ fontWeight: '500', marginTop: 12, alignSelf: 'center', fontSize: 16 }}>Getting your suitcases...</Text>
                </View>
                :
                !suitcasesLoading && !suitcases.length ?
                    <View style={{ flex: 1 }}>
                        <LottieView source={require("../Icons/assets/ghostLottie.json")} autoPlay loop />
                        <Text style={{ fontWeight: '500', marginTop: 12, alignSelf: 'center', fontSize: 16 }}>No suitcases added.</Text>
                    </View>
                    :
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
            }
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
                            <TouchableOpacity style={styles.button} onPress={createNewSuitcase}>
                                <Text style={styles.buttonText}>Create Suitcase</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button} onPress={closeModal}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                ) : isEditing ? (
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalHeaderText}>Edit Suitcase</Text>
                            <TextInput
                                placeholder={newSuitcaseName}
                                value={newSuitcaseName}
                                onChangeText={setNewSuitcaseName}
                                style={styles.input}
                            />
                            <TouchableOpacity style={styles.button} onPress={handleEditSuitcase}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.button} onPress={closeModal}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
                    : (
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalHeader}>{newSuitcaseName}</Text>
                                <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
                                    <Text style={styles.buttonText}>Edit Suitcase</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.button} onPress={showDeleteModal}>
                                    <Text style={styles.buttonText}>Delete Suitcase</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.button} onPress={closeModal}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
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
    auth: state.auth.user,
    suitcasesLoading: state.suitcases.loading,


});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            addSuitcase,
            fetchSuitcases,
            editSuitcaseName,
            deleteSuitcase,
            logout
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
        width: '50%',
        flex: 1
    },
    logoutContainer: {
        alignSelf: 'flex-end',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: colors.primary,
        padding: 5
    },
    logoutText: {
        fontSize: 16,
        fontWeight:'500'
    },
    topRightSectionText: {
        fontSize: 16,
        marginHorizontal: 4,
        textAlign: 'center',
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
        shadowColor: "#000",
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowOffset: {
          height: 0,
          width: 0,
        },
    },
    suitcaseWrapper:{
        backgroundColor: colors.primary,
        borderRadius: 20,
        // borderWidth: 2,
         marginTop: 16,
         shadowColor: "#000",
         shadowOpacity: 1,
         shadowRadius: 5,
         shadowOffset: {
           height: 0,
           width: 0,
         },
    },
    suitcaseContainer: {
        paddingHorizontal: 18,
        // borderWidth: 2,
        backgroundColor: colors.primary,
        // marginTop: 16,
        borderRadius: 20
    },
    suitcaseText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
        fontWeight:'500'
    },
    suitcaseTextDots: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '800',
    },
    suitcaseListContainer: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal:6,
    },
    welcomeText: {
        fontSize: 16,
        marginBottom: 2,
        marginTop: 30,
        textAlign: 'center'
    },
    emailText: {
        fontWeight: '600'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // width:'50%',
        // alignSelf:'center'
    },
    modalContent: {
        backgroundColor: colors.background,
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width:'70%',
        height:'40%',
        flexDirection:'column',
        justifyContent:'space-evenly',
        alignItems:'center'
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
        width:'90%'
    },
    modalHeader:{
        fontSize:24,
        fontWeight:'500',
        marginBottom:20
    },
    button: {
        backgroundColor: colors.primary,
        padding: 14,
        borderRadius: 28,
        marginBottom:6,
        width:'70%',
        alignItems:'center'
        
    },
    buttonText: {
        fontSize: 16,
        color: 'black',
        fontWeight: '500'
    },
})