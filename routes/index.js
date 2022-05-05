var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


// 2引入表名操作对象=====>start
var user = require('../controllers/userController')
// 2引入表名操作对象=====>end

// 3接口区域======>start
router.get('/',user.getUser)
router.get('/getPostUser',user.getPostUser)
router.get('/sendCode',user.sendCode)
router.get('/updatePost',user.updatePost)
router.get('/addPost',user.addPost)
router.get('/deletePost',user.deletePost)

router.get('/registerUser',user.registerUser)
// 3接口区域======>end



module.exports = router;
