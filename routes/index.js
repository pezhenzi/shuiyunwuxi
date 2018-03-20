let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/admin', function(req, res, next) {
  res.render('dashboard');
});

module.exports = router;
