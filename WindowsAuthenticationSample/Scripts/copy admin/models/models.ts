
export interface ApplicationModel {
    ApplicationName: string;
    ApplicationId: string;
    Description: string;
    Url: string;
}

export interface OperationModel {
    ApplicationName: string;
    ApplicationId: string;
    OperationId: string;
    OperationName: string;
    Description: string;
    Url: string;
}

export interface GroupModel {
    GroupId: string;
    GroupName: string;
    Description: string;
    ApplicationId: string;
    ApplicationName: string;
    Url: string;
}

export interface RoleModel {
    RoleName: string;
    RoleId: string;
    ApplicationId: string;
    ApplicationName: string;
    Description: string;
    Url: string;
}

export interface UserModel {
    UserId: string;
    UserName: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    Email: string;
    PasswordQuestion: string;
    IsApproved: boolean;
    IsLockedOut: boolean;
    CreateDate: Date;
    LastLoginDate: Date | null;
    LastPasswordChangedDate: Date | null;
    LastLockoutDate: Date | null;
    FailedPasswordAttemptCount: number | null;
    FailedPasswordAttemptWindowStart: Date | null;
    FailedPasswordAnswerAttemptCount: number | null;
    FailedPasswordAnswerWindowsStart: Date | null;
    Comment: string;
    Url: string;
}