import { Route, Switch } from "react-router";
import RouteConfig from "../../../models/RouteConfig";
import ProtectedRoute from "./ProtectedRoute";
import ScrollToTop from "../scrollToTop";

const unwrapRoutes = (routes: RouteConfig[], includeNestedRoutes: boolean, result?: RouteConfig[]) => {
    let flattenedRoutes = result;
    if (!result) {
        flattenedRoutes = [];
    }
    for (const route of routes) {
        flattenedRoutes!.push(route);
        if (includeNestedRoutes && route.routes) {
            unwrapRoutes(route.routes, includeNestedRoutes, flattenedRoutes);
        }
    }
    return flattenedRoutes;
};

interface RouteConfigProps {
    routes: RouteConfig[];
    includeNestedRoutes: boolean;
}

const RouterConfiguration = (props: RouteConfigProps) => {
    const flattenedRoutes = unwrapRoutes(props.routes, props.includeNestedRoutes);
    const routeDefinitions = flattenedRoutes!.map((route, index) => {
        let exact = route.exact === undefined ? false : route.exact;
        if (route.protected === undefined || route.protected === true) {
            return (
                <ProtectedRoute key={index} exact={exact} path={route.path}>
                    <route.component />
                </ProtectedRoute>
            );
        }

        return (
            <Route key={index} exact={exact} path={route.path}>
                <route.component />
            </Route>
        );
    });
    return <ScrollToTop><Switch>{routeDefinitions}</Switch></ScrollToTop>;
};
export default RouterConfiguration;