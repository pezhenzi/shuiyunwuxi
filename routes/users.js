let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('悔教夫婿觅封侯。');
});

module.exports = router;
