module.exports = {
	guid: function () {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	},
	makeid: function () {
		var text = "";
		var possible = "abcdefghijklmnopqrstuvwxyz";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	},
	arrayContain: function (array, search) {
		for (let i = 0; i < array.length; i++) {
			if (array[i] == search) {
				return true
			}
		}
		return false
	},
	containsArray: function (values) {
		for (let i = 0; i < values.length; i++) {
			if (Array.isArray(values[i])) {
				return true
			}
		}
		return false
	}
}