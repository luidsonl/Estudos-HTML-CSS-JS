const url = 'https://jsonplaceholder.typicode.com'

// Pega elementos da página index
const loadingElement = document.querySelector('#loading')
const postsContainer = document.querySelector('#posts-container')

//Pega elementos da página post
const postContainer = document.querySelector('#post-container')
const commentsContainer = document.querySelector('#comments-container')

//Pega os elementos do formulário de comentário
const commentForm = document.querySelector('#comment-form')
const emailInput = document.querySelector('#email')
const bodyInput = document.querySelector('#body')

//Pegando o id da url
const urlSearchParams = new URLSearchParams(window.location.search)
const postId = urlSearchParams.get('id')


//Pegando todos os posts
async function getAllPosts(){
	const postsResponse = await fetch(`${url}/posts`)
	const photosResponse = await fetch (`${url}/photos`)

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

//Pega post individual
async function getPost(id){
	const [postResponse, photosResponse, commentsResponse] = await Promise.all([
		fetch(`${url}/posts/${id}`),
		fetch(`${url}/photos`),
		fetch(`${url}/posts/${id}/comments`)
		])

	const dataPost = await postResponse.json()
	const dataPhoto = await photosResponse.json()
	const dataComments = await commentsResponse.json()

	dataPost.image = dataPhoto.find(photo => photo.id === dataPost.id).url; 

	loadingElement.classList.add('hide')

	//Renderizando post
	const title = document.createElement('h2')
	const image = document.createElement('img')
	const body = document.createElement('p')

	title.innerText = dataPost.title
	image.src = dataPost.image
	body.innerText = dataPost.body

	postContainer.appendChild(title)
	postContainer.appendChild(image)
	postContainer.appendChild(body)

	//Renderizando comentarios
	dataComments.map((comment)=>{
		renderComment(comment)
	})
}

//Postando novo comentário
async function postComment(comment){
	const response = await fetch(`${url}/posts/${postId}/comments`,
	{
		method: 'POST',
		body: comment,
		headers: {
			"Content-type": "application/json"
		}

	})

	const data = await response.json()
	renderComment(data)
}

// Renderiza o comentário
function renderComment(comment){
	const commentCard = document.createElement('div')
	const email = document.createElement('p')
	const body = document.createElement('p')

	email.innerText = comment.email
	body.innerText = comment.body

	commentCard.classList = 'comment-card'
	email.classList = 'comment-email'
	commentCard.appendChild(email)
	commentCard.appendChild(body)

	commentsContainer.appendChild(commentCard)
}

if(!postId){
	getAllPosts()
}else{
	getPost(postId)

	//Evento para o formulário de comentários
	commentForm.addEventListener('submit', (e)=>{
		e.preventDefault()

		let comment = {
			email: emailInput.value,
			body: bodyInput.value
		}
		comment = JSON.stringify(comment)
		postComment(comment)
	})
}
