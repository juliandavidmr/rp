# rp

__rp__ is an abstraction of the programming language php. It has clean syntax, free of some repetitive php elements _(such as $)_, including support for many php functions and segments _(called snippets)_ that help you create files with less code content.

## Features

- Simple Syntax
- Normal Object-oriented Features (e.g. class, method calls)
- Highly Portable (works on many Unix-like/POSIX compatible platforms as well as Windows, macOS, Haiku, etc.), i. e. all platforms supported by NodeJS.
- Fast compilation.

## Resources

- [Language Reference](#language-reference)
  - [Generic](#generic)
    - [Imports](#imports)
    - [Declare variable](#declare-variable)
    - [Print message](#print-message)
    - [Types](#types)
    - [Try catch](#try-catch)
  - [Functions](#functions)
    - [Arguments](#arguments)
    - [Segments](#segments)
  - [Flow controls](#flow-controls)
    - [If](#if)
    - [Loops](#loops)
  - [Comments](#comments)
  - [Classes](#classes)
    - [Attributes](#attributes)
- [Development](#development)
- [Test](#test)
- [Examples](./examples)

## Language Reference

rp detects and solves basic mathematical expressions,
thus shortening the resulting source code in php.

### Print message

```python
println "abc"
print 2*4
```

_The equivalent in PHP is:_

```php
echo "abc" . PHP_EOL;
echo 8;
```

_Go to [resources](#resources)_

### Declare variable

```ruby
abc = 2
```

_The equivalent in PHP is:_

```php
$abc = 2;
```

_Go to [resources](#resources)_

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

_Go to [resources](#resources)_

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

_Go to [resources](#resources)_

### Types

The types of variables available in __rp__ are identical to php.

|      rp     |       php     |
|-------------|---------------|
| integer     | integer       |
| float       | float         |
| string      | string        |
| array       | array         |

_Go to [resources](#resources)_

### Try catch

You can quickly create a try catch without specifying the exception type. By default __rp__ will assign the generic exception for PHP, called `Exception`.

```rb
try
    print "Hello"
    /* Something with errors */
catch
    print "Error" . e
end
```

> Note that the variable `e` can be called from rp without it being visually defined since in PHP it is.

_The equivalent in PHP is:_

```php
try {
    echo "Hello";
    /* Something with errors */
} catch (Exception $e) {
    echo "Error" . $e;
}
```

_Go to [resources](#resources)_

### Flow controls

#### If

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

_Go to [resources](#resources)_

### Comments

The definition of comments is the same as in php, except comments with the symbol `#`.

```php
// This a comment

/*
* Another longer comment
*/
```

_Go to [resources](#resources)_

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

_Go to [resources](#resources)_

#### Attributes

The `@` character is used to define or retrieve an object from a class.

>Note the attribute __`name`__ in the example here:

```rb
class Pet
    private name = "Kitty"
    public age = 2

    def getName
        return @name
    end
end
```

_The equivalent in PHP is:_

```php
class Pet {
    private $name = "Kitty";
    public $age = 2;

    function getName() {
        return $this->$name;
    }
}
```

_Go to [resources](#resources)_

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

_Go to [resources](#resources)_

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

_Go to [resources](#resources)_

### Generic

#### Imports

The packet import has a pattern similar to php; `def` instead of `function`.

```py
use "My\Full\Namespace"
use "My\Full\Namespace" as Namespace
use def "My\Full\Namespace"
use def "My\Full\Namespace" as Namespace
```

_The equivalent in PHP is:_

```php
use My\Full\Namespace;
use My\Full\Namespace as Namespace;
use function My\Full\Namespace;
use function My\Full\Namespace as Namespace;
```

_Go to [resources](#resources)_

### Segments

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

- [ ] Arrays
- [ ] Inheritance of multiple classes
- [ ] 'implements'
- [ ] Special conditions, as well as coffeescript...
- [ ] Access to PHP's own functions
- [ ] [CLI](https://github.com/juliandavidmr/rp/issues/4)

> Many more features come...