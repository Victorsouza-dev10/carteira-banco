const SUPABASE_URL = 'https://xlfpedrkvtbyoatdlroz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_3iva0sy1DEnRRBcLiJJXkw_jNRKi0L7';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function formatarReal(valor) {
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function montarLista(idLista, itens, montarItem, textoVazio) {
    const lista = document.getElementById(idLista);

    if (itens.length === 0) {
        lista.innerHTML = `<li class="vazio">${textoVazio}</li>`;
        return;
    }

    lista.innerHTML = itens.map(montarItem).join('');
}

function montarGrafico(contas) {
    const cores = ['#C9962C', '#E3C27A', '#8A6A22', '#A89F8D', '#5E5846', '#D8CDB0'];

    new Chart(document.getElementById('graficoBancos'), {
        type: 'doughnut',
        data: {
            labels: contas.map(c => c.banco),
            datasets: [{
                data: contas.map(c => Number(c.saldo)),
                backgroundColor: cores,
                borderColor: '#171613',
                borderWidth: 3
            }]
        },
        options: {
            maintainAspectRatio: false,
            cutout: '62%',
            plugins: {
                legend: { position: 'right', labels: { color: '#F2EEE4', padding: 14 } },
                tooltip: {
                    callbacks: {
                        label: ctx => ' ' + formatarReal(ctx.parsed)
                    }
                }
            }
        }
    });
}

async function carregarDashboard() {
    const { data } = await supabaseClient.auth.getSession();

    if (!data.session) {
        window.location.href = '/frontEnd/loginCadastro/index.html';
        return;
    }

    const token = data.session.access_token;

    const resposta = await fetch('http://localhost:3000/api/dashboard', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const dados = await resposta.json();

    console.log('Dados recebidos do servidor:', dados);

    // Saldo total (soma das contas)
    const saldoTotal = dados.contas.reduce((total, c) => total + Number(c.saldo), 0);
    document.getElementById('saldoTotal').textContent = formatarReal(saldoTotal);

    // Listas
    montarLista(
        'listaContas',
        dados.contas,
        c => `<li>${c.banco}: ${formatarReal(c.saldo)}</li>`,
        'Nenhuma conta cadastrada ainda'
    );

    montarLista(
        'listaCartoes',
        dados.cartoes,
        c => `<li>${c.banco}: fatura ${formatarReal(c.fatura_atual)}</li>`,
        'Nenhum cartão cadastrado ainda'
    );

    montarLista(
        'listaDividas',
        dados.dividas,
        d => `<li>${d.banco} (${d.tipo}): ${formatarReal(d.valor)}</li>`,
        'Nenhuma dívida cadastrada ainda'
    );

    // Gráfico (só se houver contas)
    if (dados.contas.length > 0) {
        montarGrafico(dados.contas);
    }
}

carregarDashboard();

document.getElementById('btnSair').addEventListener('click', async function () {
    await supabaseClient.auth.signOut();
    window.location.href = '/frontEnd/loginCadastro/index.html';
});