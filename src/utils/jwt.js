"use strict";

require("dotenv").config({path: "../../.env"});
let Express = require("express");
let CORS = require("cors");

let JWT = require("jsonwebtoken");
let JwtSecret = process.env.JWT_KEY;

let App = Express();
App.use(Express.json());
App.use(CORS());

let Host = "localhost";
let Port = 3100;

// POST method
App.post("/api/jwt/post", async (req,
                                 res) => {
    let ReceivedData = req.body;
    let UserObject = ReceivedData.obj;

    let Token = await JWT.sign({UserObject}, JwtSecret, {expiresIn: "1h"});
    console.log(`Generated token: ${Token}`);

    res.json({token: Token});
});

App.post("/api/jwt/verify", async (req,
                                   res) => {
    let ReceivedData = req.body;
    let GeneratedToken = ReceivedData.token;

    console.log(GeneratedToken);
});

App.listen(Port, () => {
    console.log(`Server is running on the URL http://${Host}:${Port}`);
});
