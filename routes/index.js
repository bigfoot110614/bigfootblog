var express = require('express');
var router = express.Router();
markdown = require('markdown').markdown;

router.get('/', function(req, res, next) {
  res.redirect('/article/list');
});


module.exports = router;
