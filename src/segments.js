const u = require('./util')

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
    assign_var: function (variable, value, is_attibute_class) {
        return is_attibute_class ?
            `$this->$${variable.toString().substring(1, variable.length)}=${value};` :
            `$${variable}=${value};`;
    }
}