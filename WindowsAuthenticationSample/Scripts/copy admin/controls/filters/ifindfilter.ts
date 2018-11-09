import { IFilter } from './ifilter';

export interface IFindFilter extends IFilter{
    displayText: KnockoutComputed<string>;
    modalId: string;
    findModal: any;
    find: () => Promise<void>;
}