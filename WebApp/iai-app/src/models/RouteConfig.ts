export default interface RouteConfig {
    path: string;
    component: React.FC;
    protected?: boolean;
    routes?: RouteConfig[];
    exact?: boolean;
}