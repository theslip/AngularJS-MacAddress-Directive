app.directive('macAddress', function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, ele, attr, ctrl) {
            var symbol = attr.symbol ? attr.symbol : '-';

            if (!ctrl) {
                return;
            }

            var macAddressParse = function (value) {
                return value.toUpperCase();
            };

            var macAddressFormat = function (value) {
                if (!value) {
                    return undefined;
                }

                var numbers = value.replace(/[-\.:]/g, "");

                if (numbers.length % 3 === 0) {
                    var result = numbers.replace(/([0-9A-Za-z]{2})/g, "$1" + symbol);

                    if (result.length === 18 && result[result.length - 1] === symbol) {
                        result = result.slice(0, -1);
                    }
                    return result;
                }
            };

            ctrl.$parsers.push(macAddressParse);
            ctrl.$formatters.push(macAddressFormat);

            window.elem = ele;
            ele.on("keyup keydown change", function (e) {
                if (e.keyCode !== 8) {
                    var value = macAddressFormat(ele.val());

                    if (value !== undefined) {
                        ctrl.$setViewValue(value);
                        ctrl.$render();
                    }
                }
                scope.$apply();
            });
        }
    };
});
