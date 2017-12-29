# rp

(in progress) rp is a php transpiler, it allows you to write a more clean and comfortable new syntax.

Based on Ruby, CoffeeScript, Python and other languages.

- Shorter functions
- Goodbye to the `;` and `$`, also a lot of unnecessary elements.

## Print message

```python
println "abc"
print 2*4
```

_The equivalent in PHP is:_

```php
echo "abc" . PHP_EOL;
echo 2*4;
```

## Declare variable

```ruby
abc = 2
```

_The equivalent in PHP is:_

```php
$abc = 2;
```

## Functions

If the function has no arguments then the parentheses can be omitted

```ruby
def hello
    abc = "Hello"
    println abc
end

def goobbye
    abc = "Bye"
    print abc
end
```

_The equivalent in PHP is:_

```php
function hello(){
    $abc = "Hello";
    echo $abc . PHP_EOL;
}

function goobbye(){
    $abc = "Bye";
    echo $abc;
}
```

## Conditions

```ruby
if abc
    print "This is " . abc
end
```

_The equivalent in PHP is:_

```php
if($abc) {
    echo "This is " . $abc;
}
```

## Comments

The definition of comments is the same as in php, except comments with the symbol `#`.

```php
// This a comment

/*
* Another longer comment
*/
```

## Classes

The classes to be inherited are declared after the colon symbol.

> Note: The possibility of allowing the inheritance of multiple objects is being evaluated.

```rb
class database
    def __construct()
        print "Initialized..."
    end
end

class database : mysqli
    def __construct()
        print "Initialized..."
    end
end
```

_The equivalent in PHP is:_

```php
class database {
    function __construct() {
        echo "Initialized...";
    }
}

class database extends mysqli {
    function __construct() {
        echo "Initialized...";
    }
}
```

## TODO

- [ ] Loops
- [ ] Inheritance of multiple classes
- [ ] 'implements' function
- [ ] Special conditions, as well as coffeescript...
- [ ] Access to PHP's own functions

> Many more features come...