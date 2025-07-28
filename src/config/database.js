"use strict";

// Initializing the libraries of Express.js, CORS, Redis, bcrypt and "dotenv"
require("dotenv").config({path: "../../.env"});
let Express = require("express");
let CORS = require("cors");
let RedisCLI = require("ioredis");
let Redis = new RedisCLI();
let Bcrypt = require("bcrypt");

// Creating a server
let App = Express();
App.use(CORS());
App.use(Express.json());

// Defining the host and port
let Port = 3000;
let Host = "localhost";

// Server objects
let TokenObject = {};
let NewUserObject = {};

// Importing the libraries of MariaDB and initialization
let MariaDB = require("mariadb");
let Pool = MariaDB.createPool({
    host: Host,
    port: 3306,
    user: "root",
    password: "mrshahin2004",
    database: "sepehr_dad",
    connectionLimit: 10
});

// A function to get all rows from the "users" table in MariaDB
async function GetRows() {
    let Conn;
    try {
        Conn = await Pool.getConnection();
        let Query = await Conn.query("select * from users");
        return Query;
    } catch (error) {
        console.log(error);
    } finally {
        if (Conn) {
            Conn.release().then((response) => {
                return response;
            });
        }
    }
}

// A function to store a new user in MariaDB
async function StoreUser(role, user, pass) {
    let Conn;
    try {
        let SaltRounds = 10;
        let HashedPass = await Bcrypt.hash(pass, SaltRounds);

        Conn = await Pool.getConnection();
        let Query = await Conn.query(
            "insert into users (role, username, password) values (?, ?, ?)",
            [role, user, HashedPass]
        );
        console.log(Query);
    } catch (error) {
        console.log(error);
    } finally {
        if (Conn) {
            Conn.release().then((response) => {
                return response;
            });
        }
    }
}

// A function to send the data to another server
async function ExportUser(obj) {
    let Response = await fetch("http://localhost:3100/api/jwt/post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({obj})
    });
    let Data = await Response.json();
    return Data.token;
}

// Function to the new table
async function SaveUser(obj) {
    let Conn;
    let HashedPassword = await Bcrypt.hash(obj.pass, 10);

    try {
        Conn = await Pool.getConnection();
        let Query = await Conn.query(`insert into users
                                      (username, password, firstName, lastName, firm, nationalId, email, role, type,
                                       status)
                                      values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [obj.user, HashedPassword, obj.first, obj.last, obj.firm, obj.national,
                obj.email, obj.role, obj.type, obj.status]);
        return Query;
    } catch (error) {
        console.log(error);
    } finally {
        if (Conn) {
            Conn.release().then((response) => {
                return response;
            });
        }
    }
}

// POST method
App.post("/api/mariadb/register", async (req,
                                         res) => {
    // Will be used later.
});

App.post("/api/mariadb/check", async (req,
                                      res) => {
    // Receiving the data from the client
    let ReceivedData = req.body;
    let {type: ExtractedType, username: ExtractedUser, password: ExtractedPass, code: ExtractedCode} = ReceivedData;

    try {
        let AllRows = await GetRows();
        let FoundUser = AllRows.find((row) => {
            return row.username === ExtractedUser;
        });
        let IsMatch = await Bcrypt.compare(ExtractedPass, FoundUser.password);

        // Getting the status values of CAPTCHA from Redis
        let IsExisting = await Redis.exists("captcha");
        let ExistingCaptcha = await Redis.get("captcha");

        if (!ExtractedType || !ExtractedUser || !ExtractedPass || !ExtractedCode) {
            console.log("Some field is missing at the client.");
        }

        if (IsExisting !== 1) {
            console.log("The CAPTCHA is expired.");
            res.json({
                message: "The CAPTCHA is expired, click on the CAPTCHA image or reload the page for a new one."
            });
        }

        if (+ExtractedCode !== +ExistingCaptcha) {
            console.log("Wrong CAPTCHA from the client");
            res.json({message: "Wrong CAPTCHA, try again."});
        }

        if (FoundUser === undefined || !IsMatch) {
            console.log("Either username or password is incorrect.");
            res.status(404).send({message: "Either username or password is incorrect."});
        }

        if (FoundUser.role === "Admin") {
            TokenObject.role = "Admin";
            TokenObject.user = ExtractedUser;
            let TokenFromJWT = await ExportUser(TokenObject);

            console.log("Admin is logged in.");
            res.json({token: TokenFromJWT, message: "You are logged in as an admin."});
        }

        if (FoundUser.role === "User") {
            TokenObject.role = "User";
            TokenObject.user = ExtractedUser;
            let TokenFromJWT = await ExportUser(TokenObject);

            console.log("User is logged in.");
            res.json({token: TokenFromJWT, message: "You are logged in as a user."});
        }

        await Redis.del("captcha");
    } catch (error) {
        console.log(error);
        res.json({message: "Something went wrong."});
    }
});

App.listen(Port, () => {
    console.log(`Server is running on port: http://${Host}:${Port}`);
});
