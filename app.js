const express = require('express');
const swaggerDocRoutes = require("./Routes/swaggerDocRoutes");
const authRoute = require("./Routes/AuthRoute");
const todoRoute = require("./Routes/TodoRoutes");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Express API for JSONPlaceholder',
      version: '1.0.0',
      description:
        'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'JSONPlaceholder',
        url: 'https://jsonplaceholder.typicode.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  };

const options = {
  swaggerDefinition,
// //   customCss: '.swagger-ui .topbar { display: none }',
//   explorer: true,
//   // Paths to files containing OpenAPI definitions
  apis: ['./Routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
const app = express();
app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/",authRoute)
app.use("/",todoRoute)
app.use("/",swaggerDocRoutes)


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec,options));

module.exports = app