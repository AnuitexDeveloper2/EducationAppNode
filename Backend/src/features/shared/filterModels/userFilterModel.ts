import { BaseFilterModel } from "./baseFilterModel";
import { UserFilterType } from "../../shared/enums/userFilterType";

export interface UserFilterModel extends BaseFilterModel {
    userType: UserFilterType
}