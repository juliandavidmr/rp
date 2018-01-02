function containsArray(values) {
    for (let i = 0; i < values.length; i++) {
        if (Array.isArray(values[i])) {
            return true
        }
    }
    return false
}

function arrayContain(array, search) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == search) {
            return true
        }
    }
    return false
}

module.exports.containsArray = containsArray;
module.exports.arrayContain = arrayContain;