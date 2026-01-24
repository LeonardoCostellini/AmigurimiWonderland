// ================= CARREGAR CATEGORIAS =================
async function loadCategories() {
  const res = await fetch('/api/products?categories=true')
  const categories = await res.json()

  const filters = document.getElementById('filters')
  filters.innerHTML = ''

  filters.innerHTML += `
    <button class="pill active" data-category="Todos">Todos</button>
  `

  categories.forEach(cat => {
    filters.innerHTML += `
      <button class="pill" data-category="${cat}">${cat}</button>
    `
  })
}

// ================= CARREGAR PRODUTOS =================
async function loadProducts(category = null) {
  let url = '/api/products'

  if (category && category !== 'Todos') {
    url += `?category=${encodeURIComponent(category)}`
  }

  const res = await fetch(url)
  const products = await res.json()

  const grid = document.getElementById('productsGrid')
  grid.innerHTML = ''

  products.forEach(p => {
    const image = p.images?.[0] || '/img/placeholder.png'

    grid.innerHTML += `
      <div class="product-card">
        <img src="${image}">
        <h3>${p.name}</h3>
        <span>R$ ${Number(p.price).toFixed(2)}</span>
      </div>
    `
  })
}

// ================= EVENTO DE CLICK NAS ABAS =================
document.addEventListener('click', e => {
  if (!e.target.classList.contains('pill')) return

  const category = e.target.dataset.category

  document.querySelectorAll('.pill')
    .forEach(b => b.classList.remove('active'))

  e.target.classList.add('active')

  loadProducts(category)
})

// ================= INIT =================
loadCategories()
loadProducts()
