"use strict";

// Initializing the libraries of Express.js and CORS
let Express = require("express");
let Cors = require("cors");
let App = Express();
App.use(Cors());
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
    database: "sepeher_dad",
    connectionLimit: 10
});

async function StoreData(role, user, pass) {
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
            Conn.release();
        }
    }
}

// GET method
App.get("/api/number", (req, res) => {
    let JsonContainer = {
        "number": 123
    };

    res.send(JsonContainer);
});

// POST method
App.post("/api/data", async (req, res) => {
    let RequestData = req.body;
    if (!RequestData.role || !RequestData.user || !RequestData.pass) {
        return res.status(400).json({error: "Missing required fields"});
    }
    console.log("Received data:", RequestData);

    try {
        await StoreData(RequestData.role, RequestData.user, RequestData.pass);
        res.status(200).json({message: "Data stored successfully in MariaDB."});
    } catch (error) {
        console.error("Failed to store data:", error);
        res.status(500).json({error: "Failed to store data in MariaDB."});
    }
});

App.listen(Port, () => {
    console.log(`Server is running on port: http://${Host}:${Port}`);
})
