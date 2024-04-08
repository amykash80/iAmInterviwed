import { Nav, NavDropdown } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../context-store";
import { menuActions } from "../../context-store/menu-context";
import styles from "./Header.module.css";
import authenticationService from "../../services/authentication-service";
import { authActions } from "../../context-store/auth-context";
import toasterUtils from "../../utils/toaster-utils";
import UserDropDownImage from "../../assets/InnerCSS/img/avatars/user-dropdown.jpg";
import { useHistory } from "react-router";

const Header = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const expanseCollapseHandler = () => {
    dispatch(menuActions.toggleSideBarStatus());
  };
  const logOutHandler = () => {
    authenticationService.logOut().then(() => {
      dispatch(authActions.logout());
    }).catch(error => {
      toasterUtils.showError('Unable to logout user!');
    });
  }

  const changePasswordHandler = () => {
    history.push("/changepassword");
  }

  let UserName = "";
  let DefaultRole = "";
  let TimeZone = "";
  let LastLogin;
  let date;
  //let roles = [];
  let loggedInUser = useAppSelector((state) => state.authState.loggedInUser);
  if (loggedInUser != null) {
    UserName = loggedInUser.name;
    DefaultRole = loggedInUser.roleName;
    const today = new Date();
    LastLogin = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(today)
    LastLogin = LastLogin.replaceAll('/', '-')
  }
  let searchBarClass = `${styles.searchAlign} form-control mr-sm-1`;
  let HeaderBarClass = `${styles.headerAlign} navbar navbar-expand-md navbar-dark`;

  return (
    <div className="page-header">
      <div className="search-form">
        <form>
          <div className="input-group">
            <input type="text" name="search" className="form-control search-input" placeholder="Type something..."></input>
            <span className="input-group-btn">
              <button className="btn btn-default" id="close-search" type="button"><i className="icon-close"></i></button>
            </span>
          </div>
        </form>
      </div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <div className="logo-sm">
              <a id="sidebar-toggle-button"><i className="fa fa-bars"></i></a>
              <a className="logo-box"><span>IAI</span></a>
            </div>
            <button type="button" className="navbar-toggle collapsed" data-bs-toggle="collapse" data-bs-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <i className="fa fa-angle-down"></i>
            </button>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><a id="collapsed-sidebar-toggle-button"><i className="fa fa-bars"></i></a></li>
              <li><a id="toggle-fullscreen"><i className="fa fa-expand"></i></a></li>
              <li><a id="search-button"><i className="fa fa-search"></i></a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="nav-item active">
                <img src={UserDropDownImage} className="rounded-circle" />
                <span className={styles.userAlign}>{UserName}</span>
              </li>
              <li>
                <NavDropdown title="" id="bs-example-navbar-collapse-1">
                  <NavDropdown.Item className="dropdown-item">{UserName}</NavDropdown.Item>
                  <NavDropdown.Divider className="dropdown-item" />
                  <NavDropdown.Item className="dropdown-item" onClick={changePasswordHandler}>Change Password</NavDropdown.Item>
                  <NavDropdown.Item className="dropdown-item" onClick={logOutHandler}>Log Out</NavDropdown.Item>
                </NavDropdown>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header; 