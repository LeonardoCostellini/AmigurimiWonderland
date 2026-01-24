const form = document.getElementById('productForm')
const productsDiv = document.getElementById('products')

const nameInput = document.getElementById('name')
const descriptionInput = document.getElementById('description')
const priceInput = document.getElementById('price')

const imageUrl1 = document.getElementById('imageUrl1')
const imageUrl2 = document.getElementById('imageUrl2')
const imageUrl3 = document.getElementById('imageUrl3')

let editingId = null

function getToken() {
  const token = localStorage.getItem('token')
  if (!token) {
    alert('Sessão expirada')
    window.location.href = '/login.html'
    throw new Error('No token')
  }
  return token
}

// ================= LISTAR =================
async function loadProducts() {
  const res = await fetch('/api/products', {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

  const data = await res.json()
  if (!res.ok) return alert(data.error)

  productsDiv.innerHTML = ''

  data.forEach(p => {
    productsDiv.innerHTML += `
      <div class="card">
        <div class="card-images">
          ${(p.images || []).map(img => `<img src="${img}">`).join('')}
        </div>

        <h3>${p.name}</h3>
        <p>${p.description || ''}</p>
        <p>R$ ${Number(p.price).toFixed(2)}</p>

        <button onclick="editProduct('${p.id}')">Editar</button>
        <button onclick="deleteProduct('${p.id}')">Excluir</button>
      </div>
    `
  })
}

// ================= SALVAR / EDITAR =================
form.addEventListener('submit', async e => {
  e.preventDefault()

  const images = [
    imageUrl1.value,
    imageUrl2.value,
    imageUrl3.value
  ].filter(Boolean)

  const data = {
    name: nameInput.value.trim(),
    description: descriptionInput.value.trim(),
    price: Number(priceInput.value),
    images
  }

  const method = editingId ? 'PUT' : 'POST'
  const url = editingId
    ? `/api/products?id=${editingId}`
    : '/api/products'

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  })

  const result = await res.json()
  if (!res.ok) return alert(result.error)

  form.reset()
  editingId = null
  loadProducts()
})

// ================= EDITAR =================
async function editProduct(id) {
  const res = await fetch('/api/products', {
    headers: { Authorization: `Bearer ${getToken()}` }
  })

  const products = await res.json()
  const p = products.find(p => p.id === id)
  if (!p) return

  editingId = id

  nameInput.value = p.name
  descriptionInput.value = p.description || ''
  priceInput.value = p.price

  imageUrl1.value = p.images?.[0] || ''
  imageUrl2.value = p.images?.[1] || ''
  imageUrl3.value = p.images?.[2] || ''
}

// ================= EXCLUIR =================
async function deleteProduct(id) {
  if (!confirm('Excluir produto?')) return

  const res = await fetch(`/api/products?id=${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

  const result = await res.json()
  if (!res.ok) return alert(result.error)

  loadProducts()
}

loadProducts()
