async function loadProducts() {
  const res = await fetch('/api/products')
  const products = await res.json()

  const grid = document.getElementById('productsGrid')
  grid.innerHTML = ''

  products.forEach(p => {
    grid.innerHTML += `
      <div class="product-card">
        <div class="product-image">
          <img src="${p.imageUrl}" alt="${p.name}">
        </div>
        <div class="product-info">
          <h3>${p.name}</h3>
          <p class="product-description">${p.description}</p>
          <div class="product-footer">
            <span class="product-price">R$ ${Number(p.price).toFixed(2)}</span>
            <button class="buy-btn">Comprar</button>
          </div>
        </div>
      </div>
    `
  })
}

loadProducts()
