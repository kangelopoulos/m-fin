const express = require('express');
const uploadController = require('../controllers/uploadController');
const router = express.Router();

router.get(
  '/',
  uploadController.get,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

router.post(
  '/',
  uploadController.convert,
  uploadController.createCSVFiles,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

module.exports = router;