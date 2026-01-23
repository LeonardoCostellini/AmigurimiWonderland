const form = document.getElementById('productForm')
const productsDiv = document.getElementById('products')

let editingId = null

// ================= LISTAR =================
async function loadProducts() {
  const res = await fetch('/api/products')
  const products = await res.json()

  productsDiv.innerHTML = ''

  products.forEach(p => {
    const images = p.images || []

    productsDiv.innerHTML += `
      <div class="card">
        <div class="card-images">
          ${images.map(img => `
            <img src="${img}" alt="${p.name}">
          `).join('')}
        </div>

        <div class="card-body">
          <h3>${p.name}</h3>
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

  const images = [
    document.getElementById('imageUrl1').value,
    document.getElementById('imageUrl2').value,
    document.getElementById('imageUrl3').value
  ].filter(Boolean)

  const data = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    price: Number(document.getElementById('price').value),
    images
  }

  const method = editingId ? 'PUT' : 'POST'
  const url = editingId ? `/api/products/${editingId}` : '/api/products'

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  form.reset()
  editingId = null
  loadProducts()
})

// ================= EDITAR =================
async function editProduct(id) {
  const res = await fetch('/api/products')
  const products = await res.json()
  const p = products.find(p => p.id === id)

  editingId = id

  document.getElementById('name').value = p.name
  document.getElementById('description').value = p.description || ''
  document.getElementById('price').value = p.price

  document.getElementById('imageUrl1').value = p.images?.[0] || ''
  document.getElementById('imageUrl2').value = p.images?.[1] || ''
  document.getElementById('imageUrl3').value = p.images?.[2] || ''
}

// ================= EXCLUIR =================
async function deleteProduct(id) {
  if (!confirm('Excluir produto?')) return

  await fetch(`/api/products/${id}`, { method: 'DELETE' })
  loadProducts()
}

loadProducts()
