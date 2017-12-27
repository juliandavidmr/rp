function exec (input) {
    return require("./grammar").parse(input);
}

var twenty = exec(`
if abc
    print "This is " . abc
end

def hello
    abc = "Hello"
    println abc

    if abc
        print "Este es abc"
    end
end

def goobbye
    abc = "Bye"
    print abc
end
`)

console.log(twenty)