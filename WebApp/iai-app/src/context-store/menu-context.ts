import MenuState from "../models/MenuState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import MenuModel from "../components/layout/model/MenuModel";
import SubMenuModel from "../components/layout/model/SubMenuModel";

const menuState: MenuState = {
    sideBarExpanded: true,
    selectedMenu: null,
    selectedSubMenu: null,
    menuGroups: [],
    menuGroupLoaded: false,
};

const menuContext = createSlice({
    name: "menuState",
    initialState: menuState,
    reducers: {
        toggleSideBarStatus: (state) => {
            state.sideBarExpanded = !state.sideBarExpanded;
        },

        fetchMenuGroups: (state, action: PayloadAction<MenuModel[]>) => {
            state.menuGroups = action.payload;
            state.selectedMenu = action.payload[0];
            state.menuGroupLoaded = true;
            state.sideBarExpanded = true;
        },

        selectMenu: (state, action: PayloadAction<MenuModel>) => {
            let selectedMenu = { ...action.payload };
            selectedMenu.opened = !selectedMenu.opened;
            state.menuGroups = updateMenuItems(selectedMenu, state.menuGroups);
            state.selectedMenu = selectedMenu;
        },

        selectSubMenu: (state, action: PayloadAction<SubMenuModel>) => {
            state.selectedSubMenu = action.payload;
        },

        toggleMenuStatus(state) {
            if (state.selectedMenu) {
                state.selectedMenu.opened = !state.selectedMenu.opened;
            }
        },
    },
});

const updateMenuItems = (
    selectedMenu: MenuModel,
    menuGroups: MenuModel[]
) => {
    const updatedGroup = menuGroups.map(group => {
        group.opened = false;
        if (group.id === selectedMenu.id) {
            group.opened = selectedMenu.opened;
        }
        return group;
    });
    return updatedGroup;
};
export const menuActions = menuContext.actions;
export default menuContext;