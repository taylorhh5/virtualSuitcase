// authTypes.ts

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_START = "LOGOUT_START";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

interface RegisterStartAction {
    type: typeof REGISTER_START;
}

interface RegisterSuccessAction {
    type: typeof REGISTER_SUCCESS;
    payload: any;
}

interface RegisterFailureAction {
    type: typeof REGISTER_FAILURE;
    payload: any;
}

interface LoginStartAction {
    type: typeof LOGIN_START;
}

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: any;
}

interface LoginFailureAction {
    type: typeof LOGIN_FAILURE;
    payload: any;
}

interface LogoutStartAction {
    type: typeof LOGOUT_START;
}

interface LogoutSuccessAction {
    type: typeof LOGOUT_SUCCESS;
    payload: any;
}

interface LogoutFailureAction {
    type: typeof LOGOUT_FAILURE;
}
    

export type AuthActionTypes =
    | RegisterStartAction
    | RegisterSuccessAction
    | RegisterFailureAction
    | LoginStartAction
    | LoginSuccessAction
    | LoginFailureAction
    | LogoutStartAction
    | LogoutSuccessAction
    | LogoutFailureAction;
