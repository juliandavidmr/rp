const base = require("./base")

describe("Loop", function () {

	it("Basic", function () {
		expect(base(`def hello end`)).toEqual('function hello(){  }');
		expect(base(`def hello() end`)).toEqual('function hello(){  }');
		expect(base(`def bye end`)).toEqual('function bye(){  }');
		expect(base(`def hello end def bye end`)).toEqual('function hello(){  },function bye(){  }');
		expect(base(`def hello print "Hello" end def bye print "Bye" end`)).toEqual('function hello(){ echo "Hello"; },function bye(){ echo "Bye"; }');
		expect(base(`
			def hello
				print "Hello"
			end 
			
			def bye()
				print "Bye" 
			end`)).toEqual('function hello(){ echo "Hello"; },function bye(){ echo "Bye"; }');
	});	
});