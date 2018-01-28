const base = require("./base")

describe("TryCatch", function () {

    it("Basic", function () {
        expect(base(`
        try
            print "Hello"
            jelou = "Hello"
        catch
        end
        `)).toEqual(`try { echo "Hello";,$jelou="Hello"; } catch (Exception $e) {  }`);

        expect(base(`
        try
            print "Hello"
            jelou = "Hello"
        catch
            print "Error" . e
        end
        `)).toEqual(`try { echo "Hello";,$jelou="Hello"; } catch (Exception $e) { echo "Error" . $e; }`);
    });    
});