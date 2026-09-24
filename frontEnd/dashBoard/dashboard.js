const SUPABASE_URL = 'https://xlfpedrkvtbyoatdlroz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_3iva0sy1DEnRRBcLiJJXkw_jNRKi0L7';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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

    document.getElementById('listaContas').innerHTML = dados.contas
        .map(c => `<li>${c.banco}: R$ ${c.saldo}</li>`)
        .join('');

    document.getElementById('listaCartoes').innerHTML = dados.cartoes
        .map(c => `<li>${c.banco}: fatura R$ ${c.fatura_atual}</li>`)
        .join('');

    document.getElementById('listaDividas').innerHTML = dados.dividas
        .map(d => `<li>${d.banco} (${d.tipo}): R$ ${d.valor}</li>`)
        .join('');
}

carregarDashboard();

document.getElementById('btnSair').addEventListener('click', async function () {
    await supabaseClient.auth.signOut();
    window.location.href = '/frontEnd/loginCadastro/index.html';
});