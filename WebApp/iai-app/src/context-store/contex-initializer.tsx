/**
 * This file has implementation for initializing the appliation.
 * This implemenation uses Thunk function to achieve asynchronous fetching of data
 */
import authenticationService from "../services/authentication-service";
import menuService from "../services/menu-service";
import { authActions } from './auth-context';
import { AppDispatch } from ".";
import { menuActions } from "./menu-context";

export const checkAuthentication = () => {
    return async (dispatch: AppDispatch) => {
        if (authenticationService.authTokenExists()) {
            dispatch(initializeUser());
            dispatch(initializeMenuItems());
        } else {
            dispatch(authActions.changeLoadStatus(true));
            dispatch(initializeMenuItems());
        }
    };
}

const initializeUser = () => {
    return async (dispatch: AppDispatch) => {
        try {
            let user = await authenticationService.getUserDetail();
            dispatch(authActions.fetchUser(user));
        } catch (error) {
            dispatch(authActions.changeLoadStatus(true));
        }
    }
};

const initializeMenuItems = () => {
    return async (dispatch: AppDispatch) => {
        let menuGroups = menuService.getAllMenuGroups();
        dispatch(menuActions.fetchMenuGroups(menuGroups));
    }
}