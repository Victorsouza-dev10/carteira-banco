const express = require('express');
const router = express.Router();
const supabaseAdmin = require('../supabase');
const identificarUsuario = require('../middleware/auth');

router.get('/dashboard', identificarUsuario, async function (req, res) {
    const userId = req.userId;

    const { data: contas } = await supabaseAdmin.from('contas').select('*').eq('user_id', userId);
    const { data: cartoes } = await supabaseAdmin.from('cartoes').select('*').eq('user_id', userId);
    const { data: dividas } = await supabaseAdmin.from('dividas').select('*').eq('user_id', userId);
    const { data: emprestimos } = await supabaseAdmin.from('emprestimos').select('*').eq('user_id', userId);

    res.json({ contas, cartoes, dividas, emprestimos });
});

module.exports = router;