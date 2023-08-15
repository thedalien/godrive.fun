const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const { testConnection } = require('./models/conn')
const os = require('os');


const carsRoutes = require('./router/carsRoutes');
const userRoutes = require('./router/userRoutes');
const adminRoutes = require('./router/adminRoutes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const server = http.createServer(app); 
const port = 8000;

const db = require('./models');
db.sequelize.sync({ force: true });
testConnection();


app.use(cors());
app.use('/api/car', carsRoutes);
app.use('/api/user', userRoutes);
// app.use('/api/admin', adminRoutes);


server.listen(port,'0.0.0.0', () => { 
    console.log(`Server is running on port ${port} and Local IP is ${server.address().address}`);
}); 


// setInterval(() => {
//     const used = process.memoryUsage();
//     const messages = [];
    
//     let totalMemoryUsedByProcess = 0;
//     for (let key in used) {
//       const memoryInMB = Math.round(used[key] / 1024 / 1024 * 100) / 100;
//       totalMemoryUsedByProcess += memoryInMB;
//       messages.push(`${key}: ${memoryInMB} MB`);
//     }
  
//     messages.push(`Total memory used by process: ${Math.round(totalMemoryUsedByProcess * 100) / 100} MB`);
  
//     console.log(messages.join(', '));
//   }, 1000); // Logging every second
