const base = require("./base")

describe("Loop", function () {

    it("Basic", function () {
        expect(base(`
        for 1
            print "Hello"
            jelou = "Hello"
        end
        `)).toMatch(/for \(\$\w*\s*= 0; \$\w+ <= \d; \$\w+\+\+\)[\s\S]*/);
    });

    it("Basic", function () {
        expect(base(`
        each abc as x
            print "Hello" . x
        end
        `)).toEqual(`foreach ($abc as $x) { echo "Hello" . $x; } `);
    });
});