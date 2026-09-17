
const SUPABASE_URL = 'https://xlfpedrkvtbyoatdlroz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_3iva0sy1DEnRRBcLiJJXkw_jNRKi0L7';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.querySelector('form');
const inputEmail = document.getElementById('email');
const inputSenha = document.getElementById('senha');
const checkboxLembrar = document.getElementById('lembrar');


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
       

     inputSenha.value = ''; // limpa a senha por segurança
    alert('Login realizado com sucesso!');
    console.log('Email digitado:', email);
    console.log('Senha digitada:', senha);
});

  