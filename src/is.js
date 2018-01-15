function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

module.exports = {
    number: function (value) {
        return toType(value) == 'number' || /[0-9]$/.test(value);
    },
    bool: function (param) {
        return toType(param) == 'boolean' || /true|false$/.test(param);
    }
}