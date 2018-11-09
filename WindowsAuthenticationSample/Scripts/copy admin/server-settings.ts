
declare type ServerSettings = {
    Applications: {
        GetApplication: string;
        Search: string;
        Insert: string;
        Update: string;
    };
    Operations: {
        Search: string;
        GetOperation: string;
    };
    Groups: {
        Search: string;
        GetGroup: string;
    };
    Roles: {
        Search: string;
        GetRole: string;
    };
    Users: {
        Search: string;
        GetUser: string;
    };
};

export default ServerSettings;