const express = require('express');
const axios = require('axios');
const app = express();
const port = 8082;

app.get('/events',  async function(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    axios.get("http://api.rallysafe.com.au/api/v2/Events/GetEventsForApp", {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        res.send(response.data);
    });
});

app.get('/events/:eventId/Entries',  async function(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    axios.get("http://api.rallysafe.com.au/api/v1/Events/" + req.params.eventId + "/Entries", {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        res.send(response.data);
    });
});

app.get('/events/:eventId/stages', async function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    axios.get("http://api.rallysafe.com.au/api/v2/events/" + req.params.eventId + "/polylines", {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        res.send(response.data);
    });
});

app.get('/events/:eventId/vehicles', async function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    axios.get("http://api.rallysafe.com.au/api/v1/Events/" + req.params.eventId + "/LiveVehicleData", {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        res.send(response.data);
    });
});

app.get('/events/:eventId/Results', async function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    axios.get("https://app.rallysafe.com.au/LiveData/StageTimes/?StageId=37581", {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        res.send(response.data);
    });
});

app.listen(port, () => {
    console.log("Server Started");
});