const base = require("./base")

describe("Functions", function () {

	it("Define function", function () {
		expect(base(`def hello end`)).toEqual('function hello(){  }');
		expect(base(`def hello() end`)).toEqual('function hello(){  }');
		expect(base(`def bye end`)).toEqual('function bye(){  }');
		expect(base(`def hello end def bye end`)).toEqual('function hello(){  } function bye(){  }');
		expect(base(`def hello print "Hello" end def bye print "Bye" end`)).toEqual('function hello(){ echo "Hello"; } function bye(){ echo "Bye"; }');
		expect(base(`
			def hello
				print "Hello"
			end 
			
			def bye()
				print "Bye" 
			end`)).toEqual('function hello(){ echo "Hello"; } function bye(){ echo "Bye"; }');
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

	it("Define function with arguments", function () {
		expect(base(`		
			def hello(msg:string)
				print "Hello :)" 
			end`)
		).toEqual('function hello(string $msg){ echo "Hello :)"; }');

		expect(base(`		
			def hello(msg)
				print "Hello :)" 
			end`)
		).toEqual('function hello($msg){ echo "Hello :)"; }');

		expect(base(`		
			def hello(msg:string, state:bool)
				print "Hello :)" 
			end`)
		).toEqual('function hello(string $msg,bool $state){ echo "Hello :)"; }');

		expect(base(`		
			def hello(msg:string, state:bool)
				if (state != false)
					print "Hello :)"
				end
			end`)
		).toEqual('function hello(string $msg,bool $state){ if($state!=false) { echo "Hello :)"; } }');

		expect(base(`		
			def hello(msg:string, state:bool)
				if (state != false)
					return "Hello :)" 
				end
				return "Bye"
			end`)
		).toEqual('function hello(string $msg,bool $state){ if($state!=false) { return "Hello :)"; },return "Bye"; }');

		expect(base(`
			def sum(a:integer, b:integer)
				return a + b
			end`)
		).toEqual('function sum(integer $a,integer $b){ return $a+$b; }');
	});
});