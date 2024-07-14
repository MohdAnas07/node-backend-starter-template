const jwt = require('jsonwebtoken');
const model = require('../model/user');
const User = model.User;
const bcrypt = require('bcrypt');


// Create a User
exports.signUp = async (req, res) => {
    const newUser = new User(req.body)
    const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);
    const hash = bcrypt.hashSync(req.body.email, 10);

    newUser.token = token;
    newUser.password = hash;

    try {
        const savedUser = await newUser.save()
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json(error)
    }
}

// login a user
exports.login = async (req, res) => {
    const doc = await User.findOne({ email: req.body.email });
    console.log(doc);
    try {
        if (doc.email) {
            const isAuth = bcrypt.compareSync(req.body.email, doc.password);//true/fasle return 
            if (isAuth) {
                const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);

                doc.token = token
                doc.save() // saving new generated token into DB.
                res.json({ token })
            } else {
                res.sendStatus(401)
            }
        }
    } catch (error) {
        res.status(401).json(error)
    }
}
