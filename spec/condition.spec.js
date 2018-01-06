const base = require("./base")

describe("Conditions", function () {

	it("Basic", function () {		
        expect(base(`
            if a
            end
        `)).toEqual('if($a) {  }');
        expect(base(`
            if a==1
            end
        `)).toEqual('if($a==1) {  }');
        expect(base(`
            if a==1 && xyz                
            end
        `)).toEqual('if($a==1&&$xyz) {  }');
        expect(base(`
            if a==1 && xyz or rb
                hello="hello condition"
            end
        `)).toEqual('if($a==1&&$xyz||$rb) { $hello="hello condition"; }');        
	});
});