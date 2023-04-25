const express = require ('express');

const app = express();

app.use((req, res)=>{
    res.json({message: 'message bien reçu'});
});

module.exports = app;