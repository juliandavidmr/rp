const base = require("./base")

describe("Variable", function () {
	it("A simple test", function () {
		expect(true).toBe(true);
	});

	it("Define variable", function () {
		expect(base('abc=true')).toEqual('$abc=true;');
		expect(base('a_number=136')).toEqual('$a_number=136;');
		expect(base('a_string="Hello word!"')).toEqual('$a_string="Hello word!";');
		expect(base('a_bool=false')).toEqual('$a_bool=false;');
		expect(base('x=1+1+3*6')).toEqual('$x=20;');
	});
});