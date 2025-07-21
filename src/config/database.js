"use strict";

// Initializing the libraries of Express.js, CORS and Redis
let Express = require("express");
let CORS = require("cors");
let RedisCLI = require("ioredis");
let Redis = new RedisCLI();

// Creating a server
let App = Express();
App.use(CORS());
App.use(Express.json());

// Defining the host and port
let Port = 3000;
let Host = "localhost";

// Some test object
let TestObject = {};

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
        Conn = await Pool.getConnection();
        let Query = await Conn.query(
            "insert into users (role, username, password) values (?, ?, ?)",
            [role, user, pass]
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
                        await Redis.del("captcha");

                        console.log("Stored the data in MariaDB.");
                        res.json({message: "New user was added to MariaDB."});
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

App.listen(Port, () => {
    console.log(`Server is running on port: http://${Host}:${Port}`);
});
