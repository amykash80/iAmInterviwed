import { useAppSelector } from "../../context-store";
import MenuGroup from "./MenuGroup";
import MenuModel from "./model/MenuModel";
import styles from "./SideBar.module.css";
import Logo from "../../assets/InnerCSS/img/logos/logo.png";
import { useHistory } from "react-router";
import React, { Fragment, useState, useEffect, MouseEvent } from "react";

const SideBar = () => {
  //const [routes, setRoutes] = useState<RoleScreenModel[]>([]);
  //const [menuGroups, setMenuGroups] = useState<MenuModel[]>([]);
  let loggedInUser = useAppSelector((state) => state.authState.loggedInUser);
  // useEffect(() => {
  //   getRoutes();
  // }, []);
  const history = useHistory();
  // const getRoutes = () => {
  //   menuService.getRoutes().then((res) => {
  //     setRoutes(res);
  //     processRoutes(res);
  //   }).catch((error) => {
  //     alertUtils.showError("Unable to lode routes");
  //   });
  // };

  //const menuGroups: MenuModel[] = [];
  const processRoutes = () => {
    let routes: MenuModel[] = [];
    if(loggedInUser != null) {      
      loggedInUser.routes.forEach(route => {
        let objRoute: MenuModel = {
          id: route.screenName,
          title: route.displayName,
          opened: false,
          icon: route.icon,
          hasChildren: route.menuLevel === 0 ? false : true,
          path: route.routePath,
          subMenuItems: []
        };
        routes.push(objRoute);
      });
    }
    return routes;
  };
  

  const menuGroups: MenuModel[] = processRoutes();
  const sideBarExpanded = useAppSelector(state => state.menuState.sideBarExpanded);
  let expandCollapseClass = sideBarExpanded ? styles.sidebarExpanded : styles.sidebarCollapsed;
  let sidebarClass = `d-none d-md-block ${styles.sidebarContainer} ${expandCollapseClass}`;
  const homeRedirect = (event: MouseEvent) => {
    event.preventDefault();
    history.push("/");
  }
  return (
    <div className="page-sidebar">
      <a className="logo-box" onClick={(e) => { homeRedirect(e); }}>
        <span><img src={Logo} alt=""></img></span>
      </a>
      <div className="page-sidebar-inner">
        <div className="page-sidebar-menu">
          <ul className="accordion-menu">
            {menuGroups.map((menuGroup) => (
              <MenuGroup key={menuGroup.id} {...menuGroup} />
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
};
export default SideBar;