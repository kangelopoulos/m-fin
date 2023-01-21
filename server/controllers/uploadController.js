const db = require('../models/postgres');
const convert = require("xml2js"); 
const fs = require('fs');

const uploadController = {};

uploadController.get = async (req, res, next) => {
  try {
    const { limit, offset } = req.params;
    const vals = [limit, offset];
    const q = `SELECT * FROM public.uploads ORDER BY date LIMIT $1 OFFSET $2`;
    const { rows } = await db.query(q, vals);
    console.log(rows);
    res.locals = rows;
    return next();
  } catch (err) {
    return next({
      log: `Error in uploadController.get: ${err}`,
      status: 500,
      message: 'Cannot get !'
    }); 
  }
};

uploadController.convert = async (req, res, next) =>{
  if(!req.files){
    return next();
  } else { 
    try {
      console.log(req.files);
      const readStream = fs.createReadStream(req.files.file.tempFilePath);
      let xmlStr = '';
      readStream.on('data', (chunk) => {
        console.log(chunk);
        xmlStr += chunk;
      });
      readStream.on('end', () => {
        const parser = new convert.Parser({explicitArray : false})
        parser.parseString(xmlStr, function (err, results) {
          let data = results;
          console.log("results",data.root.row);
        });
        res.locals = data.root.row;
      });
      
    } catch(err) { 
      return next({
        log: `Error in uploadController.convert: ${err}`,
        status: 500,
        message: 'An error occured.'
      }); 
    }
  }
}

uploadController.createCSVFiles = async (req, res, next) => {
  try {

  } catch (err) {
    return next({
      log: `Error in uploadController.createCSVFiles: ${err}`,
      status: 500,
      message: 'An error occured.'
    }); 
  }
};

uploadController.callMethodAPI = async (req, res, next) =>{
  try {

  } catch (err) {
    return next({
      log: `Error in uploadController.callMethodAPI: ${err}`,
      status: 500,
      message: 'An error occured.'
    }); 
  }
};

uploadController.addToS3 = async (req, res, next) => {
  try {

  } catch (err) {
    return next({
      log: `Error in uploadController.addToS3: ${err}`,
      status: 500,
      message: 'An error occured.'
    }); 
  }
};

uploadController.deleteLocalFiles = async (req, res, next) => {
  try {

  } catch (err) {
    return next({
      log: `Error in uploadController.deleteLocalFiles: ${err}`,
      status: 500,
      message: 'An error occured.'
    }); 
  }
};

module.exports = uploadController;
