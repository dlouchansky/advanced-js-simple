define(['src/myStringify'], function (myStringify) {

    describe('Stringify', function () {

        //beforeEach(function () {
        //});

        function compareStringify(obj) {
            var result = myStringify(obj);
            var expected = JSON.stringify(obj);

            expect(result).toBe(expected);
        }

        it('should stringify number', function () {
            var toTest = 4;
            compareStringify(toTest);
        });

        it('should stringify number object', function () {
            var toTest = 4;
            compareStringify(toTest);
        });

        it('should stringify string', function () {
            var toTest = "str";
            compareStringify(toTest);
        });

        it('should stringify string object', function () {
            var toTest = new String("false");
            compareStringify(toTest);
        });

        it('should stringify null', function () {
            var toTest = null;
            compareStringify(toTest);
        });


        it('should stringify undefined', function () {
            var toTest;
            compareStringify(toTest);
        });

        it('should stringify boolean', function () {
            var toTest = false;
            compareStringify(toTest);
        });

        it('should stringify empty object', function () {
            var toTest = {};
            compareStringify(toTest);
        });

        it('should stringify empty array', function () {
            var toTest = [];
            compareStringify(toTest);
        });

        it('should stringify array with different type values', function () {
            var toTest = [1, 'false', false, {}];
            compareStringify(toTest);
        });

        it('should stringify array with null', function () {
            var toTest = [null];
            compareStringify(toTest);
        });

        it('should stringify array with objects of default types', function () {
            var toTest = [new Number(1), new String('false'), new Boolean(false)];
            compareStringify(toTest);
        });

        it('should stringify object with keys as strings', function () {
            var toTest = {x: 1, y: 'false', z: false, t: {}};
            compareStringify(toTest);
        });

        it('should stringify object with keys as digits', function () {
            var toTest = {5: 1, 6: 'false', 3: false, 7: {}};
            compareStringify(toTest);
        });

        it('should stringify object with undefined value', function () {
            var toTest = { x: undefined };
            compareStringify(toTest);
        });

        it('should stringify object with null value', function () {
            var toTest = { x: null };
            compareStringify(toTest);
        });

        //it('should stringify array with objects of date type', function () {
        //    var toTest = [new Date()];
        //    compareStringify(toTest);
        //});

    });

});