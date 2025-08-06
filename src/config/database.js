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

// A function to send the data to the JWT server for tokenization
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

// A function to store a new user in MariaDB
async function StoreUser(obj) {
    let Conn;
    let HashedPass = await Bcrypt.hash(obj.pass, 10);

    try {
        Conn = await Pool.getConnection();
        let Query = await Conn.query(`insert into users
                                      (username, password, firstName, lastName, firm, nationalId, email, type)
                                      values (?, ?, ?, ?, ?, ?, ?, ?);`,
            [obj.user, HashedPass, obj.first, obj.last, obj.firm, obj.national,
                obj.email, obj.type]);
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

// The endpoint to receive the data from the register panel
App.post("/api/mariadb/register", async (req,
                                         res) => {
    // The raw data received from the client
    let ReceivedData = req.body;
    let {
        first: ExtractedFirst, last: ExtractedLast, national: ExtractedNational, email: ExtractedEmail,
        user: ExtractedUser, pass: ExtractedPass, firm: ExtractedFirm, type: ExtractedType
    } = ReceivedData;

    try {
        // Checking if all fields are provided
        if (!ExtractedFirst || !ExtractedLast || !ExtractedNational || !ExtractedEmail || !ExtractedUser
            || !ExtractedPass || !ExtractedFirm || !ExtractedType) {
            console.log("Some field is missing at the client.");
            return res.status(400).json({message: "Some field is missing, please fill in all fields."});
        }

        // Checking if the given username, national ID or email are already existing
        let AllRows = await GetRows();
        let FoundUser = AllRows.find((row) => {
            return row.username === ExtractedUser;
        });

        let FoundEmail = AllRows.find((row) => {
            return row.email === ExtractedEmail;
        });

        let FoundNational = AllRows.find((row) => {
            return row.nationalId === ExtractedNational;
        });

        if (FoundUser !== undefined) {
            console.log("Username is already taken.");
            return res.status(400).json({message: "Username is already taken, try another one."});
        }

        if (FoundEmail !== undefined) {
            console.log("Email is already taken.");
            return res.status(400).json({message: "Email is already taken, try another one."});
        }

        if (FoundNational !== undefined) {
            console.log("National ID is invalid.");
            return res.status(400).json({message: "National ID is invalid, please try again."});
        }

        // Setting the values in the specified object
        NewUserObject.first = ReceivedData.first;
        NewUserObject.last = ReceivedData.last;
        NewUserObject.national = ReceivedData.national;
        NewUserObject.email = ReceivedData.email;
        NewUserObject.user = ReceivedData.user;
        NewUserObject.pass = ReceivedData.pass;
        NewUserObject.firm = ReceivedData.firm;
        NewUserObject.type = ReceivedData.type;

        // Storing the new user in the database
        let NewUser = await StoreUser(NewUserObject);
        console.log(NewUser);
        return res.json({isFine: true, message: "Your account has been registered successfully."});
    } catch (error) {
        console.log(error);
    }
});

// The endpoint to send the specified object to the admin
App.get("/api/mariadb/get-pending-users", async (req,
                                                 res) => {
    try {
        let AllUsers = await GetRows();
        res.json({isFine: true, message: "All users retrieved from the database.", users: AllUsers});
    } catch (error) {
        console.log(error);
        res.json({isFine: false, message: "Something went wrong."});
    }
});

// The endpoint to send the data of verified or promoted users
App.post("/api/mariadb/edit-pending-users", async (req,
                                      res) => {
    // Will be used.
});

// The endpoint to the login panel
App.post("/api/mariadb/login", async (req,
                                      res) => {
    // Receiving the data from the client
    let ReceivedData = req.body;
    let {type: ExtractedType, username: ExtractedUser, password: ExtractedPass, code: ExtractedCode} = ReceivedData;

    try {
        // Checking if all fields are provided
        if (!ExtractedType || !ExtractedUser || !ExtractedPass || !ExtractedCode) {
            console.log("Some field is missing at the client.");
            return res.status(400).json({message: "Some field is missing, please fill all of them."});
        }

        // Checking the CAPTCHA status in Redis
        let IsExisting = await Redis.exists("captcha");
        if (IsExisting !== 1) {
            console.log("The CAPTCHA is expired.");
            return res.status(400).json({
                message: "The CAPTCHA is expired, click on the CAPTCHA image or reload the page for a new one."
            });
        }

        // Checking if the provided code matches with Redis
        let ExistingCaptcha = await Redis.get("captcha");
        if (+ExtractedCode !== +ExistingCaptcha) {
            console.log("Wrong CAPTCHA from the client");
            return res.json({message: "Wrong CAPTCHA, try again."});
        }


        // Querying all rows from the database
        let AllRows = await GetRows();
        let FoundUser = AllRows.find((row) => {
            return row.username === ExtractedUser;
        });
        // Checking if the username is in the database
        if (!FoundUser) {
            console.log("Username from the client not found.");
            return res.status(404).send({message: "Username not found, try again."});
        }

        let IsMatch = await Bcrypt.compare(ExtractedPass, FoundUser.password);
        // Checking if the password is correct
        if (!IsMatch) {
            console.log("Wrong password from the client");
            return res.status(400).json({message: "Wrong password, try again."});
        }

        // Checking if the user is verified
        if (FoundUser.verify === 0) {
            console.log("User is not verified.");
            return res.status(400).json({
                message: "You are not verified yet, contact an administrator to fix it."
            });
        }

        // Generating the token based on the role
        TokenObject.verify = FoundUser.verify;
        TokenObject.role = FoundUser.role;
        TokenObject.user = ExtractedUser;
        let TokenFromJWT = await ExportUser(TokenObject);

        // Deleting CAPTCHA from Redis
        await Redis.del("captcha");

        // If the user is an "Admin"...
        if (FoundUser.role === "Admin") {
            console.log("Admin is logged in.");
            return res.json({token: TokenFromJWT, message: "You are logged in as an admin."});
        }

        // If the user is a "User"...
        if (FoundUser.role === "User") {
            console.log("User is logged in.");
            return res.json({token: TokenFromJWT, message: "You are logged in as a user."});
        }
    } catch (error) {
        console.log(error);
        return res.json({message: "Something went wrong."});
    }
});

// Running the server
App.listen(Port, () => {
    console.log(`Server is running on port: http://${Host}:${Port}`);
});
