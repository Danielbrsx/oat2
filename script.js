document.getElementById('cnpj-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const cnpj = document.getElementById('cnpj').value.replace(/\D/g, '');
    const resultadoDiv = document.getElementById('resultado');

    if (cnpj.length !== 14) {
        resultadoDiv.innerHTML = '<div class="alert alert-danger">CNPJ inválido! Deve conter 14 dígitos.</div>';
        resultadoDiv.style.display = 'block';
        return;
    }

    try {
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
        console.log('Response Status:', response.status);

        if (!response.ok) throw new Error('CNPJ não encontrado');

        const data = await response.json();
        console.log('Dados retornados da API:', data);

        if (!data || !data.razao_social) {
            throw new Error('Dados da empresa não encontrados');
        }

        resultadoDiv.innerHTML = `
            <h5>Resultados:</h5>
            <p><strong>Nome da Empresa:</strong> ${data.razao_social}</p>
            <p><strong>Nome Fantasia:</strong> ${data.nome_fantasia || 'N/A'}</p>
            <p><strong>Bairro:</strong> ${data.bairro || 'N/A'}</p>
            <p><strong>CEP:</strong> ${data.cep || 'N/A'}</p>
            <p><strong>Atividade Principal:</strong> ${data.cnae_fiscal_descricao}</p>
            <p><strong>Status:</strong> ${data.descricao_situacao_cadastral}</p>
            <p><strong>Data de Início de Atividade:</strong> ${data.data_inicio_atividade}</p>
            <p><strong>Logradouro:</strong> ${data.descricao_tipo_de_logradouro} ${data.logradouro}, ${data.numero} ${data.complemento}</p>
            <p><strong>Telefone:</strong> ${data.ddd_telefone_1 ? `(${data.ddd_telefone_1.slice(0, 2)}) ${data.ddd_telefone_1.slice(2)}` : 'N/A'}</p>
        `;
    } catch (error) {
        resultadoDiv.innerHTML = '<div class="alert alert-danger">Erro: ' + error.message + '</div>';
    }

    resultadoDiv.style.display = 'block';
});
