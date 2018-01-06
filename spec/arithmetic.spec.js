const base = require("./base")

describe("Arithmetic", function () {
	it("Basic", function () {
		expect(base('a=1')).toEqual('$a=1;');
		expect(base('a=1+1')).toEqual('$a=2;');
		expect(base('a=1+2*3')).toEqual('$a=7;');
		expect(base('a=2^3')).toEqual('$a=8;');
		expect(base('a=2^3+1')).toEqual('$a=9;');
		expect(base('a=5.3*2')).toEqual('$a=10.6;');
	});

	it("Logic", function () {
		expect(base('a=1>2')).toEqual('$a=false;');		
		// expect(base('a=5*4<13')).toEqual('$a=true;');
	});
});