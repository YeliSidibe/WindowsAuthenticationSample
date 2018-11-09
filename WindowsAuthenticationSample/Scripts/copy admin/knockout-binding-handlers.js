ko.bindingHandlers.dateTime = {
    update: function (element, valueAccessor) {
        const value = valueAccessor();
        const valueUnwrapped = ko.unwrap(value);
        const date = moment(valueUnwrapped);
        if (date.isValid()) {
            $(element).text(date.format('M/d/YY h:mma'));
        }
    }
};
ko.bindingHandlers.userFullName = {
    update: function (element, valueAccessor) {
        const value = valueAccessor();
        const user = ko.unwrap(value);
        let name = `${user.FirstName} ${user.LastName}`;
        if (!user.FirstName && !user.LastName) {
            name = '(no name)';
        }
        $(element).text(name);
    }
};
//# sourceMappingURL=knockout-binding-handlers.js.map