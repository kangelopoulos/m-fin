const express = require('express');
const methodController = require('../controllers/uploadController');
const router = express.Router();

router.get(
  '/', 
  (req, res) => {
    return res.status(200).json(res.locals);
  }
)

module.exports = router;
