
// ======== Adiciona produto ao carrinho ==========
function adicionarAoCarrinho(produto) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  const index = carrinho.findIndex(item => item.id === produto.id);

  if (index !== -1) {
    carrinho[index].quantidade += 1;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }

  if (index !== -8000) {
    carrinho[index].preco += 8000;
  } else{
    carrinho.push({ ...produto, preco: 8000 });
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  alert(`✅ Produto "${produto.nome}" adicionado ao carrinho!`);
}


// ========= Retorna o carrinho completo ============
function carregarCarrinho() {
  return JSON.parse(localStorage.getItem('carrinho')) || [];
}


// ========= Exibe carrinho em HTML =================
// Só use essa função em páginas de listagem (ex: carrinho.html)
function exibirCarrinho(containerId) {
  const carrinho = carregarCarrinho();
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn("Elemento do carrinho não encontrado.");
    return;
  }

  if (carrinho.length === 0) {
    container.innerHTML = "<p>Seu carrinho está vazio.</p>";
    return;
  }

  let total = 0;

  container.innerHTML = carrinho.map(item => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    return `
      <div class="item-carrinho">
        <p><strong>${item.nome}</strong></p>
        <p>Quantidade: ${item.quantidade}</p>
        <p>Preço unitário: R$ ${item.preco.toFixed(2)}</p>
        <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
        <hr>
      </div>
    `;
  }).join('') + `<p><strong>Total: R$ ${total.toFixed(2)}</strong></p>`;
}
