const secondsHand = document.getElementById('seconds-hand')
const minutesHand = document.getElementById('minutes-hand')
const hoursHand = document.getElementById('hours-hand')

function getTime(){
	const now = new Date()
	const second = now.getSeconds()
	const minute = now.getMinutes()
	const hour = now.getHours()

	secondsHand.style.transform = `rotate(${second * 6}deg)`
	minutesHand.style.transform = `rotate(${minute * 6}deg)`
	hoursHand.style.transform = `rotate(${hour * 15}deg)`
}
setInterval(getTime, 100)
