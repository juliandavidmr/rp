const base = require("./base")
const snippets = require('../src/snippets')

describe("Snippets code", function () {
	it("Typeof", function () {
		expect(base('typeof value')).toEqual('gettype($value)');
		expect(base('typeof 2100')).toEqual('gettype(2100)');
		expect(base('typeof "Hello"')).toEqual('gettype("Hello")');
		
		expect(base('if typeof value == "string" print "String" end')).toEqual('if(gettype($value)=="string") { echo "String"; }');
	});

	it("Range", function () {
		expect(base('1..3')).toEqual('array(1,2,3)');
		expect(base('3..0')).toEqual('array(3,2,1,0)');
		expect(base('1..200')).toEqual(snippets.range(1, 200));
		expect(base('1..1')).toEqual(snippets.range(1, 1));
		expect(base('1..1')).toEqual(`array(1)`);
	});
});