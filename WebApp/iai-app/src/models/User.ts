import RolesModel from "./Roles";
import Routes from '../components/layout/model/RoleScreenModel';
interface User {
    userId: string;
    userName: string;
    name: string;
    roleId: string;
    roleName: string;
    profileId: string;
    EmailId: string;
    routes: Routes[];    
}
export default User;