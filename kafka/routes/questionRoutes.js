const express = require('express')
const router = express.Router()
const passport = require('passport');
require('../Utils/passport')
router.use(passport.initialize());
let checkAuth = passport.authenticate("jwt", { session: false });

const QuestionController = require('../controllers/QuestionController')

router.post('/askquestion', (req, res, next) => {
    passport.authenticate('jwt', { session: false }
        , (err, user) => {
            console.log(user)
            if (!user) return res.status(400).send("Unauthorized access");
            console.log(user)
            req.body.USER_ID = user.userid
            console.log(req.body)
            next();
        }
    )
        (req, res);
}, QuestionController.createQuestion)
router.get('/', checkAuth, QuestionController.getQuestions)
router.get('/getquestion/:questionId', checkAuth, QuestionController.getQuestion)
router.put('/bookmark/:questionId', checkAuth, QuestionController.bookmarkQuestion)


module.exports = router