// importando express
const { Console } = require('console');
const express = require('express');
const fs = require('fs');

// definindo nosso server
const app = express();

// middleware
app.use(express.json());

/**
 * configurando rotas [endereco, callback(req, res)]
 * req - http://expressjs.com/en/api.html#req
 * res - http://expressjs.com/en/api.html#res
 */
// app.get('/', (req, res) => {
//   // res.status(200).send('Hello from the server side!');
//   res
//     .status(200)
//     .json({
//       message: 'Hello from the server side!',
//       app: 'Natours!',
//     });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// })

// guarda os dados uma unica vez
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({
      status: 200,
      results: tours.length,
      data: {
        tours
      }
    });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({
    id: newId
  }, req.body);

  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res
      .status(201)
      .json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
  });
  // res.send('Done');
})

// isolando a porta
const port = 3000;
// iniciando o servidor (porta, callback)
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

