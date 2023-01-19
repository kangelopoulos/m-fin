const express = require('express');
const router = express.Router();

router.get(
  '/',
  (req, res) => {
    return res.status(200).json(res.locals);
  }
)

router.post(
  '/',
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

module.exports = router;