import { IFilter } from './ifilter';

export class IsEnabledFilter implements IFilter {
    filterType = 'is-enabled-filter';
    values = ['TRUE', 'FALSE'];
    public value = ko.observable('');
    canEdit = true;

    constructor(
        public id: string,
        public name: string,
        ) {
    }
}
