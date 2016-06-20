app.directive('macAddress', function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, ele, attr, ctrl) {
            if (!ctrl) { return; }

            var macAddressParse = function (value) {
                return value.toUpperCase();
            }

            var macAddressFormat = function (value) {
                if (!value) return undefined;
                var numbers = value.replace(/-/g, "");
                if (value.length % 3 === 0) {
                    return numbers.replace(/([0-9A-Za-z]{2})/g, "$1-");
                }
            }

            ctrl.$parsers.push(macAddressParse);
            ctrl.$formatters.push(macAddressFormat);

            ele.on('input', function () {
                var value = macAddressFormat(ele.val());
                if (value !== undefined) {
                    ctrl.$setViewValue(value);
                    ctrl.$render();
                }
                scope.$apply();
            });
        }
    };
});
