const https = require('https');
const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'public', 'index.html')));

app.get('/secret', (req, res) => {
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

