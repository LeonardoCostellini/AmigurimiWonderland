// ==================== VARIÁVEIS GLOBAIS ====================
let cart = []
let currentCategory = "Todos"

// ==================== SPLASH SCREEN ====================
window.addEventListener('DOMContentLoaded', () => {
  const splashScreen = document.getElementById('splashScreen')
  const header = document.getElementById('header')

  setTimeout(() => {
    splashScreen.classList.add('hidden')
    setTimeout(() => {
      splashScreen.style.display = 'none'
      header.classList.add('visible')
      loadCartFromStorage()
      carregarProdutos()
    }, 500)
  }, 3500)
})

// ==================== FILTROS (visual por enquanto) ====================
const filters = document.getElementById('filters')
if (filters) {
  filters.addEventListener('click', (e) => {
    if (e.target.classList.contains('pill')) {
      document.querySelectorAll('.pill').forEach(btn =>
        btn.classList.remove('active')
      )
      e.target.classList.add('active')
      currentCategory = e.target.dataset.category
    }
  })
}

// ==================== CARRINHO ====================
const cartBtn = document.getElementById('cartBtn')
const cartOverlay = document.getElementById('cartOverlay')
const cartSidebar = document.getElementById('cartSidebar')
const closeCartBtn = document.getElementById('closeCartBtn')
const cartBadge = document.getElementById('cartBadge')

cartBtn?.addEventListener('click', () => {
  cartOverlay.classList.add('show')
  cartSidebar.classList.add('open')
})

closeCartBtn?.addEventListener('click', closeCart)
cartOverlay?.addEventListener('click', closeCart)

function closeCart() {
  cartOverlay.classList.remove('show')
  cartSidebar.classList.remove('open')
}

function addToCart(name, price, image) {
  cart.push({
    id: Date.now(),
    name,
    price,
    image
  })

  saveCartToStorage()
  updateCart()

  cartOverlay.classList.add('show')
  cartSidebar.classList.add('open')
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id)
  saveCartToStorage()
  updateCart()
}

document.getElementById('clearCartBtn')?.addEventListener('click', () => {
  if (confirm('Deseja limpar o carrinho?')) {
    cart = []
    saveCartToStorage()
    updateCart()
  }
})

document.getElementById('checkoutBtn')?.addEventListener('click', () => {
  if (cart.length === 0) return

  let total = 0
  let message = `🧶 *Pedido - Amigurumi Wonderland* 🧶\n\n`

  cart.forEach(item => {
    total += item.price
    message += `• ${item.name} - R$ ${item.price.toFixed(2)}\n`
  })

  message += `\n💰 *Total:* R$ ${total.toFixed(2)}`
  const url = `https://wa.me/554399149521?text=${encodeURIComponent(message)}`

  window.open(url, '_blank')

  cart = []
  saveCartToStorage()
  updateCart()
  closeCart()
})

function updateCart() {
  const emptyCart = document.getElementById('emptyCart')
  const cartItems = document.getElementById('cartItems')
  const cartFooter = document.getElementById('cartFooter')
  const totalPrice = document.getElementById('totalPrice')

  if (cart.length === 0) {
    emptyCart.style.display = 'flex'
    cartItems.style.display = 'none'
    cartFooter.style.display = 'none'
    cartBadge.style.display = 'none'
    return
  }

  cartBadge.textContent = cart.length
  cartBadge.style.display = 'flex'

  emptyCart.style.display = 'none'
  cartItems.style.display = 'flex'
  cartFooter.style.display = 'flex'

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}">
      <div>
        <h4>${item.name}</h4>
        <p>R$ ${item.price.toFixed(2)}</p>
      </div>
      <button onclick="removeFromCart(${item.id})">🗑️</button>
    </div>
  `).join('')

  totalPrice.textContent = `R$ ${cart.reduce((s, i) => s + i.price, 0).toFixed(2)}`
}

// ==================== LOCALSTORAGE ====================
function saveCartToStorage() {
  localStorage.setItem('amigurumiCart', JSON.stringify(cart))
}

function loadCartFromStorage() {
  const saved = localStorage.getItem('amigurumiCart')
  if (saved) {
    cart = JSON.parse(saved)
    updateCart()
  }
}

// ==================== PRODUTOS (API) ====================
async function carregarProdutos() {
  const container = document.getElementById('productsGrid')
  if (!container) return

  const res = await fetch('/api/products')
  const produtos = await res.json()

  container.innerHTML = ''

  produtos.forEach((p, index) => {
    // garante array de imagens
    const images = p.images && p.images.length
      ? p.images
      : [p.imageUrl, p.imageUrl, p.imageUrl]

    container.innerHTML += `
      <article class="product-card"
        onclick="openProductModal(${index})">

        <div class="product-image">
          <img src="${images[0]}" alt="${p.name}">
        </div>

        <div class="product-info">
          <h3>${p.name}</h3>
          <p class="product-description">${p.description}</p>

          <div class="product-footer">
            <span class="product-price">
              R$ ${Number(p.price).toFixed(2)}
            </span>

            <button class="buy-btn"
              onclick="event.stopPropagation();
              addToCart('${p.name}', ${p.price}, '${images[0]}')">
              Comprar
            </button>
          </div>
        </div>
      </article>
    `
  })

  window.__products = produtos
}

function openProductModal(index) {
  const product = window.__products[index]
  const modal = document.getElementById('productModal')

  modal.classList.add('show')

  document.getElementById('modalTitle').textContent = product.name
  document.getElementById('modalDescription').textContent = product.description
  document.getElementById('modalPrice').textContent =
    `R$ ${Number(product.price).toFixed(2)}`

  const images = product.images && product.images.length
    ? product.images
    : [product.imageUrl, product.imageUrl, product.imageUrl]

  const mainImage = document.getElementById('modalMainImage')
  const thumbs = document.getElementById('modalThumbs')

  mainImage.src = images[0]
  thumbs.innerHTML = ''

  images.forEach((img, i) => {
    const thumb = document.createElement('img')
    thumb.src = img
    if (i === 0) thumb.classList.add('active')

    thumb.onclick = () => {
      mainImage.src = img
      document.querySelectorAll('.modal-thumbs img')
        .forEach(t => t.classList.remove('active'))
      thumb.classList.add('active')
    }

    thumbs.appendChild(thumb)
  })

  document.getElementById('modalAddBtn').onclick = () => {
    addToCart(product.name, product.price, images[0])
    closeProductModal()
  }
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('show')
}
