const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const https = require('node:https');

const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "xxxx",
  server: "xxx",
});

const run = async () => {
  const response = await client.lists.batchListMembers("list_id", {
    members: [{}],
  });
  console.log(response);
};

run();

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
})

app.post('/', (req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const company = req.body.company;
    const comments = req.body.comments;

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    NAME: name,
                    COMPANY: company,
                    COMMENTS: comments
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = 'xxx';

    const options = {
        method: "POST",
        auth: "matthewlowe:xxx"
    }

    const request = https.request(url, options, (response) => {
        response.on("data", () => {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.listen(3000, () => {
    console.log("App listening on port 3000");
})