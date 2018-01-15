const base = require("./base")
const seg = require('../src/segments')

describe("seg code", function () {
	it("Print", function () {
		expect(base('print 2*4')).toEqual('echo 8;');
	});

	it("Typeof", function () {
		expect(base('typeof value')).toEqual('gettype($value)');
		expect(base('typeof 2100')).toEqual('gettype(2100)');
		expect(base('typeof "Hello"')).toEqual('gettype("Hello")');

		expect(base('if typeof value == "string" print "String" end')).toEqual('if(gettype($value)=="string") { echo "String"; }');
	});

	it("Range", function () {
		expect(base('1..3')).toEqual('array(1,2,3)');
		expect(base('3..0')).toEqual('array(3,2,1,0)');
		expect(base('1..200')).toEqual(seg.range(1, 200));
		expect(base('1..1')).toEqual(seg.range(1, 1));
		expect(base('1..1')).toEqual(`array(1)`);
	});

	it("not", function () {
		expect(base('abc = not 23')).toEqual('$abc=false;');
		expect(base('abc = not 0')).toEqual('$abc=true;');
		expect(base('abc = not -1')).toEqual('$abc=false;');
		expect(base('abc = not "hello"')).toEqual('$abc=!"hello";');
		expect(base('abc = not true')).toEqual('$abc=false;');
		expect(base('abc = not false')).toEqual('$abc=true;');
		expect(base('abc = not false and not false')).toEqual('$abc=true;'); // TODO: check, why true?
	});
});