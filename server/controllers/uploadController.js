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
        log: `Error in uploadController.post: ${err}`,
        status: 500,
        message: 'Cannot get !'
      }); 
    }
  }
}

uploadController.createCSVFiles = async (req, res, next) => {

}

uploadController.callMethodAPI = async (req, res, next) =>{

}

uploadController.addToS3 = async (req, res, next) => {

}

module.exports = uploadController;
