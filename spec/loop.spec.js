const base = require("./base")

describe("Loop", function () {

    it("Basic", function () {
        expect(base(`
        for 1
            print "Hello"
            jelou = "Hello"
        end
        `)).toEqual(`for ($__index__ = 0; $__index__ <= 1; $__index__++) { echo "Hello";,$jelou="Hello"; }`);

        expect(base(`
        for array1
            print "Hello"
            jelou = "Hello"
        end
        `)).toEqual(`for ($__index__ = 0; $__index__ <= $array1; $__index__++) { echo "Hello";,$jelou="Hello"; }`);
    });

    it("Basic", function () {
        expect(base(`
        each abc as x
            print "Hello" . x
        end
        `)).toEqual(`foreach ($abc as $x) { echo "Hello" . $x; }`);
    });
});