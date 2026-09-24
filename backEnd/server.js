const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const cors = require('cors');
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use('/frontEnd', express.static(path.join(__dirname, '..', 'frontEnd')));
const PORTA = 3000;

const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
);

// Função que confirma quem é o usuário, a partir do token enviado pelo navegador
async function identificarUsuario(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ erro: 'Token não fornecido' });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !data.user) {
        return res.status(401).json({ erro: 'Token inválido' });
    }

    req.userId = data.user.id;
    next();
}

app.get('/api/dashboard', identificarUsuario, async function (req, res) {
    const userId = req.userId;

    const { data: contas } = await supabaseAdmin.from('contas').select('*').eq('user_id', userId);
    const { data: cartoes } = await supabaseAdmin.from('cartoes').select('*').eq('user_id', userId);
    const { data: dividas } = await supabaseAdmin.from('dividas').select('*').eq('user_id', userId);
    const { data: emprestimos } = await supabaseAdmin.from('emprestimos').select('*').eq('user_id', userId);

    res.json({ contas, cartoes, dividas, emprestimos });
});

app.listen(PORTA, function () {
    console.log('Servidor rodando em http://localhost:' + PORTA);
});