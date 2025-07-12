"use strict";

const Express = require("express");
const Cors = require("cors");

const App = Express();
App.use(Cors()); // allow frontend access

App.get("/api/number", (req, res) => {
    const RandomNumber = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

    // Tell browsers and proxies: DON'T cache this response
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
    res.set("Surrogate-Control", "no-store");

    return res.json({number: RandomNumber});
});

App.listen(4000, () => {
    console.log("Backend running on http://localhost:4000");
});
