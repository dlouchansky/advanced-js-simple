// currently all primitive types and Array, Number, Boolean objects supported

// Questions for lecture:
// constructing objects using "prototype" property
// constructing objects using "new" keyword
//

define(function () {

        function lastComma(index, array) {
            if (index + 1 != array.length) {
                return ",";
            }

            return "";
        }

        function Stringifier(source) {

            function stringifyObjectProperty(accumulator, current, index, array) {
                var value = Stringifier(source[current]).stringify();
                var key = Stringifier(current).stringify();

                if (value === "") {
                    return accumulator;
                }

                return accumulator + key + ":" + value + lastComma(index, array);
            }

            function stringifyArrayElement(accumulator, current, index, array) {
                var value = Stringifier(source[current]).stringify();

                if (value === "") {
                    return accumulator;
                }

                return accumulator + value + lastComma(index, array);
            }

            function stringifySomething() {
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
                    return "[" + enumeratedMethods.reduce(stringifyArrayElement, "") + "]";
                }

                return "{" + enumeratedMethods.reduce(stringifyObjectProperty, "") + "}";
            }

            return {
                stringify: stringifySomething
            };
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

            return Stringifier(obj).stringify();
        };

    }
);
