require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const diseasesRoutes = require('./routes/diseasesroutes');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');
const newsRoutes = require('./routes/newsRoutes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const sequelize = require('./config/database');
const User = require('./models/user');
const authMiddleware = require('./middleware/authMiddleware');
const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());

const corsOptions = {
  origin: ['https://backend-qpweor334a-et.a.run.app'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Diseases Predictor API',
      version: '1.0.0',
      description: 'API Documentation for Diseases Predictor'
    },
    servers: [
      {
        url: 'https://backend-qpweor334a-et.a.run.app',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/auth', authRoutes);
app.use('/diseases', authMiddleware);
app.use('/diseases', diseasesRoutes);
app.use('/users', usersRoutes);
app.use('/news', newsRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the Diseases Predictor API');
});

sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
