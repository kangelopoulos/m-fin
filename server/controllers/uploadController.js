const db = require('../models/postgres');
const convert = require("xml2js"); 
const worker = require('node:worker_threads');
const fs = require('fs');
const helper = require('../helpers/csv');

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
    const data = [...res.locals.data];
    console.log(data, 'data');
    const today = new Date();
    fs.writeFile(`./tempStorage/${today.toISOString()}-payouts-per-source`, 'DunkinId,Amount\n', (err) => console.error(err));
    helper.createCSV1(data, `./tempStorage/${today.toISOString()}-payouts-per-source`);

    fs.writeFile(`./tempStorage/${today.toISOString()}-payouts-per-branch`, 'DunkinBranch,Amount\n', (err) => console.error(err));
    helper.createCSV2(data, `./tempStorage/${today.toISOString()}-payouts-per-branch`);

    fs.writeFile(`./tempStorage/${today.toISOString()}-all-payouts`, 'DunkinId,DunkinBranch,FirstName,LastName,DOB,PhoneNumber,DunkinId,ABARoutingNumber,AccountNumber,Name,DBA,EIN,AddressLine1,City,State,Zip,PlaidId,LoanAccountNumber,Amount,Status]\n', (err) => console.error(err));
    helper.createCSV3(data, `./tempStorage/${today.toISOString()}-all-payouts`);

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
