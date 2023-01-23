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
    const sources = {};
    const destinations = {}
    const branches = {};
    const individuals = {};

    for(let i = 0; i < res.locals.data.length; i++){
      if(!individuals[res.locals.data[i].Employee.DunkinId]){
        individuals[res.locals.data[i].Employee.DunkinId] = {
          type: 'individual',
          individual: {
            first_name: res.locals.data[i].Employee.FirstName,
            last_name: res.locals.data[i].Employee.LastName,
            phone: '+15121231111',
            email: null,
            dob: res.locals.data[i].Employee.DOB,
          },
          address: {},
          metadata: {
            dunkin_id: res.locals.data[i].Employee.DunkinId
          }
        }
      }
      if(!branches[res.locals.data[i].Payor.DunkinId]){
        branches[res.locals.data[i].Payor.DunkinId] = {
          type: 'llc',
          corporation: {
            name: res.locals.data[i].Payor.Name,
            dba: res.locals.data[i].Payor.DBA,
            ein: res.locals.data[i].Payor.EIN,
            owners: [],
          },
          address: {
            line1: res.locals.data[i].Payor.Address.Line1,
            line2: null,
            city: res.locals.data[i].Payor.Address.City,
            state: res.locals.data[i].Payor.Address.State,
            zip: res.locals.data[i].Payor.Address.Zip
          }, 
          metadata: {
            DunkinBranch: res.locals.data[i].Employee.DunkinBranch,
            DunkinId: res.locals.data[i].Payor.DunkinId
          }
        }
      }
      if(!sources[res.locals.data[i].Payor.AccountNumber]){
        sources[res.locals.data[i].Payor.DunkinId] = {
          holder_id: null,
          ach: {
            routing: res.locals.data[i].Payor.ABARouting,
            number: res.locals.data[i].Payor.AccountNumber,
            type: 'checking'
          }
        }
      }
      if(!destinations[res.locals.data[i].Payee.PlaidId]){
        destinations[res.locals.data[i].Payee.PlaidId] = {
          holder_id: null,
          liability: {
            plaid_id: res.locals.data[i].Payee.PlaidId,
            account_number: res.locals.data[i].Payee.LoanAccountNumber,
          }
        };
      }
    }
    res.locals.destinations = destinations;
    res.locals.sources = sources;
    res.locals.individuals = individuals;
    res.locals.branches = branches;
  } catch (err) {
    console.log(err);   
  }
};

uploadController.createCSVFiles = async (req, res, next) => {
  try {
    const today = new Date();
    await helper.createCSVs(res.locals.data, `./tempStorage/${today.toISOString()}-payouts-per-source`,`./tempStorage/${today.toISOString()}-payouts-per-branch`,`./tempStorage/${today.toISOString()}-all-payouts`);
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
