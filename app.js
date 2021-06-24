// importando express
const express = require('express');

// definindo nosso server
const app = express();

/**
 * configurando rotas [endereco, callback(req, res)]
 * req - http://expressjs.com/en/api.html#req
 * res - http://expressjs.com/en/api.html#res
 */
app.get('/', (req, res) => {
  // res.status(200).send('Hello from the server side!');
  res
    .status(200)
    .json({
      message: 'Hello from the server side!',
      app: 'Natours!',
    });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint...');
})

// isolando a porta
const port = 3000;
// iniciando o servidor (porta, callback)
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

