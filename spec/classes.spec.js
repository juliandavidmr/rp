const base = require("./base")

describe("Classes", function () {

	it("Define attribute", function () {
		expect(base(`class Pet end`)).toEqual('class Pet {  }');
		expect(base(`
			class Pet
				name="Kitty"
				
				def getName
					return @name
				end
			end
		`)).toEqual('class Pet { $name="Kitty";,function getName(){ return $this->$name; } }');
	});

});