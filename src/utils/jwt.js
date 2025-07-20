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

let User = {
    id: 1,
    name: "Shahin",
    age: 20,
    city: "Mashhad"
};

App.get("/api/jwt/get", async (req,
                               res) => {
    let Token = await JWT.sign({id: User.id, username: User.name, age: User.age, city: User.city},
        JwtSecret, {expiresIn: "1h"});
    res.json({token: Token});
});

App.get("/test", (req, res) => {
    res.json({status: "Server is live!"});
});

App.listen(Port, () => {
    console.log(`Server is running on the URL http://${Host}:${Port}`);
});
