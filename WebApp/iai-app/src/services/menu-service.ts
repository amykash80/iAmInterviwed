import MenuGroup from "../components/layout/model/MenuModel";
import RoleScreenModel from "../components/layout/model/RoleScreenModel";
import AppConfig from "../config";
import httpClient from "../utils/http-client";
import BaseResponse from "../models/common/BaseResponse";
import { List } from "reselect/es/types";

const DUMMY_MENU_GROUPS: MenuGroup[] = [
  {
    id: "InterviewerDashboard",
    title: "Dashboard",
    opened: false,
    icon: "",
    hasChildren: false,
    subMenuItems: [],
    path: "/interviewer-dashboard",
  },
  {
    id: "InterviewerProfile",
    title: "Edit Profile",
    opened: false,
    icon: "",
    hasChildren: false,
    subMenuItems: [],
    path: "/interviewer-profile",
  }
];

class MenuService {
  async getRoutes() {
    let apiResponse = await httpClient.get<BaseResponse<RoleScreenModel[]>>(AppConfig.layout.getRoutes);
    return apiResponse.data;
  }

  getAllMenuGroups(): MenuGroup[] {
    return DUMMY_MENU_GROUPS;
  }
}

const menuService = new MenuService();
export default menuService;
