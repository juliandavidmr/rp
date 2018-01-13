# rp

(in progress) rp is a php transpiler, it allows you to write a more clean and comfortable new syntax.

Syntax based on ruby, coffescript and python.

- Shorter functions
- Goodbye to the `;` and `$`, also a lot of unnecessary elements.

## Resources

- [Language Reference](#language-reference)
  - [Print message](#print-message)
  - [Declare variable](#declare-variable)
  - [Functions](#functions)
    - [Arguments](#arguments)
  - [Types](#types)
  - [Conditions](#conditions)
  - [Comments](#comments)
  - [Classes](#classes)
  - [Loops](#loops)
  - [Function Calls & Snippets code](#function-calls--snippets-code)
- [Development](#development)
- [Test](#test)

## Language Reference

### Print message

```python
println "abc"
print 2*4
```

_The equivalent in PHP is:_

```php
echo "abc" . PHP_EOL;
echo 2*4;
```

### Declare variable

```ruby
abc = 2
```

_The equivalent in PHP is:_

```php
$abc = 2;
```

### Functions

If the function has no arguments then the parentheses can be omitted

```ruby
def hello
    abc = "Hello"
    println abc
end
```

_The equivalent in PHP is:_

```php
function hello(){
    $abc = "Hello";
    echo $abc . PHP_EOL;
}
```

#### Arguments

```rb
def hello(msg:string)
    print "Hello " . msg
end
```

_The equivalent in PHP is:_

```php
function hello(string $msg){
    echo "Hello " . $msg;
}
```

### Types

The types of variables available in __rp__ are identical to php.

|      rp     |       php     |
|-------------|---------------|
| integer     | integer       |
| float       | float         |
| string      | string        |
| array       | array         |

### Conditions

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

### Comments

The definition of comments is the same as in php, except comments with the symbol `#`.

```php
// This a comment

/*
* Another longer comment
*/
```

### Classes

The classes to be inherited are declared after the colon symbol.

> Note: The possibility of allowing the inheritance of multiple objects is being evaluated.

```rb
class database
    def __construct
        print "Initialized..."
    end
end

class database : mysqli
    def __construct
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

### Loops

#### Basic loop

```ruby
for 10
    println "This is repeated 10 times."
end
```

_The equivalent in PHP is:_

```php
for ($__index__ = 0; $__index__ <= 10; $__index__++) {
    echo "This is repeated 10 times." . PHP_EOL;
}
```

### Each

```t
each abc as x
    print "Hello" . x
end
```

_The equivalent in PHP is:_

```php
foreach ($abc as $x) {
    echo "Hello" . $x;
}
```

### Function Calls & Snippets code

|   Description                         |      **rp**       |                 php               |
|---------------------------------------|-------------------|-----------------------------------|
| get the type of data                  | `typeof value`    | `gettype($value)`                 |
| returns a number vector from a range  | `1..6`            | `array(1,2,3,4,5,6)`              |

## Development

You can test the rp locally with these steps:

1. Install [jison-gho](https://www.npmjs.com/package/jison-gho) globally. (`npm install -g jison-gho`)
2. Compile grammar.

    ```bash
    cd src
    jison grammar.jison

    # you can also run this command
    npm run build
    ```

3. Ready, write your magic.

## Test

Unit tests

```bash
npm test
```

_Remember to install the npm packages: `npm install` or `yarn`_

## TODO

- [x] Loops
- [ ] Inheritance of multiple classes
- [ ] 'implements' function
- [ ] Special conditions, as well as coffeescript...
- [ ] Access to PHP's own functions

> Many more features come...