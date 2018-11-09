import { IFilter } from './ifilter';

export class DateFilter implements IFilter {
    public filterType = 'date-filter';
    public value = ko.observable('');
    canEdit = true;

    constructor(
        public id: string,
        public name: string,
        ) {

        this.value.extend({ rateLimit: 500 });
    }
}