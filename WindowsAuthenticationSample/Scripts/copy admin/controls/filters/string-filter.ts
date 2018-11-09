import { IFilter } from './ifilter';

export class StringFilter implements IFilter {
    filterType = 'string-filter';
    public value = ko.observable('');
    private throttledValue;
    canEdit = true;

    constructor(
        public id: string,
        public name: string,
        permanentValue?: string,
        ) {
        if (permanentValue) {
            this.value(permanentValue);
            this.canEdit = false;
        }
        this.value.extend({ rateLimit: 500 });
    }
}