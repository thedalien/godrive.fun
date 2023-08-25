const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const { testConnection } = require('./models/conn')
const os = require('os');
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const enviroment = process.env.ENV || 'development';
console.log(enviroment);

const carsRoutes = require('./router/carsRoutes');
const userRoutes = require('./router/userRoutes');
const bookRoutes = require('./router/bookRoutes');
const adminRoutes = require('./router/adminRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/car', carsRoutes);
app.use('/api/user', userRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/admin', adminRoutes);

const db = require('./models');
// db.sequelize.sync({ force: true });
db.sequelize.sync();
testConnection();

if (enviroment === 'localhost') {
    const server = http.createServer(app); 
    const port = 8000;
    server.listen(port, '0.0.0.0', () => { 
        console.log(`Server is running on port ${port} and Local IP is ${server.address().address}`);
    });
}

if (enviroment == 'development') {

    const privateKey = fs.readFileSync('/etc/letsencrypt/live/dalien.online/privkey.pem', 'utf8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/dalien.online/fullchain.pem', 'utf8');

    const credentials = { key: privateKey, cert: certificate };

    const httpsServer = https.createServer(credentials, app);

    httpsServer.listen(443, () => {
        console.log('HTTPS Server running on port 443');
    });
}



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
