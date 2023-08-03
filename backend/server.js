const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const { testConnection } = require('./models/conn')

const carsRoutes = require('./router/carsRoutes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = http.createServer(app); 
const port = 8000;

const db = require('./models');
db.sequelize.sync();
testConnection();


app.use(cors());
app.use('/api/', carsRoutes);


server.listen(port,'0.0.0.0', () => { 
    console.log(`Server is running on port ${port} and Local IP is ${server.address().address}`);
}); 