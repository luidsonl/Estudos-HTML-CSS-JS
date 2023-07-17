const loadingElement = document.querySelector('#loading')
const postsContainer = document.querySelector('#posts-container')

async function getAllPosts(){
	const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts')
	const photosResponse = await fetch ('https://jsonplaceholder.typicode.com/photos')

	const postsData = await postsResponse.json()
	const photosData = await photosResponse.json()

	const data = postsData.map((post, index)=>{
		return {...post, image: photosData[index].url}
	})

	data.map((post)=>{
		const postCard = document.createElement('div')
		const title = document.createElement('h2')
		const image = document.createElement('img')
		const body = document.createElement('p')
		const link = document.createElement('a')

		postCard.classList = 'post-card'
		title.innerText = post.title
		image.src = post.image
		body.innerText = post.body
		link.innerText = 'Ler'
		link.href = `./post.html?id=${post.id}`

		postCard.appendChild(title)
		postCard.appendChild(image)
		postCard.appendChild(body)
		postCard.appendChild(link)

		postsContainer.appendChild(postCard)
	})

	loadingElement.classList.add('hide')
}
getAllPosts()