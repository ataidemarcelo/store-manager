const express = require('express');
require('express-async-errors');

const routers = require('./routers');

const app = express();

app.use(express.json());
app.use(routers);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação

app.use((error, req, res, _next) => {
  console.log('####################################');
  console.error(error.stack);

  res.status(500).send({ message: 'Internal server error!' });
});

module.exports = app;
