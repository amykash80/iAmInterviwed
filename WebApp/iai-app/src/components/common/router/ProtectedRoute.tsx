import { Fragment } from "react";
import { Route, RouteProps } from "react-router";
import { useAppSelector } from "../../../context-store";
import { Redirect } from "react-router";

const ProtectedRoute: React.FC<RouteProps> = (props) => {
    const authenticated = useAppSelector(
        (state) => state.authState.authenticated
    );
    
    return (
        <Fragment>
            {authenticated && <Route {...props}>{props.children}</Route>}
            {!authenticated && <Redirect to="/index"></Redirect>}
        </Fragment>
    );
};
export default ProtectedRoute;