// Carrega o carrinho do localStorage
function carregarCarrinho() {
    return JSON.parse(localStorage.getItem('carrinho')) || [];
}

// Salva o carrinho atualizado
function salvarCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Atualiza a visualização do carrinho
function atualizarCarrinho() {
    const carrinho = carregarCarrinho();
    const containerCarrinho = document.getElementById('itens-carrinho');
    const subtotalElement = document.getElementById('sub-total');

    if (!containerCarrinho) return; // segurança

    if (carrinho.length === 0) {
        containerCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";
        subtotalElement.textContent = 'R$ 0,00';
        return;
    }

    let subtotal = 0;
    containerCarrinho.innerHTML = carrinho.map((item, index) => {
        const itemSubtotal = item.preco * item.quantidade;
        subtotal += itemSubtotal;

        return `
        <div class="produto-item" data-index="${index}">
            <input class="checkbox-item" type="checkbox" checked /> 
            <img class="foto" src="${item.imagem}" alt="${item.nome}" />
            <div class="texto">
                <h3>${item.nome}</h3>
                <img class="lixeira" src="/static/img_home/5366933-removebg-preview.png" alt="Remover" title="Remover" onclick="removerItem(${index})">
                <p class="colecao">${item.colecao}</p>
                <p class="estoque">${item.estoque}</p>
                <label>Tamanho:</label>
                <select class="tamanho">
                    <option ${item.tamanho === 'PP' ? 'selected' : ''}>PP</option>
                    <option ${item.tamanho === 'P' ? 'selected' : ''}>P</option>
                    <option ${item.tamanho === 'M' ? 'selected' : ''}>M</option>
                    <option ${item.tamanho === 'G' ? 'selected' : ''}>G</option>
                </select>
                <br>
                <label>Quantidade:</label>
                <input type="number" class="quantia" value="${item.quantidade}" min="1" max="10" onchange="alterarQuantidade(${index}, this.value)">
                <p class="valor">R$ ${item.preco.toFixed(2)}</p>
            </div>
        </div>`;
    }).join('');

    subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
}

function removerItem(index) {
    let carrinho = carregarCarrinho();
    carrinho.splice(index, 1);
    salvarCarrinho(carrinho);
    atualizarCarrinho();
}

function alterarQuantidade(index, novaQuantidade) {
    let carrinho = carregarCarrinho();
    carrinho[index].quantidade = parseInt(novaQuantidade);
    salvarCarrinho(carrinho);
    atualizarCarrinho();
}

// Executa quando a página do carrinho é carregada
document.addEventListener('DOMContentLoaded', atualizarCarrinho);
