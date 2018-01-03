const base = require("./base")

describe("Functions", function () {

	it("Define function", function () {
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

	it("Define function public|private|protected", function () {
		expect(base(`
			public def greeting
				print "Hello :)" 
			end`)
		).toEqual('public function greeting(){ echo "Hello :)"; }');

		expect(base(`
			private def greeting
				print "Hello :)"
			end`
		)).toEqual('private function greeting(){ echo "Hello :)"; }');
		
		expect(base(`
			protected def greeting
				print "Hello :)"
			end`
		)).toEqual('protected function greeting(){ echo "Hello :)"; }');
	});
});