async function loadProducts(category = null) {
  try {
    const url = category
      ? `/api/products?category=${encodeURIComponent(category)}`
      : '/api/products'

    const res = await fetch(url)
    const products = await res.json()

    const grid = document.getElementById('productsGrid')
    grid.innerHTML = ''

    products.forEach(p => {
      const image = p.images?.[0] || '/img/placeholder.png'

      grid.innerHTML += `
        <div class="product-card" onclick="openProductModal(${JSON.stringify(p).replace(/"/g, '&quot;')})">
          <div class="product-image">
            <img src="${image}" alt="${p.name}">
          </div>

          <div class="product-info">
            <h3>${p.name}</h3>
            <p class="product-description">${p.description || ''}</p>

            <div class="product-footer">
              <span class="product-price">
                R$ ${Number(p.price).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      `
    })
  } catch (err) {
    console.error('Erro ao carregar produtos:', err)
  }
}

async function loadCategories() {
  const res = await fetch('/api/categories')
  const categories = await res.json()

  const filters = document.getElementById('filters')
  filters.innerHTML = ''

  // TODOS
  filters.innerHTML += `
    <button class="pill active" onclick="setActive(this); loadProducts()">
      Todos
    </button>
  `

  categories.forEach(cat => {
    filters.innerHTML += `
      <button class="pill"
        onclick="setActive(this); loadProducts('${cat}')">
        ${cat}
      </button>
    `
  })
}

function setActive(button) {
  document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'))
  button.classList.add('active')
}

loadCategories()
loadProducts()
