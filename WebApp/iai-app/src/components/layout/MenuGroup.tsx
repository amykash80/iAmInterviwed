import { Fragment } from "react";
import { useAppSelector } from "../../context-store";
import MenuItem from "./MenuItem";
import MenuGroupModel from "./model/MenuModel";
import styles from "./SideBar.module.css"; 

const MenuGroup = (props:MenuGroupModel) => {
    const sideBarExpanded = useAppSelector((state) => state.menuState.sideBarExpanded);
    let dNone = sideBarExpanded ? "" : "d-none";
    let dFlex = sideBarExpanded ? "d-flex" : "";
    let menuGroupClass = `${styles.menuGroup} ${styles.sidebarSeparatorTitle} ${dFlex} list-group-item  text-muted align-items-center ${dNone} menu-collapsed`;
    
    return (
        <Fragment>  
            <MenuItem key={props.id} menuItem={props}/>  
        </Fragment>
    );
}
export default MenuGroup; 