const hours = new Date().getHours()
const isDayTime = hours > 6 && hours < 20
if (isDayTime === true) {
	document.write('day')
} else {
	document.write('night')
}
