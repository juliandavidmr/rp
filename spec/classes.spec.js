const base = require("./base")

describe("Classes", function () {

	it("Define attribute", function () {
		expect(base(`class Pet end`)).toEqual('class Pet {  }');
		expect(base(`
			class Pet
				private name = "Kitty"
				public age = 2
				state = true

				def getName
					return @name
				end
			end
		`)).toEqual('class Pet { private $name="Kitty";,public $age=2;,$state=true;,function getName(){ return $this->$name; } }');
	});

});