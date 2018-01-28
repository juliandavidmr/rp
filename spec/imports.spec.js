const base = require("./base")

describe("Imports", function () {

	it("Use", function () {
		expect(base(`use "My\\Full\\Namespace"`)).toEqual('use My\\Full\\Namespace;');
		expect(base(`use "My\\Full\\Namespace" as Namespace`)).toEqual('use My\\Full\\Namespace as Namespace;');
		expect(base(`use def "My\\Full\\Namespace"`)).toEqual('use function My\\Full\\Namespace;');
		expect(base(`use def "My\\Full\\Namespace" as Namespace`)).toEqual('use function My\\Full\\Namespace as Namespace;');
		expect(base(`
			use "My\\Full\\Namespace"

			class Pet
                state = true
                
                def __constructor
                end
			end
		`)).toEqual('use My\\Full\\Namespace;,class Pet { $state=true;,function __constructor(){  } }');
	});
});