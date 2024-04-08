import SubMenuModel from "./SubMenuModel";
export default interface MenuModel {
    id: string;
    title: string;
    opened: boolean;
    icon: string;
    hasChildren: boolean;
    path?: string;
    subMenuItems: SubMenuModel[];
}