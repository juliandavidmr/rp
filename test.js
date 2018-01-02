function exec (input) {
    return require("./").parse(input);
}

var twenty = exec(`
abc = false
if abc and xyx or aa == 3
    print "This is " . abc
end

// This a comment
def hello
    abc = "Hello"
    println abc

    // evaluate abc var
    if abc
        print "Este es abc"
    end
end

/*
* Another longer comment
*/
def goobbye
    abc = "Bye"
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