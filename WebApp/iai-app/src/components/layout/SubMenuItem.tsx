import { Fragment, MouseEvent } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../context-store";
import menuContext from "../../context-store/menu-context";
import SubMenuModel from "./model/SubMenuModel";
import styles from "./SideBar.module.css";
import SubMenuProps from "./SubMenuProps";

const SubMenuItem = (props: SubMenuProps) => {
    const history = useHistory();
    const [sideBarExpanded, selectedSubMenu] = useAppSelector((state) => [
        state.menuState.sideBarExpanded,
        state.menuState.selectedSubMenu,
    ]);

    const dispatch = useAppDispatch();
    let dNone = sideBarExpanded ? "" : "d-none";
    let showClass = props.show ? "show" : "";
    let subMenuClass = `${styles.subMenu} ${dNone} collapse ${showClass}`;
    let menuTitle = `menu-collapsed ${dNone}`;

    const menuClickHandler = (e: MouseEvent, subMenu: SubMenuModel) => {
        e.preventDefault();
        if (subMenu.path) {
            history.push(subMenu.path);
        }
        dispatch(menuContext.actions.selectSubMenu(subMenu));
    };

    const isActiveLink = (subMenu: SubMenuModel) => {
        if (selectedSubMenu) {
            return selectedSubMenu.id === subMenu.id;
        }
        return false;
    };

    if (props.subMenuItems.length == 0) {
        return <Fragment></Fragment>;
    }

    return (
        <Fragment>
            <li className={subMenuClass}>
                {props.subMenuItems.map((subMenu, index) => {
                    let activeAClass = '';
                    if (window.location.pathname.replace('/bigdecisions', '') === subMenu.path)
                        activeAClass = styles.activeAMainLink;
                    return (
                        <a key={index} href="/" onClick={(e) => { menuClickHandler(e, subMenu); }}
                            className={`list-group-item list-group-item-action bg-dark text-white ${activeAClass}`}>
                            <span className={menuTitle}>{subMenu.title}</span>
                        </a>
                    );
                })}
            </li>
        </Fragment>
    );
};
export default SubMenuItem;