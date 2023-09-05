const swaggerJsdoc = require('swagger-jsdoc');

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
  apis: [`Routes/**.js`], 
};

const specs = swaggerJsdoc(options);

module.exports = specs;