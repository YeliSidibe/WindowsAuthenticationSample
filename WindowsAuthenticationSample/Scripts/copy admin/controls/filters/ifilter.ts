
export interface IFilter {
    filterType: string;
    id: string;
    name: string;
    value: KnockoutObservable<string>;
    canEdit: boolean;
}