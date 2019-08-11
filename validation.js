var validation = {}
validation.isValidTimeStamp = (element, key) => {
	try {
		let date = null
		if(isNumeric(element[key])) {
			let _timestamp = parseInt(element[key])
			date = new Date(_timestamp)
		} else {
			date = new Date(element[key])
		}
		return isNotDefault(date) && isNumeric(date.getTime());
	} catch (error) {
		console.log(error);
		return false
	}
}


validation.isValidValue = (element, key) => {
	try {
		return isNumeric(element[key]) && !validation.isValidTimeStamp(element, key)
	} catch (error) {
		console.log(error)
		return false
	}
}

function isNotDefault(date) {
	return date.toLocaleDateString() != new Date(5).toLocaleDateString()
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = validation