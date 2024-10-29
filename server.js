const https = require('https');
const express = require('express');
const path = require('path');
const fs = require('fs');
const { default: helmet } = require('helmet');

const PORT = 3000;

const app = express();

app.use(helmet());

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

