import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import colors from '../themes/Colors';
import { connect } from 'react-redux';
import { logout } from '../ReduxActions/AuthActions';
import { AuthState } from '../Reducers/AuthReducer';

type SettingsScreenProps = {
    logout: () => void;
    auth: AuthState;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ logout }) => {
    const handleLogout = () => {
        logout();
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            'Are you sure you want to delete your account?',
            'This action cannot be undone.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        Alert.alert(
                            'Are you really sure?',
                            'This action is irreversible.',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                },
                                {
                                    text: 'Delete',
                                    onPress: () => {
                                        console.log('Account deleted');
                                    },
                                },
                            ]
                        );
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => console.log('test')}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => console.log('test')}>
                <Text style={styles.buttonText}>Change Email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}></View>
            <TouchableOpacity style={styles.buttonDeleteAccount} onPress={handleDeleteAccount}>
                <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 38,
        justifyContent: 'space-between',
        
    },
    button: {
        backgroundColor: colors.primary,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonDeleteAccount: {
        backgroundColor: 'red',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOpacity: 1,
        shadowRadius: 1,
        shadowOffset: {
            height: 0,
            width: 0,
        },
    },
});

const mapStateToProps = (state) => ({
    auth: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
