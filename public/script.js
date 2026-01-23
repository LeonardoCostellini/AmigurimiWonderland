// ==================== DADOS DOS PRODUTOS ====================
const productsData = [
  {
    name: "Baby Koya",
    category: "Personagens BT21",
    description: "Adorável Baby Koya em crochê, perfeito para presentear!",
    price: 85.00,
    images: [
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg",
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg",
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg"
    ],
    featured: false
  }
  ,
  {
    name: "Baby Chimmy",
    category: "Personagens BT21",
    description: "Baby Chimmy fofo e colorido, feito à mão com carinho.",
    price: 85.00,
    images: [
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg",
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg",
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg"
    ],
    featured: false
  },
  {
    name: "Cachorrinho Rosa",
    category: "Animais",
    description: "Cachorrinho cabeçudo rosa super fofinho!",
    price: 75.00,
    images: [
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg",
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg",
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg"
    ],
    featured: false
  },
  {
    name: "Calopsita",
    category: "Animais",
    description: "Calopsita linda em crochê, ideal para amantes de aves!",
    price: 70.00,
    images: [
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg",
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg",
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg"
    ],
    featured: false
  },
  {
    name: "Pikachu",
    category: "Pokémon",
    description: "Pikachu em amigurumi, o favorito de todos!",
    price: 90.00,
    images: [
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg",
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg",
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg"
    ],
    featured: false
  },
  {
    name: "Gatinho Laranja",
    category: "Animais",
    description: "Gatinho laranja em crochê, muito fofo e macio.",
    price: 75.00,
    images: [
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg",
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg",
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg"
    ],
    featured: false
  },
  {
    name: "Urso Teddy",
    category: "Outros",
    description: "Ursinho teddy clássico, perfeito para decoração.",
    price: 80.00,
    images: [
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg",
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg",
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg"
    ],
    featured: false
  },
  {
    name: "Coelhinho Branco",
    category: "Animais",
    description: "Coelhinho branco delicado, ideal para bebês.",
    price: 70.00,
    images: [
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg",
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg",
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg"
    ],
    featured: false
  },

  {
    name: "Psydeck (Pokemon)",
    category: "Pokemon",
    description: "Psyduck é um Pokémon do tipo Água (número 23) da primeira geração, conhecido por sua aparência amarela semelhante a um pato ou ornitorrinco e por sofrer de dores de cabeça crônicas",
    price: 60.00,
    images: [
      "https://cdn.ribblr.com/pics/45001/cover-2ks7bdv20n.jpg",
      "https://cdn.ribblr.com/pics/45001/cover-2ks7fg1ost.jpg",
      "https://images.squarespace-cdn.com/content/v1/61c92b509f71241773e1d4dc/1640988898004-VO5NFU75F6QRHDM98PG0/20180619_112940.jpg"
    ],
    featured: false
  }

];



// ==================== VARIÁVEIS GLOBAIS ====================
let cart = [];
let currentCategory = "Todos";

// ==================== SPLASH SCREEN ====================
window.addEventListener('DOMContentLoaded', () => {
  const splashScreen = document.getElementById('splashScreen');
  const header = document.getElementById('header');

  setTimeout(() => {
    splashScreen.classList.add('hidden');
    setTimeout(() => {
      splashScreen.style.display = 'none';
      header.classList.add('visible');
      loadCartFromStorage();
      renderProducts();
    }, 500);
  }, 3500);
});

// ==================== RENDERIZAR PRODUTOS ====================
function renderProducts() {
  const productsGrid = document.getElementById('productsGrid');

  const filtered = currentCategory === "Todos"
    ? productsData
    : productsData.filter(p => p.category === currentCategory);

  productsGrid.innerHTML = filtered.map(product => `
    <article 
      class="product-card ${product.featured ? 'featured' : ''}" 
      onclick="openProductModal(productsData[${productsData.indexOf(product)}])"
    >
      ${product.featured ? '<div class="featured-badge">Destaque!</div>' : ''}

      <div class="product-image">
        <img src="${product.images[0]}" alt="${product.name}">
      </div>

      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="product-description">${product.description}</p>

        <div class="product-footer">
          <span class="product-price">
            R$ ${product.price.toFixed(2)}
          </span>

          <button 
            class="buy-btn" 
            onclick="event.stopPropagation(); addToCart('${product.name}', ${product.price}, '${product.images[0]}')"
          >
            Comprar
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// ==================== FILTROS ====================
document.getElementById('filters').addEventListener('click', (e) => {
  if (e.target.classList.contains('pill')) {
    // Remove active de todos os botões
    document.querySelectorAll('.pill').forEach(btn => btn.classList.remove('active'));
    // Adiciona active no clicado
    e.target.classList.add('active');
    // Atualiza categoria
    currentCategory = e.target.getAttribute('data-category');
    // Re-renderiza produtos
    renderProducts();
  }
});

// ==================== CARRINHO ====================
const cartBtn = document.getElementById('cartBtn');
const cartOverlay = document.getElementById('cartOverlay');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartBadge = document.getElementById('cartBadge');

// Abrir carrinho
cartBtn.addEventListener('click', () => {
  cartOverlay.classList.add('show');
  cartSidebar.classList.add('open');
});

// Fechar carrinho
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function closeCart() {
  cartOverlay.classList.remove('show');
  cartSidebar.classList.remove('open');
}

// Adicionar ao carrinho
function addToCart(name, price, image) {
  const item = {
    id: Date.now(),
    name: name,
    price: price,
    image: image
  };

  cart.push(item);
  saveCartToStorage();
  updateCart();

  // Abrir carrinho automaticamente
  cartOverlay.classList.add('show');
  cartSidebar.classList.add('open');
}

// Remover do carrinho
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCartToStorage();
  updateCart();
}

// Limpar carrinho
document.getElementById('clearCartBtn').addEventListener('click', () => {
  if (confirm('Deseja limpar o carrinho?')) {
    cart = [];
    saveCartToStorage();
    updateCart();
  }
});

// Finalizar pedido
document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (cart.length === 0) return;

  // Agrupar produtos por nome
  const grouped = {};

  cart.forEach(item => {
    if (!grouped[item.name]) {
      grouped[item.name] = {
        name: item.name,
        price: item.price,
        qty: 1
      };
    } else {
      grouped[item.name].qty++;
    }
  });

  let message = `🧶 *Pedido - Amigurumi Wonderland* 🧶\n\n`;

  Object.values(grouped).forEach(item => {
    message += `• ${item.name}\n`;
    message += `   Quantidade: ${item.qty}\n`;
    message += `   Valor unitário: R$ ${item.price.toFixed(2)}\n\n`;
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  message += `💰 *Total:* R$ ${total.toFixed(2)}\n\n`;
  message += `📌 *Observação importante:*\n`;
  message += `Todos os produtos são feitos *sob encomenda*.\n`;
  message += `Não trabalhamos com estoque.\n`;
  message += `Após a confirmação, será informado o *prazo para produção*.\n`;

  const phone = "554399149521";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  // Abrir WhatsApp
  window.open(url, "_blank");

  // Limpar carrinho depois de enviar
  cart = [];
  saveCartToStorage();
  updateCart();
  closeCart();
});


// Atualizar visualização do carrinho
function updateCart() {
  const emptyCart = document.getElementById('emptyCart');
  const cartItems = document.getElementById('cartItems');
  const cartFooter = document.getElementById('cartFooter');
  const totalPrice = document.getElementById('totalPrice');

  // Atualizar badge
  if (cart.length > 0) {
    cartBadge.textContent = cart.length;
    cartBadge.style.display = 'flex';
  } else {
    cartBadge.style.display = 'none';
  }

  // Mostrar/esconder carrinho vazio
  if (cart.length === 0) {
    emptyCart.style.display = 'flex';
    cartItems.style.display = 'none';
    cartFooter.style.display = 'none';
  } else {
    emptyCart.style.display = 'none';
    cartItems.style.display = 'flex';
    cartFooter.style.display = 'flex';

    // Renderizar itens
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>R$ ${item.price.toFixed(2)}</p>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑️</button>
      </div>
    `).join('');

    // Calcular total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPrice.textContent = `R$ ${total.toFixed(2)}`;
  }
}

// ==================== LOCALSTORAGE ====================
function saveCartToStorage() {
  localStorage.setItem('amigurumiCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
  const savedCart = localStorage.getItem('amigurumiCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }
}

// ==================== FORMULÁRIO DE CONTATO ====================
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  console.log('Formulário enviado:', { name, email, message });

  const submitBtn = e.target.querySelector('.submit-btn');
  submitBtn.textContent = 'Enviado! ✓';
  submitBtn.style.background = '#4CAF50';

  setTimeout(() => {
    submitBtn.textContent = 'Enviar Mensagem';
    submitBtn.style.background = '';
    e.target.reset();
  }, 3000);
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

function openProductModal(product) {
  const modal = document.getElementById('productModal');
  modal.classList.add('show');

  document.getElementById('modalTitle').textContent = product.name;
  document.getElementById('modalDescription').textContent = product.description;
  document.getElementById('modalPrice').textContent = `R$ ${product.price.toFixed(2)}`;

  const mainImage = document.getElementById('modalMainImage');
  const thumbs = document.getElementById('modalThumbs');

  mainImage.src = product.images[0];
  thumbs.innerHTML = '';

  product.images.forEach((img, index) => {
    const thumb = document.createElement('img');
    thumb.src = img;
    if (index === 0) thumb.classList.add('active');

    thumb.onclick = () => {
      mainImage.style.opacity = 0;
      setTimeout(() => {
        mainImage.src = img;
        mainImage.style.opacity = 1;
      }, 150);

      document.querySelectorAll('.modal-thumbs img')
        .forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    };

    thumbs.appendChild(thumb);
  });

  document.getElementById('modalAddBtn').onclick = () => {
    addToCart(product.name, product.price, product.images[0]);
    closeProductModal();
  };
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('show');
}
