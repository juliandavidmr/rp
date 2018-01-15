const u = require('./util')
const trans = require('./transpile')
const is = require('./is')

Boolean.parse = function (str) {
    str = String(str);
    /* if (typeof str !== 'string') {
        throw new Error(`Boolean.parse: Cannot convert ${typeof st} to boolean.`);        
    } */
    switch (str.toLowerCase()) {
        case "true":
            return true;
        case "false":
            return false;
        default:
            throw new Error("Boolean.parse: Cannot convert string to boolean.");
    }
};

module.exports = {
    getType: function (e) {
        return `gettype(${e})`;
    },
    cast: function (variable, type) {
        switch (type) {
            case 'string':
            case 'integer':
            case 'bool':
            case 'int':
            case 'float':
                return `((${type}) $${variable})`;
            default:
                return ``
        }
    },
    /** Loops */
    range: function (number_a, number_b) {
        number_a = Number(number_a)
        number_b = Number(number_b)
        var str = 'array(';
        if (number_a < number_b) {
            for (let i = number_a; i <= number_b; i++) {
                str += `${i},`;
            }
        } else {
            for (let i = number_a; i >= number_b; i--) {
                str += `${i},`;
            }
        }
        str = str.endsWith(',') ? str.slice(0, str.length - 1) : str
        return str.concat(')');
    },
    loop1: function (to, content) {
        const name_var = `$__index__`;
        return `for (${name_var} = 0; ${name_var} <= ${to}; ${name_var}++) { ${content} }`;
    },
    loop: function (from, to, content) {
        var name_var = ``;
        return `for ($x = ${from}; $x <= ${to}; $x++) { ${content} }`;
    },
    each: function (a, b, content) {
        return `foreach ($${a} as $${b}) { ${content} }`
    },
    /** function */
    def_argument: function (variable, type) {
        if (typeof variable !== 'undefined') {
            if (type) {
                return `${type} $${variable}`
            }
            return `$${variable}`
        }
        return ``
    },
    /** print */
    print: function (value, breakline) {
        return breakline ? `echo ${value} . PHP_EOL;` : `echo ${value};`
    },
    return: function (value) {
        return `return ${value};`
    },
    /** assign */
    assign_var: function (variable, value, is_attibute_class, privacity) {
        privacity = privacity ? privacity : '';
        return (is_attibute_class ?
            `$this->$${variable.toString().substring(1, variable.length)}=${value};` :
            `${privacity} $${variable}=${value};`).trim();
    },
    def_variable: function (name, privacity) {
        privacity = privacity ? privacity : '';
        return `${privacity} $${name}`.trim();
    },
    /** function */
    def_function: function (name, args, content, priv) {
        return (`${ priv ? priv : '' } function ${ name }(${ trans.arguments(args) }){ ${ content } }`).trim();
    },
    /** class */
    def_class: function (name, content, extend) {
        if (extend) {
            return `class ${ name } extends ${extend}{ ${ content } }`;
        } else {
            return `class ${ name } { ${ content } }`;
        }
    },
    not: function (value) {
        if (is.bool(value)) {
            return !Boolean.parse(value);
        } else if (is.number(value)) {
            return !Number.parseFloat(value);
        }
        return `!${ value }`;
    },
    and: function (a, b) {
        function op(logic) {
            switch (logic) {
                case '&&':
                    return a && b;
                case '||':
                    return a || b;
            }
        }
        if (is.bool(a) && is.bool(b)) {
            a = Boolean.parse(a);
            b = Boolean.parse(b);
            return op('&&');
        } else if (is.number(a) && is.number(b)) {
            a = Number.parseFloat(a);
            b = Number.parseFloat(b);
            return op('||');
        }
        return `${a} ${ value } ${b}`;
    }
}