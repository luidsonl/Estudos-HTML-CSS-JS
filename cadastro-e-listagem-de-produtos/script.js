//Pega os elementos html
const productName = document.getElementById('product-name')
const productDescription = document.getElementById('product-description')
const productValue = document.getElementById('product-value')
const productAvailable = document.getElementById('product-available')
let productsList = document.getElementById('products-list')
const addProductButton = document.getElementById('add-product-buton')


// array que irá armazenar a lista de objetos(produtos)
let products = loadProducts() ?? []


// Permite que o botão execute a função que adiciona produtos na lista
addProductButton.addEventListener('click', addProduct)

//Funções-----------------------------------

// Adiciona produtos e salva em localstorage
function addProduct(){
	if(
		//Apenas executa se os valores forem inseridos no formlário
		!(
			productName.value && 
			productDescription.value &&
			productValue.value
		)
	){
		return
	}
	let product = new Product(
		productName.value, 
		productDescription.value,
		productValue.value,
		productAvailable.checked)

	products.push(product)
	
	products.sort((a, b) => a.value - b.value);

	saveProducts()
	renderProducts()

}

function deleteProduct(id){
	for(let i = 0; i < products.length; i++){
		if(products[i].id == id){
			products.splice(i, 1)
			saveProducts()
			renderProducts()
			console.log(id)
			return
		}
	}
}

//renderiza lista de produtos
function renderProducts(){
	productsList.innerHTML = `
		<tr>
			<th>Nome</th>
			<th>Descrição</th>
			<th>Valor</th>
			<th>Disponível</th>
			<th></th>
		</tr>
	`
	
	for(let i = 0; i < products.length; i++){

		let element = document.createElement('tr')
		element.innerHTML = `
			<tr>
				<td>${products[i].name}</td>
				<td>${products[i].description}</td>
				<td>${products[i].value} R$</td>
				<td>${products[i].available}</td>
				<td><button onclick="deleteProduct(${products[i].id})" >X</button></td>
			</tr>
		`
		productsList.appendChild(element)
	}
}

//Função que pega os dados do localsotrage do navegador
function loadProducts(){
	if(!window.localStorage){
		return;
	}

	let fromLocalStorage = window.localStorage.getItem('products');
	
	if(fromLocalStorage){
		return JSON.parse(fromLocalStorage);
	}

}
// Função que escreve os dados no localStorage
function saveProducts(){
	window.localStorage.setItem('products' , JSON.stringify(products));
}

// Classes

// Cria a classe que irá armazenar os produtos
class Product{
	constructor(name, description, value, available){
		this.id = this.setId()
		this.name = name
		this.description = description
		this.value = value
		if (available){
			this.available = 'Sim'
		}else{
			this.available = 'Não'
		}
	}

	setId(){
		let higherId = 0
		for(let i = 0; i < products.length; i++){
			if (products[i].id > higherId){
				higherId = products[i].id
			}
		}
		return higherId + 1
	}
}

//chamada de funções
renderProducts()