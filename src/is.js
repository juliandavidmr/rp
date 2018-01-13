function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

module.exports = {
    number: function (value) {
        return toType(value) == 'number' || /[0-9]$/.test(value);
    },
    bool: function (params) {
        return toType(params) == 'boolean' || /true|false$/.test(params);
    }
}