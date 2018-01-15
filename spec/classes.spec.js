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

	it("Use", function () {
		expect(base(`use "My\\Full\\Namespace"`)).toEqual('use My\\Full\\Namespace;');
		expect(base(`use "My\\Full\\Namespace" as Namespace`)).toEqual('use My\\Full\\Namespace as Namespace;');
		expect(base(`use def "My\\Full\\Namespace"`)).toEqual('use function My\\Full\\Namespace;');
		expect(base(`use def "My\\Full\\Namespace" as Namespace`)).toEqual('use function My\\Full\\Namespace as Namespace;');
		expect(base(`
			use "My\\Full\\Namespace"

			class Pet
				state = true
			end
		`)).toEqual('use My\\Full\\Namespace;,class Pet { $state=true; }');
	});
});