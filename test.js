function exec (input) {
    return require("./grammar").parse(input);
}

var twenty = exec(`
def hello()
    abc = "Hello"
    println abc
end

def goobbye()
    abc = "Bye"
    print abc
end
`)

console.log(twenty)