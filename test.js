const rp = require('./')

var res = rp(`
require "vendor/autoload.php"

app = new App()

app.get("/hello/{name}", def x(request, response, args)
	return response.getBody()
	// return $response->getBody()->write("Hello, " . $args['name']);
end)

app.run()
`)

console.log(res)