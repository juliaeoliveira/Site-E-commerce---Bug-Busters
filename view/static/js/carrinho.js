
        // Função para carregar os itens do carrinho
        function carregarCarrinho() {
            return JSON.parse(localStorage.getItem('carrinho')) || [];
        }

        // Função para atualizar o carrinho
        function atualizarCarrinho() {
            const carrinho = carregarCarrinho();
            const containerCarrinho = document.getElementById('itens-carrinho');
            const subtotalElement = document.getElementById('sub-total');

            if (carrinho.length === 0) {
                containerCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";
                subtotalElement.textContent = 'R$ 0.00';
                return;
            }

            let subtotal = 0;
            containerCarrinho.innerHTML = carrinho.map(item => {
                    // garante que preco é número
                    const precoNum = (typeof item.preco === 'number') ? item.preco : parseFloat(String(item.preco).replace(',', '.')) || 0;
                    const itemSubtotal = precoNum * (Number(item.quantidade) || 0);
                    subtotal += itemSubtotal;

                return `
                    <div class="produto-item">
                        <input class="checkbox-item" type="checkbox" checked /> 
                        <img class="foto" src="${item.imagem}" alt="${item.nome}" />
                        <div class="texto">
                            <h3>${item.nome}</h3>
                            <p class="colecao">Coleção: ${item.colecao}</p>
                            <p class="estoque">${item.estoque}</p>
                            <p class="tamanho">Tamanho: ${item.tamanho}</p>
                            <p class="valor">R$ ${precoNum.toFixed(2)}</p>
                            <select class="quantidade" data-id="${item.id}">
                                <option value="1" ${item.quantidade === 1 ? 'selected' : ''}>1</option>
                                <option value="2" ${item.quantidade === 2 ? 'selected' : ''}>2</option>
                            </select>
                        </div>
                    </div>
                `;
            }).join('');

            subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
        }

        // Função para atualizar a quantidade e recalcular o subtotal
        document.addEventListener('change', function(event) {
            if (event.target.classList.contains('quantidade')) {
                const carrinho = carregarCarrinho();
                const itemId = event.target.dataset.id;
                const novaQuantidade = parseInt(event.target.value, 10);
                
                const itemIndex = carrinho.findIndex(item => item.id == itemId);
                if (itemIndex !== -1) {
                    carrinho[itemIndex].quantidade = novaQuantidade;
                    localStorage.setItem('carrinho', JSON.stringify(carrinho));
                }

                atualizarCarrinho();
            }
        });

        // Atualiza o carrinho ao carregar a página
        function adicionarAoCarrinho(produto) {
    const carrinho = carregarCarrinho();
    const existente = carrinho.find(item => item.id === produto.id);

    if (existente) {
        existente.quantidade += 1;
    } else {
        produto.quantidade = 1;
        carrinho.push(produto);
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}
atualizarCarrinho();
 