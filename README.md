# rp

(in progress) rp is a php compiler, It allows you to write a more clean and comfortable new syntax. 

Clean and simple syntax, based on Ruby, CoffeeScript, Python and other languages.

- Shorter functions and shortcuts to php functions
- Special decorators will soon be available
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

## TODO

- [ ] Loops
- [ ] Classes
- [ ] Decorators: Rest...
- [ ] Conditions
- [ ] Direct access to PHP's own functions

> Many more features come...