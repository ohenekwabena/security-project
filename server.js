const https = require('https');
const express = require('express');
const path = require('path');
const fs = require('fs');
const { default: helmet } = require('helmet');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');


require('dotenv').config();

const PORT = 3000;

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
}

const AUTH_OPTIONS = {
        clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
}

function verifyCallback(accessToken, refreshToken, profile, done) {
    console.log('Google profile: ', profile);
   
    done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback)); 

const app = express();

app.use(helmet());

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public', 'index.html')));

function checkLoggedIn(req, res, next) {
    const isLoggedIn = true;

    if (!isLoggedIn) {
        return res.status(401).json({ error: 'User not logged in' });
    }

    next();
}

app.get('/auth/google', (req, res) => {
    // TODO
})

app.get('/auth/google/callback', (req, res) => {
    // TODO
})

app.get('/auth/logout', (req, res) => {
    // TODO
})  

app.get('/secret', checkLoggedIn, (req, res) => {
    res.send('Your secret value is 50!')
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });

https.createServer(
    {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    }, app).listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

