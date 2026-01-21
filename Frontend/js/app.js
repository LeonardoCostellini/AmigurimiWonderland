async function login() {
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;


const res = await fetch('/api/auth', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email, password })
});


if (res.ok) window.location = 'dashboard.html';
else alert('Login inválido');
}


async function loadProducts() {
const res = await fetch('/api/products');
const data = await res.json();
document.getElementById('content').innerHTML = data.map(p => `
<div class="card">${p.name} - R$ ${p.price}</div>
`).join('');
}


async function loadCategories() {
const res = await fetch('/api/categories');
const data = await res.json();
document.getElementById('content').innerHTML = data.map(c => `
<div class="card">${c.name}</div>
`).join('');
}