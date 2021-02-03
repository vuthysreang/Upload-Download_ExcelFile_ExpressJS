const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const connectDB = require('./config/database/connectionDB');
const tutorialRouter = require('./src/routers/tutorialExcel_routes');

const app = express();

global.__basedir = __dirname + "/..";


/* === Configuration ==== */

// Load config
dotenv.config({ path: './config/config.env' });

// Log request
app.use(morgan('tiny'));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// mongodb connection
connectDB();

// Listen Server
const PORT = process.env.PORT || 8000
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`)
);



// Routes
app.use('/', tutorialRouter);
