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
        await StoreData(RequestData.role, RequestData.user, RequestData.pass);
        res.status(200).json({message: "Data stored successfully in MariaDB."});
    } catch (error) {
        console.log(error);
    }
});

App.listen(Port, () => {
    console.log(`Server is running on port: http://${Host}:${Port}`);
})
