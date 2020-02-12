import { AccessControl, Access } from "accesscontrol";
import { Role } from "../enums/role";

export const roleControle = new AccessControl();
export const roles = function() {
    roleControle.grant(Role.Admin.toString());
    roleControle.grant(Role.User.toString());
    return roleControle
}