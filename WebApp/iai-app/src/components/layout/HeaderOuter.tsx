import { MouseEvent } from "react";
import { useHistory } from "react-router";
import logo from "../../assets/img/logos/logo.png";

const HeaderOuter = () => {
    const history = useHistory();
    const register = (event: MouseEvent, registerType: string) => {
        event.preventDefault();
        history.push("/register/" + registerType);
    }
    const signIn = (event: MouseEvent) => {
        event.preventDefault();
        history.push("/login");
    }
    const homeRedirect = (event: MouseEvent) => {
        event.preventDefault();
        history.push("/index");
    }
    return (
        <header className="header-style8">
            <div className="navbar-default">
                <div className="top-search bg-primary">
                    <div className="container-body">
                        <form className="search-form">
                            <div className="input-group">
                                <span className="input-group-addon cursor-pointer">
                                    <button className="search-form_submit fas fa-search text-white" type="submit"></button>
                                </span>
                                <input type="text" className="search-form_input form-control" name="s" autoComplete="off" placeholder="Type & hit enter..."></input>
                                <span className="input-group-addon close-search"><i className="fas fa-times mt-1"></i></span>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="container-body">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <div className="menu_area alt-font">
                                <nav className="navbar navbar-expand-lg navbar-light p-0">

                                    <div className="navbar-header navbar-header-custom">
                                        <a href="index.html" className="navbar-brand logodefault">
                                            <img id="logo" width="250" src={logo} alt="logo" onClick={(e) => { homeRedirect(e); }}></img>
                                        </a>
                                    </div>
                                    <div className="navbar-toggler"></div>
                                    <ul className="navbar-nav justify-content-center" id="nav" style={{ paddingLeft: '15%' }}>
                                        <li><a onClick={(e) => { homeRedirect(e); }}>Home</a></li>
                                        <li><a onClick={(e) => { register(e, "Company"); }}>Employer</a></li>
                                        <li><a onClick={(e) => { register(e, "Interviewer"); }}>Interviewer</a></li>
                                        <li><a onClick={(e) => { register(e, "Candidate"); }}>Candidate</a></li>
                                        <li><a href="#!">View Rating</a></li>
                                    </ul>
                                    <div className="attr-nav" style={{ paddingLeft: '5%' }}>
                                        <ul>
                                            <li>
                                                <a className="butn primary small " onClick={(e) => { signIn(e); }}><span>Sign in</span></a>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default HeaderOuter; 