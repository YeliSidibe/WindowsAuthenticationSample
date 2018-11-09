define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const pagesToLeftAndRightOfCurrentPage = 2;
    const numberOfPagesVisible = 5;
    class Paging {
        constructor(reQuery, pageNumberInit, pageSize) {
            this.reQuery = reQuery;
            this.pageNumberInit = pageNumberInit;
            this.pageCount = ko.observable(0);
            this.pages = ko.observableArray([]);
            this.pageNumber = ko.observable(0);
            this.curryGotoPage = (pn) => {
                return () => {
                    if (pn === this.pageNumber()) {
                        return;
                    }
                    if (pn < this.pageNumber() && !this.canGoBackwards()) {
                        return;
                    }
                    if (pn > this.pageNumber() && !this.canGoForwards()) {
                        return;
                    }
                    this.pageNumber(pn);
                    this.reQuery();
                };
            };
            this.canGoForwards = ko.computed(this.canGoForwardsEval, this);
            this.canGoBackwards = ko.computed(this.canGoBackwardsEval, this);
            this.pageNumber(pageNumberInit);
            this.pageSize = pageSize;
        }
        reset() {
            this.pageCount(0);
            this.pages([]);
            this.pageNumber(1);
        }
        rebuild(pageNumber, pageSize, maxRows) {
            this.pageSize = pageSize;
            this.pages.removeAll();
            this.pageNumber(pageNumber);
            this.pageCount(this.getPageCount(maxRows, pageSize));
            const isPageCountLessThanConfiguredVisiblePages = this.pageCount() <= numberOfPagesVisible;
            const isNearBeginning = pageNumber <= Math.ceil(numberOfPagesVisible / 2);
            const isNearEnd = pageNumber > (this.pageCount() - Math.floor(numberOfPagesVisible / 2));
            if (isPageCountLessThanConfiguredVisiblePages) {
                this.startPage = 1;
                this.lastPage = this.pageCount();
            }
            else if (isNearBeginning) {
                this.startPage = 1;
                this.lastPage = numberOfPagesVisible;
            }
            else if (isNearEnd) {
                this.startPage = this.pageCount() - numberOfPagesVisible + 1;
                this.lastPage = this.pageCount();
            }
            else { // isInMiddle
                const pagesToLeft = Math.ceil(numberOfPagesVisible / 2) - 1;
                const pagesToRight = Math.floor(numberOfPagesVisible / 2);
                this.startPage = pageNumber - pagesToLeft;
                this.lastPage = pageNumber + pagesToRight;
            }
            for (let i = this.startPage; i <= this.lastPage; i++) {
                this.pages.push(i);
            }
        }
        getPageCount(maxRows, pageSize) {
            const totalAmountOfPagesAsFraction = maxRows / pageSize;
            const thereIsARemainder = ((maxRows % pageSize) > 0);
            const thereIsMoreThanOnePage = (totalAmountOfPagesAsFraction > 1);
            let pageCount = Math.max(1, Math.floor(totalAmountOfPagesAsFraction));
            if (thereIsARemainder && thereIsMoreThanOnePage) {
                pageCount++;
            }
            return pageCount;
        }
        canGoForwardsEval() {
            return this.pageCount() !== this.pageNumber();
        }
        canGoBackwardsEval() {
            return this.pageNumber() !== 1;
        }
    }
    exports.Paging = Paging;
});
//# sourceMappingURL=paging.js.map