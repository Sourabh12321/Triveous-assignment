const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

// Define the absolute path to the directory containing your route files.
const routesDir = path.resolve(__dirname, 'routes');
const options = {
  swaggerDefinition: {
    openapi: '3.0.0', 
    info: {
      title: 'TRIVEOUS-ASSIGNMENT',
      version: '1.0.0',
      description: 'Ecommerce-API',
    },
    servers:[
      {
      url:"https://triveous-assignment-dh5v.onrender.com"
      }
    ]
  },
  apis: [`${routesDir}/*.js`], 
};

const specs = swaggerJsdoc(options);

module.exports = specs;