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
let UserObject = {};

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
    // Extracting the received data from client
    let ReceivedData = req.body;
    let {role: ExtractedRole, user: ExtractedUser, pass: ExtractedPass, code: ExtractedCode} = ReceivedData;

    try {
        // Receiving the table from database
        let Query = await GetRows()
            .then((response) => {
                return response;
            })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.log(error);
            });

        // Checking if the received username is not already existing in the database
        let DuplicateUser = Query.find((row) => {
            return ExtractedUser === row.username;
        });

        // Setting an interval
        let CheckInterval = setInterval(async () => {
            // Getting the status values of CAPTCHA from Redis
            let IsExisting = await Redis.exists("captcha");
            let ExistingCaptcha = await Redis.get("captcha");

            if (!ExtractedRole || !ExtractedUser || !ExtractedPass || !ExtractedCode) {
                console.log("Some field is missing at the client.");
                res.json({message: "Some field is missing, please fill all fields."});
            } else {
                if (IsExisting === 1) {
                    if (+ExtractedCode !== +ExistingCaptcha) {
                        console.log("Wrong CAPTCHA from the client");
                        res.json({message: "Wrong CAPTCHA, try again."});
                        clearInterval(CheckInterval);
                    } else if (DuplicateUser !== undefined) {
                        console.log("Duplicate username from the client");
                        res.json({message: "The username is already taken, try another one."});
                        clearInterval(CheckInterval);
                    } else {
                        await StoreUser(ExtractedRole, ExtractedUser, ExtractedPass)
                            .then((response) => {
                                return response;
                            })
                            .then((data) => {
                                console.log(data);
                            })
                            .catch((error) => {
                                console.log(error);
                            });

                        TokenObject.role = ExtractedRole;
                        TokenObject.user = ExtractedUser;
                        TokenObject.pass = ExtractedPass;
                        let TokenFromJWT = await ExportUser(TokenObject);

                        await Redis.del("captcha");

                        console.log("Stored the data in MariaDB.");
                        res.json({
                            message: "New user was added to MariaDB.",
                            token: TokenFromJWT,
                        });
                        clearInterval(CheckInterval);
                    }
                } else {
                    console.log("The CAPTCHA is expired.");
                    res.json({
                        message: "The CAPTCHA is expired, click on the CAPTCHA image or reload the page for a new one."
                    });
                    clearInterval(CheckInterval);
                }
            }
        }, 1000);
    } catch (error) {
        console.error(error);
        res.json({message: "Something went wrong."});
    }
});

App.post("/api/mariadb/check", async (req,
                                      res) => {
    // Receiving the data from the client
    let ReceivedData = req.body;
    let {username: ExtractedUser} = ReceivedData;

    try {
        let AllRows = await GetRows();
        let FoundUser = AllRows.find((row) => {
            return row.username === ExtractedUser;
        });

        let CheckInterval = setInterval(async () => {
            // Getting the status values of CAPTCHA from Redis
            let IsExisting = await Redis.exists("captcha");
            let ExistingCaptcha = await Redis.get("captcha");

            if (!ExtractedUser) {
                console.log("Some field is missing at the client.");
                res.json({message: "Some field is missing, please fill all fields."});
            } else {
                if (FoundUser === undefined) {
                    console.log("Username not found.");
                } else {
                    if (FoundUser.role === "Admin") {
                        console.log("Admin is logged in.");
                    }

                    if (FoundUser.role === "User") {
                        console.log("User is logged in.");
                    }
                }
            }
        }, 1000);
        res.json({message: "Saved successfully.", rows: AllRows});
    } catch (error) {
        console.log(error);
        res.json({message: "Something went wrong."});
    }
});

App.listen(Port, () => {
    console.log(`Server is running on port: http://${Host}:${Port}`);
});
