const rp = require('./')

var res = rp(`
app.group("/dynamic", def anonymous() 
	
	@map("GET", "/query/{id}[/{params:.*}]", def x
		id = "id"
	end)

    /* $this->map([
		'GET',
		'POST'
	], '/query/{id}[/{params:.*}]', function (Request $request, Response $response, $args) {
		$id = $args['id'];
		
		if (v::numeric()->validate($id)) {
			$params = explode('/', $request->getAttribute('params'));
			$method = $request->getMethod();
			
			try {
				$http_authorization = $request->getHeader('HTTP_AUTHORIZATION');
				
				$hasToken = ! empty(JWT::getUserByHttpAuthorization($http_authorization)) ? 1 : 0;
				
				$list = DynamicModel::CallQuery(intval($id), $method, $hasToken, $params);
				
				if (is_bool($list)) {
					return $response->withJson(array(), 204);
				} else {
					$result = $list->fetch_all(MYSQLI_ASSOC);
					if (empty($result)) {return $response->withJson(ResponseUtil::Ok([], $method, $params), 200);}
					
					$data = ResponseUtil::Ok($result, $method, $params);
				}
			} catch (Exception $e) {
				return $response->withJson(ResponseUtil::Error($e->getMessage()));
			}
			return $response->withJson($data, 200);
		} else {
			return $response->withJson("No se ha determinado la función", 200);
		}
    });*/
    
end)
`)

console.log(res)