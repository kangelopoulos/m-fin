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
          res.locals.data = results.root.row;
        });
        console.log(results.root.row[0]);
        return next();
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
    console.log('here');
    const today = new Date();
    console.log('here');
    fs.writeFile(`./tempStorage/${today}-payouts-per-source`, 'DunkinId,ABARouting,AccountNumber,Name,DBA,Address,Amount', (err) => console.error(err));
    fs.writeFile(`./tempStorage/${today}-payouts-per-branch`, 'DunkinBranch,Amount', (err) => console.error(err));
    fs.writeFile(`./tempStorage/${today}-all-payouts`, 'DunkinId,DunkinBranch,FirstName,LastName,DOB,PhoneNumber,DunkinId,ABARoutingNumber,AccountNumber,Name,DBA,EIN,AddressLine1,City,State,Zip,PlaidId,LoanAccountNumber,Amount,Status', (err) => console.error(err));
    return next();
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
