const base = require("./base")

describe("Snippets code", function () {
	it("Typeof", function () {
		expect(base('typeof value')).toEqual('gettype($value)');
		expect(base('typeof 2100')).toEqual('gettype(2100)');
		expect(base('typeof "Hello"')).toEqual('gettype("Hello")');
		
		expect(base('if typeof value == "string" print "String" end')).toEqual('if(gettype($value)=="string") { echo "String"; }');
	});
});