// importando express
const express = require('express');
const fs = require('fs');

// definindo nosso server
const app = express();

// guarda os dados uma unica vez
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// middleware
app.use(express.json());

const getAllTours = (req, res) => {
  res
    .status(200)
    .json({
      status: 200,
      results: tours.length,
      data: {
        tours
      }
    });
}

const getTour = (req, res) => {

  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    })
  }

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    }
  })
}

const createTour = (req, res) => {
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
}

const updateTour = (req, res) => {
  if (req.params.id * 1 < tours.length) {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here>'
      }
    });
  } else {
    res.status(404).json({
      status: 'fail',
      message: '<Tour doenst exists>'
    })
  }
}

const deleteTour = (req, res) => {
  if (req.params.id * 1 < tours.length) {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } else {
    res.status(404).json({
      status: 'fail',
      message: '<Tour doenst exists>',
    })
  }

}

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour)

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)


// isolando a porta
const port = 3000;
// iniciando o servidor (porta, callback)
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

