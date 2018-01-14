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

	it("Casting", function () {
		expect(base('abc to integer')).toEqual('((integer) $abc)');
		expect(base('abc to string')).toEqual('((string) $abc)');
		expect(base('(abc to string)')).toEqual('((string) $abc)');
		expect(base('abc to bool')).toEqual('((bool) $abc)');
	});

	it("Privacity", function () {
		expect(base('private xyz')).toEqual('private $xyz=null;');
		expect(base('public _xyz_')).toEqual('public $_xyz_=null;');
		expect(base('protected xyz')).toEqual('protected $xyz=null;');
		expect(base('static _xyz_')).toEqual('static $_xyz_=null;');
	});
});