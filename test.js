function exec (input) {
    return require("./grammar").parse(input);
}

var twenty = exec(`
abc = false
if abc
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
`)

console.log(twenty)