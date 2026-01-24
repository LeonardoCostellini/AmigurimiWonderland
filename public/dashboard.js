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
const productImagesMap = {} // guarda imagens por produto

function getToken() {
  return localStorage.getItem('token')
}

/* ================= LISTAR ================= */
async function loadProducts() {
  const res = await fetch('/api/products')
  const data = await res.json()

  productsDiv.innerHTML = ''

  data.forEach(p => {
    const images = (p.images || []).filter(i => i && i.startsWith('http'))
    if (!images.length) return

    productImagesMap[p.id] = images

    productsDiv.innerHTML += `
      <div class="card">
        <img 
          src="${images[0]}" 
          class="card-main-image"
          onclick="openImageModal(${p.id}, 0)"
        >

        <h3>${p.name}</h3>
        <p>${p.category || ''}</p>
        <p>${p.description || ''}</p>
        <strong>R$ ${Number(p.price).toFixed(2)}</strong>

        <div class="card-actions">
          <button class="btn-edit" onclick="editProduct('${p.id}')">Editar</button>
          <button class="btn-delete" onclick="deleteProduct('${p.id}')">Excluir</button>
        </div>
      </div>
    `
  })
}

/* ================= SALVAR ================= */
form.addEventListener('submit', async e => {
  e.preventDefault()

  const images = [
    imageUrl1.value,
    imageUrl2.value,
    imageUrl3.value
  ].filter(v => v && v.startsWith('http'))

  if (!images.length) {
    alert('Informe ao menos uma imagem válida')
    return
  }

  const data = {
    name: nameInput.value.trim(),
    description: descriptionInput.value.trim(),
    price: Number(priceInput.value),
    category: categoryInput.value.trim(),
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

  if (!res.ok) {
    alert('Erro ao salvar')
    return
  }

  form.reset()
  editingId = null
  loadProducts()
})

/* ================= EDITAR ================= */
async function editProduct(id) {
  const res = await fetch('/api/products')
  const products = await res.json()

  const p = products.find(p => p.id === id)
  if (!p) return

  editingId = id

  nameInput.value = p.name
  descriptionInput.value = p.description || ''
  priceInput.value = p.price
  categoryInput.value = p.category || ''

  imageUrl1.value = p.images?.[0] || ''
  imageUrl2.value = p.images?.[1] || ''
  imageUrl3.value = p.images?.[2] || ''
}

/* ================= EXCLUIR ================= */
async function deleteProduct(id) {
  if (!confirm('Excluir produto?')) return

  await fetch(`/api/products?id=${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })

  loadProducts()
}

/* ================= MODAL GALERIA ================= */
function openImageModal(productId, index) {
  const images = productImagesMap[productId]
  if (!images?.length) return

  const modal = document.getElementById('imageModal')
  const main = document.getElementById('modalMainImage')
  const thumbs = document.getElementById('modalThumbs')

  main.src = images[index]
  thumbs.innerHTML = ''

  images.forEach(img => {
    const t = document.createElement('img')
    t.src = img
    t.onclick = () => main.src = img
    thumbs.appendChild(t)
  })

  modal.style.display = 'flex'
}

function closeImageModal() {
  document.getElementById('imageModal').style.display = 'none'
}

loadProducts()
