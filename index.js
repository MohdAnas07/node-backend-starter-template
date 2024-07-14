const express = require('express');
require('dotenv').config(); // config environment variable to use
const jwt = require('jsonwebtoken'); // json web token for user authentication
const cors = require('cors')
const app = express();
const authRouter = require('./routes/auth'); 
const usersRouter = require('./routes/user');



// Variables ==============================>>
const PORT = process.env.PORT || 80



// Database connection code ====>> local mongoDB-compass -> db connection ======>>
require('./db/config')


// =========================== JWT Verification ======================>>
const auth = (req, res, next) => {
    try {
        const token = req.get('Authorization').split('Bearer ')[1];
        console.log(token);
        var decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decoded);
        if (decoded.email) {
            next()
        } else {
            res.status(401).json('Unauthorized');
        }
    } catch (error) {
        res.status(401).json(error)
    }
}


// =========================== MIDDLEWARES ====================================>>

// BODY PARSER ====>>
app.use(express.json());
app.use(cors())

app.use(express.static('public'))


// Router middlewares =======>>
app.use('/api/auth', authRouter)
app.use('/api/users', auth, usersRouter)


// ============================== SERVER =====================================>>
app.listen(PORT, () => {
    console.log(`Server started, running on PORT ${PORT}`)
})


