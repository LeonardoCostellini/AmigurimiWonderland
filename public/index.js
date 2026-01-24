let activeCategory = 'Todos'

/* ================= CATEGORIAS ================= */
async function loadCategories() {
  const res = await fetch('/api/products?categories=true')
  const categories = await res.json()

  const filters = document.getElementById('filters')
  filters.innerHTML = ''

  const allBtn = document.createElement('button')
  allBtn.className = 'pill active'
  allBtn.textContent = 'Todos'
  allBtn.onclick = () => setCategory('Todos')
  filters.appendChild(allBtn)

  categories.forEach(cat => {
    const btn = document.createElement('button')
    btn.className = 'pill'
    btn.textContent = cat
    btn.onclick = () => setCategory(cat)
    filters.appendChild(btn)
  })
}

/* ================= SET CATEGORY ================= */
function setCategory(category) {
  activeCategory = category

  document.querySelectorAll('.pill').forEach(p =>
    p.classList.remove('active')
  )

  [...document.querySelectorAll('.pill')]
    .find(p => p.textContent === category)
    ?.classList.add('active')

  loadProducts()
}

/* ================= PRODUTOS ================= */
async function loadProducts() {
  try {
    const url =
      activeCategory === 'Todos'
        ? '/api/products'
        : `/api/products?category=${encodeURIComponent(activeCategory)}`

    const res = await fetch(url)
    const products = await res.json()

    if (!res.ok) {
      throw new Error('Erro ao buscar produtos')
    }

    const grid = document.getElementById('productsGrid')
    grid.innerHTML = ''

    if (products.length === 0) {
      grid.innerHTML = `<p class="empty">Nenhum produto nessa categoria</p>`
      return
    }

    products.forEach(p => {
      const image =
        Array.isArray(p.images) && p.images.length
          ? p.images[0]
          : '/img/placeholder.png'

      grid.innerHTML += `
        <div class="product-card" onclick='openProductModal(${JSON.stringify(p)})'>
          <div class="product-image">
            <img src="${image}" alt="${p.name}">
          </div>

          <div class="product-info">
            <h3>${p.name}</h3>
            <span class="product-price">
              R$ ${Number(p.price).toFixed(2)}
            </span>
          </div>
        </div>
      `
    })
  } catch (err) {
    console.error(err)
  }
}

/* ================= INIT ================= */
loadCategories()
loadProducts()
