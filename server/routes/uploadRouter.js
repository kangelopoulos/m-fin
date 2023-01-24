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
  uploadController.store,
  (req, res) => {
    res.status(201);
    return res.send('working on it');
  },

);

module.exports = router;