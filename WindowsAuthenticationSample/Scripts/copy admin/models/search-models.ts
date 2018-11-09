import * as Models from './models';

export interface SearchRequestModel {
    PageNumber: number;
    PageSize: number;
    SortColumn: string;
    SortDirection: string;
}

export interface SearchResponseModel<T extends SearchRequestModel> {
    SearchParameters: T;
    MaxRows: number;
}

export interface ApplicationSearchRequestModel extends SearchRequestModel {
    FilterByApplicationName?: string;
    FilterByUserId?: string;
}

export interface ApplicationSearchResponseModel extends SearchResponseModel<ApplicationSearchRequestModel> {
    Applications: Models.ApplicationModel[];
}

export interface GetApplicationResponseModel {
    ApplicationId: string;
    ApplicationName: string;
    Description: string;
}

export interface OperationSearchRequestModel extends SearchRequestModel {
    FilterByApplicationId?: string;
    FilterByRoleId?: string;
    FilterByOperationId?: string;
    FilterByOperationName?: string;
}

export interface OperationSearchResponseModel extends SearchResponseModel<OperationSearchRequestModel> {
    Operations: Models.OperationModel[];
}

export interface GroupSearchRequestModel extends SearchRequestModel {
    FilterByApplicationId?: string;
    FilterByGroupId?: string;
    FilterByGroupName?: string;
    FilterByUserId?: string;
    FilterByRoleId?: string;
}

export interface GroupSearchResponseModel extends SearchResponseModel<GroupSearchRequestModel> {
    Groups: Models.GroupModel[];
}

export interface RoleSearchRequestModel extends SearchRequestModel {
    FilterByApplicationId?: string;
    FilterByGroupId?: string;
    FilterByRoleId?: string;
    FilterByRoleName?: string;
    FilterByUserId?: string;
    FilterByOperationId?: string;
}

export interface RoleSearchResponseModel extends SearchResponseModel<RoleSearchRequestModel> {
    Roles: Models.RoleModel[];
}

export interface UserSearchRequestModel extends SearchRequestModel {
    FilterByApplicationId?: string;
    FilterByGroupId?: string;
    FilterByRoleId?: string;
    FilterByEmail?: string;
    FilterByFirstName?: string;
    FilterByLastName?: string;
    FilterByIsApproved?: string;
    FilterByIsLockedOut?: string;
    FilterByCreateDate?: Date;
    FilterByLastLoginDate?: Date;
    FilterByUserId?: string;
    FilterByUserName?: string;
}

export interface UserSearchResponseModel extends SearchResponseModel<UserSearchRequestModel> {
    Users: Models.UserModel[];
}