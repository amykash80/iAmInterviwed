import MenuModel from "../components/layout/model/MenuModel";
import SubMenuModel from "../components/layout/model/SubMenuModel";

export default interface MenuState {
    sideBarExpanded: boolean;
    selectedMenu: MenuModel | null;
    selectedSubMenu: SubMenuModel | null;
    menuGroups: MenuModel[];
    menuGroupLoaded: boolean;
}