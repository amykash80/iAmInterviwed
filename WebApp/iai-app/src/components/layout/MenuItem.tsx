import { Fragment, MouseEvent, useState } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../context-store";
import menuContext from "../../context-store/menu-context";
import MenuModel from "./model/MenuModel";
import styles from "./SideBar.module.css";
import SubMenuItem from "./SubMenuItem";
import MenuProps from "./MenuProps";

const MenuItem = (props: MenuProps) => {
  const dispatch = useAppDispatch();
  const [sideBarExpanded, mainMenuSelected] = useAppSelector((state) => [
    state.menuState.sideBarExpanded,
    state.menuState.selectedMenu,
  ]);

  const history = useHistory();
  let isMenuOpened: boolean = props.menuItem.opened;
  let dNone = sideBarExpanded ? "" : "d-none";
  let activeLinkClass =
    mainMenuSelected!.id === props.menuItem.id ? styles.activeMainLink : "";
  let activeAClass =
    mainMenuSelected!.id === props.menuItem.id ? styles.activeAMainLink : "";
  let mainMenuClass = `${styles.mainMenu} bg-dark list-group-item list-group-item-action flex-column align-items-start`;
  let menuTitle = `menu-collapsed ${dNone}`;
  let menuIconClass = `${styles.menuIcon} ${dNone} ml-auto`;
  const menuClickHandler = (event: MouseEvent) => {
    event.preventDefault();
    if (props.menuItem.path) {
      history.push(props.menuItem.path);
    }
    dispatch(menuContext.actions.selectMenu(props.menuItem));
  };

  return (
    <Fragment>
      <li>
        <NavLink className={`${activeAClass}`} to="" onClick={(e) => { menuClickHandler(e); }}>
          <i className={props.menuItem.icon}></i><span>{props.menuItem.title}</span>
        </NavLink>
      </li>
      <SubMenuItem show={isMenuOpened} subMenuItems={props.menuItem.subMenuItems} />
    </Fragment>
  );
};
export default MenuItem; 