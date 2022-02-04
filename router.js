const express = require('express');
const controller = require('./controllers/controller');

const router = express.Router();

router.get('/',controller.userLoggedin, controller.getLogIn);
router.get('/login',controller.userLoggedin, controller.getLogIn);
router.post('/login',controller.userLoggedin,controller.postLogIn);
router.post('/logout', controller.logOut);
router.get('/register', controller.getRegister);
router.post('/register', controller.postRegister);
router.get('/posts',controller.isAuth,controller.getHomePage);
router.get('/feed',controller.isAuth ,controller.getNewArticle);
router.post('/message', controller.postMedia);
router.post('/message/del/:id', controller.delComment);
router.get('/message/edit/:id',controller.isAuth, controller.getEditMessage);
router.post('/message/edit/:id', controller.postEditMessage);
router.get('/questions', controller.getQuestionsPage);

router.get('/homeQuestions',controller.isAuth,controller.getQuestion);

router.all('/postQuestion',controller.userLoggedin, controller.questions);

router.get('/show-question/:id',controller.isAuth, controller.showQuestion);

router.get('/delete-question/:id', controller.delQuestion);
router.all('/edit-question/:id',controller.isAuth, controller.updateQuestion);

router.get('/cmt',controller.isAuth, controller.getComment);
router.all('/comment-question/:id',controller.isAuth, controller.commentQuestion);




module.exports = router;