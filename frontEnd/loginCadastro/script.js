
const SUPABASE_URL = 'https://xlfpedrkvtbyoatdlroz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_3iva0sy1DEnRRBcLiJJXkw_jNRKi0L7';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.querySelector('form');
const inputEmail = document.getElementById('email');
const inputSenha = document.getElementById('senha');
const checkboxLembrar = document.getElementById('lembrar');

const linkCriarConta = document.getElementById('linkCriarConta');
const formCriarConta = document.getElementById('formCriarConta');
const btnCriarConta = document.getElementById('btnCriarConta');

 
// Mostra/esconde o formulário de criar conta
linkCriarConta.addEventListener('click', function (evento) {
    evento.preventDefault();
    formCriarConta.style.display = 'block';
});





// carregar a pagina verificar se ja tem email
 const emailSalvo = localStorage.getItem('emailLembrado');
      if (emailSalvo) {
    inputEmail.value = emailSalvo;
    checkboxLembrar.checked = true;
    }


form.addEventListener('submit', async function (evento) {
    evento.preventDefault(); // impede a página de recarregar

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;


      if (email === '' || senha === '') {
        alert('Preencha e-mail e senha!');
        return;
    }

    if (!email.includes('@')) {
        alert('Digite um e-mail válido!');
        return;
    }

         const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: senha,
    });

    if (error) {
        alert('Erro ao entrar: ' + error.message);
        return;
    }


    // Salva ou remove o e-mail lembrado, conforme o checkbox
    if (checkboxLembrar.checked) {
        localStorage.setItem('emailLembrado', email);
    } else {
        localStorage.removeItem('emailLembrado');
    }
       

        inputSenha.value = '';
    window.location.href = '../dashBoard/dashboard.html';
    
});

      // Cria a conta de verdade no Supabase
btnCriarConta.addEventListener('click', async function () {
    const novoEmail = document.getElementById('novoEmail').value;
    const novaSenha = document.getElementById('novaSenha').value;

    if (novoEmail === '' || novaSenha === '') {
        alert('Preencha e-mail e senha para criar a conta!');
        return;
    }

    let { data, error } = await supabaseClient.auth.signUp({
        email: novoEmail,
        password: novaSenha,
    });

    if (error) {
        alert('E-mail ou senha incorretos.');
        return;
    }

    alert('Conta criada! Agora é só entrar com seu e-mail e senha.');
    formCriarConta.style.display = 'none';

    document.getElementById('novoEmail').value = '';
    document.getElementById('novaSenha').value = '';
});

  