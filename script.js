document.getElementById('cep-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    const ddd = document.getElementById('ddd').value.replace(/\D/g, '');
    const resultadoDiv = document.getElementById('resultado');

    if (cep.length !== 8 || ddd.length < 2) {
        resultadoDiv.innerHTML = '<div class="alert alert-danger">CEP ou DDD inválido!</div>';
        resultadoDiv.style.display = 'block';
        return;
    }

    try {
        // Busca informações do CEP
        const cepResponse = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
        if (!cepResponse.ok) throw new Error('CEP não encontrado');
        
        const cepData = await cepResponse.json();

        // Busca informações do DDD
        const dddResponse = await fetch(`https://brasilapi.com.br/api/ddd/v1/${ddd}`);
        if (!dddResponse.ok) throw new Error('DDD não encontrado');
        
        const dddData = await dddResponse.json();

        resultadoDiv.innerHTML = `
            <h5>Resultados:</h5>
            <p><strong>Rua:</strong> ${cepData.street}</p>
            <p><strong>Bairro:</strong> ${cepData.neighborhood}</p>
            <p><strong>Cidade:</strong> ${cepData.city}</p>
            <p><strong>Estado:</strong> ${cepData.state}</p>
            <hr>
            <p><strong>DDD:</strong> ${dddData.ddd}</p>
            <p><strong>Cidade:</strong> ${dddData.city}</p>
            <p><strong>Estado:</strong> ${dddData.state}</p>
        `;
    } catch (error) {
        resultadoDiv.innerHTML = '<div class="alert alert-danger">Erro: ' + error.message + '</div>';
    }

    resultadoDiv.style.display = 'block';
});
