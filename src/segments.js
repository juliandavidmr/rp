const u = require('./util')

module.exports = {
    getType: function (e) {
        return `gettype(${e})`;
    },
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
        var name_var = `${u.makeid()}`;
        return `for ($${name_var} = 0; $${name_var} <= ${to}; $${name_var}++) { ${content} }`;
    },
    loop: function (from, to, content) {
        var name_var = ``;
        return `
            for ($x = ${from}; $x <= ${to}; $x++) {
                ${content}
            }
        `;
    }
}