import {
    AuthActionTypes,
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '../ReduxActions/ActionTypes/AuthTypes'

export interface AuthState {
    user: any | null;
    error: string | null;
    loading: boolean;
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    user: null,
    error: null,
    loading: false,
    isLoggedIn: false
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case REGISTER_START:
            return {
                ...state,
                loading: true,
                error: "",
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                user: action.payload,
                isLoggedIn: true,
            };

        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case LOGIN_START:
            return {
                ...state,
                loading: true,
                error: "",
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                user: action.payload,
                isLoggedIn: true,
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
