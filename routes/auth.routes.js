const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');
const router = Router();

router.post(
    '/register',
    [
        check('email', "no correct Email").isEmail(),
        check('password', 'Minimal length 6 symbol').isLength({min: 6})
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "not true values"})
            }


            const {email, password} = req.body;

            const candidate = await User.findOne({email});

            if (candidate) {
                return res.status(400).json({message: "user already exists"})
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = User({email, password: hashedPassword});

            await user.save();
            res.status(201).json({message: "User created"})


        } catch (e) {
            res.status(500).json({message: 'Again'});
        }
    });

router.post(
    '/login',
    [
        check('email', "Enter true email").normalizeEmail().isEmail(),
        check('password', "Enter password").exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "not true values"})
        }


        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({message: "User not found"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) {
            res.status(400).json({message: "not true password,please again"});
        }
        const token = jwt.sign(
            {userId : user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        );
        res.json({token, userId: user.id})
    } catch (e) {
        res.status(500).json({message: 'Again'});
    }

});


module.exports = router;
