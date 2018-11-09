
export type Action = {
    name: string;
    action: () => void;
};

export class Actions {
    constructor(public actions: Action[]){}
}