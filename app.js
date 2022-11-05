const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const request = require('request');

app.listen(3000, () => {
    console.log("App listening on port 3000");
})