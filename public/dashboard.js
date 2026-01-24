const form = document.getElementById('productForm')
const productsDiv = document.getElementById('products')

const nameInput = document.getElementById('name')
const descriptionInput = document.getElementById('description')
const priceInput = document.getElementById('price')
const categoryInput = document.getElementById('category')

const imageUrl1 = document.getElementById('imageUrl1')
const imageUrl2 = document.getElementById('imageUrl2')
const imageUrl3 = document.getElementById('imageUrl3')

let editingId = null

function getToken() {
  return localStorage.getItem('token')
}

// ================= LISTAR =================
async function loadProducts() {
  const res = await fetch('/api/products')
  const data = await res.json()

  productsDiv.innerHTML = ''

  data.forEach(p => {
    productsDiv.innerHTML += `
      <div class="card">
        ${(p.images || []).map(img => `<img src="${img}">`).join('')}
        <h3>${p.name}</h3>
        <p>${p.category}</p>
        <p>R$ ${p.price}</p>
        <button onclick="editProduct('${p.id}')">Editar</button>
        <button onclick="deleteProduct('${p.id}')">Excluir</button>
      </div>
    `
  })
}

// ================= SALVAR =================
form.addEventListener('submit', async e => {
  e.preventDefault()

  const images = [
    imageUrl1.value,
    imageUrl2.value,
    imageUrl3.value
  ].filter(Boolean)

  const data = {
    name: nameInput.value,
    description: descriptionInput.value,
    price: Number(priceInput.value),
    category: categoryInput.value,
    images
  }

  const res = await fetch(
    editingId ? `/api/products?id=${editingId}` : '/api/products',
    {
      method: editingId ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    }
  )

  form.reset()
  editingId = null
  loadProducts()
})

// ================= EDITAR =================
async function editProduct(id) {
  const res = await fetch('/api/products')
  const products = await res.json()
  const p = products.find(p => p.id == id)

  editingId = id

  nameInput.value = p.name
  descriptionInput.value = p.description
  priceInput.value = p.price
  categoryInput.value = p.category

  imageUrl1.value = p.images?.[0] || ''
  imageUrl2.value = p.images?.[1] || ''
  imageUrl3.value = p.images?.[2] || ''
}

// ================= EXCLUIR =================
async function deleteProduct(id) {
  await fetch(`/api/products?id=${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

  loadProducts()
}

loadProducts()
