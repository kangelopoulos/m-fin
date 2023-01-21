const db = require('../models/postgres');
const fs = require('fs');
const convert = require('xml-js');
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

uploadController.post = async (req, res, next) =>{
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
        const data = convert.xml2js(xmlStr, { compact:true, spaces:4 });
        // const procData = data.root.row.map(row => {
      
        // })
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


module.exports = uploadController;
