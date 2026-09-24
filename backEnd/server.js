const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const cors = require('cors');
const express = require('express');
const dashboardRoutes = require('./routes/dashboard');

const app = express();
app.use(cors());
app.use('/frontEnd', express.static(path.join(__dirname, '..', 'frontEnd')));
app.use('/api', dashboardRoutes);

app.get('/', function (req, res) {
    res.redirect('/frontEnd/loginCadastro/index.html');
});

const PORTA = 3000;

app.listen(PORTA, function () {
    console.log('Servidor rodando em http://localhost:' + PORTA);
});