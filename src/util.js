module.exports = {
	makeid: function () {
		var text = "";
		var possible = "abcdefghijklmnopqrstuvwxyz";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
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