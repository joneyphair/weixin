var router = require('koa-router')();
var HomeController = require('../Controllers/HomeController');

router.post('/',HomeController.main);


router.get('/',HomeController.init);

module.exports = router;





