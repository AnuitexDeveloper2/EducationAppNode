import { BaseFilter } from "../baseFilterModel";
import { UserFilterType } from "../../enums/userFilterType";

export interface UserFilter extends BaseFilter {
    userType: UserFilterType
}