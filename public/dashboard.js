const nameInput = document.getElementById('name')
const descriptionInput = document.getElementById('description')
const priceInput = document.getElementById('price')
const form = document.getElementById('productForm')
const productsDiv = document.getElementById('products')

let editingId = null

function getToken() {
  const token = localStorage.getItem('token')
  if (!token) {
    alert('Sessão expirada. Faça login novamente.')
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

  if (!res.ok) {
    console.error(data)
    alert(data.error || 'Erro ao carregar produtos')
    return
  }

  productsDiv.innerHTML = ''

  data.forEach(p => {
    productsDiv.innerHTML += `
      <div class="card">
        <div class="card-body">
          <h3>${p.name}</h3>
          <p>${p.description || ''}</p>
          <p class="price">R$ ${Number(p.price).toFixed(2)}</p>

          <div class="actions">
            <button class="edit" onclick="editProduct('${p.id}')">Editar</button>
            <button class="delete" onclick="deleteProduct('${p.id}')">Excluir</button>
          </div>
        </div>
      </div>
    `
  })
}

// ================= SALVAR / EDITAR =================
form.addEventListener('submit', async e => {
  e.preventDefault()

const data = {
  name: nameInput.value.trim(),
  description: descriptionInput.value.trim(),
  price: Number(priceInput.value)
}


  if (!data.name || isNaN(data.price)) {
    alert('Preencha nome e preço corretamente')
    return
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

  if (!res.ok) {
    console.error(result)
    alert(result.error || 'Erro ao salvar produto')
    return
  }

  form.reset()
  editingId = null
  loadProducts()
})

// ================= EDITAR =================
async function editProduct(id) {
  const res = await fetch('/api/products', {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

  const products = await res.json()
  const p = products.find(p => p.id === id)

  if (!p) return

  editingId = id

nameInput.value = p.name
descriptionInput.value = p.description || ''
priceInput.value = p.price

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

  if (!res.ok) {
    console.error(result)
    alert(result.error || 'Erro ao excluir produto')
    return
  }

  loadProducts()
}

loadProducts()
