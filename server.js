const express = require('express')
const fs = require('fs');
const utils = require('./utils');

const app = express()

app.set('view engine', 'ejs')
const manifestPath = 'manifest.json'; 

app.get('/', (req, res) => {
    const manifestString = fs.readFileSync(manifestPath, 'utf8');
    const formUrl = utils.getFormUrl();
    res.render('index', {
        manifestString : manifestString,
        formUrl : formUrl
    })
})

app.get('/redirect', async (req, res) => {
    const code = req.query.code;
    await utils.writeAppInformation(code)
    res.sendStatus(200);
})

app.listen(process.env.LISTEN_PORT || 3000)