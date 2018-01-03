function exec (input) {
    return require("./").parse(input);
}

var twenty = exec(`
if (typeof value == "string") print "String" end
abc = 5^7
hello = false and true
if abc and xyx or aa == 3
    print "This is " . abc
end

// This a comment
def hello(name lastname)
    // evaluate name var
    print "Your name:" . name
    if lastname
        print "Yout lastname:" . lastname
    end
end

/*
* Another longer comment
*/
def goobbye(name)
    abc = "Hello " . name
    print abc
end

class database
    def __construct
        print "Initialized..."
    end
end

class database : mysqli // Extends mysql into class database
    def __construct
        print "Initialized..."
    end
end
`)

console.log(twenty)