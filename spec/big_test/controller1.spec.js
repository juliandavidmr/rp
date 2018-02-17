const base = require("../base")

describe("Big test", function () {

	it("Controller", function () {
		expect(base(`
        /**
         * @author jul.mora <anlijudavid@hotmail.com>
         */
        use "Slim\\Http\\Request"
        use "Slim\\Http\\Response"
        use "Respect\\Validation\\Validator as v"

        app.group("/dynamic", def anonymous()
        end)
        `).trim()).toEqual(`use Slim\\Http\\Request; use Slim\\Http\\Response; use Respect\\Validation\\Validator as v; $app->group("/dynamic",function anonymous(){  });`);
	});	
});