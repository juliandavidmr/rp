const base = require("../base")

describe("Slim Framework", function () {

	it("Basic", function () {
		expect(base(`
        require "vendor/autoload.php"

        app = new App()

        app.get("/hello/{name}", def x(request, response, args)
            return response.getBody()
            // return $response->getBody()->write("Hello, " . $args['name']);
        end)

        app.run()
        `).trim()).toEqual(`require("vendor/autoload.php"); $app=new App(); $app->get("/hello/{name}",function x($request,$response,$args){ return $response . getBody();;, }); $app->run();`);
	});
});