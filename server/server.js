// require('dotenv').config();
const express = require('express');
const path = require('path');
const PORT = 3000;
const fileUpload = require('express-fileupload');
const uploadRouter = require('./routes/uploadRouter.js');

// create express ap
const app = express();

/**
 * Handle parsing request body
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

/**
 * Routes
 */
app.use('/upload', uploadRouter);

// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../build')));
  app.get('/', (req, res) => {
    return res
      .status(200)
      .sendFile(path.join(__dirname, '../build/index/html'));
  });
}

/**
 * Handle faulty requests
 */
app.use((req, res) => res.sendStatus(404));

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * shh, I'm listening to port 3000
 */
app.listen(PORT, () => console.log(`Server now running on port ${PORT}`));

module.exports = app;
