define(function () {

        function lastComma(index, array) {
            if (index + 1 != array.length) {
                return ",";
            }

            return "";
        }

        function stringifyObjectProperty(source) {
            return function (accumulator, current, index, array) {
                var value = stringifySomething(source[current]);
                var key = stringifySomething(current);

                if (value === "") {
                    return accumulator;
                }

                return accumulator + key + ":" + value + lastComma(index, array);
            }
        }

        function stringifyArrayElement(source) {
            return function (accumulator, current, index, array) {
                var value = stringifySomething(source[current]);

                if (value === "") {
                    return accumulator;
                }

                return accumulator + value + lastComma(index, array);
            }
        }

        function stringifySomething(source) {
            if (typeof source == "undefined") {
                return "";
            }

            if (source == null) {
                return null;
            }

            if (typeof source == "string" || source instanceof String) {
                return '"' + source + '"';
            }

            if (typeof source == "boolean" || typeof source == "number" || source instanceof Boolean || source instanceof Number) {
                return source;
            }

            var enumeratedMethods = Object.keys(source);

            if (Array.isArray(source)) {
                return "[" + enumeratedMethods.reduce(stringifyArrayElement(source), "") + "]";
            }

            return "{" + enumeratedMethods.reduce(stringifyObjectProperty(source), "") + "}";
        }


        return function (obj) {

            if (typeof obj == "undefined") {
                return undefined;
            }

            if (obj == null) {
                return 'null';
            }

            if (typeof obj == "boolean" || typeof obj == "number") {
                return "" + obj;
            }

            if (typeof obj == "string") {
                return '"' + obj + '"';
            }

            return stringifySomething(obj);
        };

    }
);
