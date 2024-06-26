const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDatabase = require('./config/connectDatabase');
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });


const app = express();

const options = {
    key: fs.readFileSync(path.join(__dirname, 'private-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certificate.pem')),
    secureProtocol: 'TLSv1_2_method' 
};

const products = require('./routes/product');
const orders = require('./routes/order');

connectDatabase();

app.use(express.json());
app.use(cors());
app.use('/api/v1/', products);
app.use('/api/v1/', orders);

http.createServer(options, app).listen(process.env.PORT, () => {
    console.log(`HTTP Server listening to port ${process.env.PORT} in ${process.env.NODE_ENV}`);
});
