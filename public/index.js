async function loadProducts() {
  try {
    const res = await fetch('/api/public/products')
    const products = await res.json()

    if (!res.ok) {
      throw new Error(`Erro API: ${res.status}`)
    }

    const grid = document.getElementById('productsGrid')
    grid.innerHTML = ''

    products.forEach(p => {
      const image = Array.isArray(p.images) && p.images.length > 0
        ? p.images[0]
        : '/img/placeholder.png' // opcional

      grid.innerHTML += `
        <div class="product-card">
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
              <button class="buy-btn">Comprar</button>
            </div>
          </div>
        </div>
      `
    })

  } catch (err) {
    console.error('Erro ao carregar produtos:', err)
  }
}

loadProducts()
