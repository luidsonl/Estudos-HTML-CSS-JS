const secondsHand = document.getElementById('seconds-hand')
const minutesHand = document.getElementById('minutes-hand')
const hoursHand = document.getElementById('hours-hand')
const markers = document.getElementById('markers')

function getTime(){
	const now = new Date()
	const second = now.getSeconds()
	const minute = now.getMinutes()
	const hour = now.getHours()

	secondsHand.style.transform = `rotate(${second * 6}deg)`
	minutesHand.style.transform = `rotate(${minute * 6}deg)`
	hoursHand.style.transform = `rotate(${hour * 30}deg)`
}
setInterval(getTime, 100)

function renderMarkers(){
	for(let i = 0; i < 12; i++){
		const marker = document.createElement('div')
		if (i == 0){
			marker.textContent = 12
		} else{
			marker.textContent = i
		}
		marker.style.transform = `rotate(${30 * i}deg)`

		markers.appendChild(marker)
	}
}

renderMarkers()