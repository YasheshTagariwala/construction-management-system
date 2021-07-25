import {LOGIN_USER, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, LOGOUT_USER} from "../actions";
import {User} from "../../models/user";

export const loginUser = (user: User, history: any) => ({
    type: LOGIN_USER,
    payload: {user, history}
})

export const loginUserSuccess = (user: User) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user
});
export const loginUserError = (message: string) => ({
    type: LOGIN_USER_ERROR,
    payload: {message}
});

export const logoutUser = (history: any) => ({
    type: LOGOUT_USER,
    payload: {history}
});

