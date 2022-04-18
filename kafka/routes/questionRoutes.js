const express = require('express')
const router = express.Router()
const passport = require('passport');
require('../Utils/passport')
router.use(passport.initialize());

const QuestionController = require('../controllers/QuestionController')

router.post('/askquestion', (req, res, next) => {
    passport.authenticate('jwt', {session: false}
    , (err, user) => {
        console.log(user)
        if(!user) return res.status(400).send("rubbish");
        console.log(user)
        console.log("ppp")
        req.body.USER_ID = user.userid
        console.log(req.body)
        next();
    }
    )
    (req, res); 
}, QuestionController.createQuestion)
router.get('/', passport.authenticate('jwt', {session: false}), QuestionController.getQuestions)
router.get('/getquestion/:questionId', passport.authenticate('jwt', {session: false}), QuestionController.getQuestion)
router.put('/bookmark/:questionId', passport.authenticate('jwt', {session: false}), QuestionController.bookmarkQuestion)


module.exports = router