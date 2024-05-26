const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const { urlencoded, json } = require('express');

const app = express();
const port = 3005;
const prefix = '/v1/restaurante';

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(cors());

// Crear un nuevo enrutador para todas las rutas en routerApi
const restauranteRouter = express.Router();
routerApi(restauranteRouter);

// Aplicar el prefijo a todas las rutas en el nuevo enrutador
app.use(prefix, restauranteRouter);


app.get("/", (req, res) => {
  const htmlResponse = `
    <html>
      <head>
        <title>Endpoints Restaurante</title>
      </head>
      <body>
        <h1></h1>
      </body>
    </html>
  `;
  res.send(htmlResponse);
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
