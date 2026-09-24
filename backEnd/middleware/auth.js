const supabaseAdmin = require('../supabase');

// Confirma quem é o usuário, a partir do token enviado pelo navegador
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

module.exports = identificarUsuario;