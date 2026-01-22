// Função de login com tratamento de erro melhorado
async function login() {
  try {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Tentando fazer login com:', email);

    if (!email || !password) {
      alert('Por favor, preencha email e senha!');
      return;
    }

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    console.log('Status da resposta:', res.status);

    if (res.ok) {
      const data = await res.json();
      console.log('Login bem-sucedido:', data);
      
      // Salvar informações do admin no localStorage
      localStorage.setItem('admin', JSON.stringify(data.admin));
      
      // Redirecionar para o dashboard
      window.location.href = '/dashboard.html';
    } else {
      const error = await res.json().catch(() => ({ error: 'Erro desconhecido' }));
      console.error('Erro no login:', error);
      alert('Login inválido: ' + (error.error || 'Email ou senha incorretos'));
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    alert('Erro ao conectar com o servidor. Verifique sua conexão.');
  }
}

// Função para carregar produtos
async function loadProducts() {
  try {
    const res = await fetch('/api/products');
    
    if (!res.ok) {
      throw new Error('Erro ao carregar produtos');
    }
    
    const data = await res.json();
    const content = document.getElementById('content');
    
    if (data.length === 0) {
      content.innerHTML = '<p>Nenhum produto encontrado.</p>';
      return;
    }
    
    content.innerHTML = data.map(p => `
      <div class="card">
        <h3>${p.name}</h3>
        <p>R$ ${parseFloat(p.price).toFixed(2)}</p>
        <p>${p.stock_info || 'Sem informação de estoque'}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    document.getElementById('content').innerHTML = '<p>Erro ao carregar produtos.</p>';
  }
}

// Função para carregar categorias
async function loadCategories() {
  try {
    const res = await fetch('/api/categories');
    
    if (!res.ok) {
      throw new Error('Erro ao carregar categorias');
    }
    
    const data = await res.json();
    const content = document.getElementById('content');
    
    if (data.length === 0) {
      content.innerHTML = '<p>Nenhuma categoria encontrada.</p>';
      return;
    }
    
    content.innerHTML = data.map(c => `
      <div class="card">
        <h3>${c.name}</h3>
        <p>${c.description || 'Sem descrição'}</p>
      </div>
    `).join('');
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
    document.getElementById('content').innerHTML = '<p>Erro ao carregar categorias.</p>';
  }
}

// Verificar se está autenticado (para páginas protegidas)
function checkAuth() {
  const admin = localStorage.getItem('admin');
  if (!admin && window.location.pathname.includes('dashboard')) {
    window.location.href = '/login.html';
  }
}

// Função de logout
function logout() {
  localStorage.removeItem('admin');
  window.location.href = '/login.html';
}

// Executar verificação ao carregar a página
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkAuth);
} else {
  checkAuth();
}