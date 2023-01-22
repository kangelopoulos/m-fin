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
        xmlStr += chunk;
      });
      readStream.on('end', () => {
        const parser = new convert.Parser({explicitArray : false})
        parser.parseString(xmlStr, function (err, results) {
          res.locals.data = results.root.row;
          console.log(res.locals.data[0]);
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
};

uploadController.parseData = async (req, res, next) => {
  try {
    const accounts = {};
    const branches = {};
    const individuals = {};
    const payments = {};

    for(let i = 0; i < res.locals.data.length; i++){
      if(!individuals[res.locals.data[i].Employee.DunkinId]){
        individuals[res.locals.data[i].Employee.DunkinId] = {
          first_name: res.locals.data[i].Employee.FirstName,
          last_name: res.locals.data[i].Employee.LastName,
          phone: '+15121231111',
          dob: res.locals.data[i].Employee.DOB,
          metadata: {
            dunkin_id: res.locals.data[i].Employee.DunkinId
          }
        }
      }
      if(!branches[res.locals.data[i].Payor.DunkinId]){
        branches[res.locals.data[i].Payor.DunkinId] = {
          corporation: {
            
          }
        }
      }
    }

  } catch (err) {
    console.log(err);   
  }
};

uploadController.createCSVFiles = async (req, res, next) => {
  try {
    const data = [...res.locals.data];
    const today = new Date();
    await helper.createCSV1(data, `./tempStorage/${today.toISOString()}-payouts-per-source`);
    await helper.createCSV2(data, `./tempStorage/${today.toISOString()}-payouts-per-branch`);
    await helper.createCSV3(data, `./tempStorage/${today.toISOString()}-all-payouts`);
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
