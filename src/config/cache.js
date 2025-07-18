"use strict";

const RedisCLI = require("ioredis");
const Redis = new RedisCLI();

const Express = require("express");
const CORS = require("cors");
const TextToSVG = require("text-to-svg");
const Path = require("path");
const TTS = TextToSVG.loadSync(Path.join(__dirname, "fonts", "JetBrainsMono-Regular.ttf"));

// A variable for creating random lines on the CAPTCHA code
let Noise = "";

const App = Express();
App.use(Express.json());
App.use(CORS());

let Host = "localhost";
let Port = 4000;

// Setting the data in Redis
App.get("/api/redis/get", async (req,
                                 res) => {
    let AllKeys = await Redis.keys("*");
    res.json({exists: AllKeys});
});

// Generating the 5-digit CAPTCHA code
App.get("/api/captcha/get", async (req,
                                   res) => {
    // Creating the random number
    let CaptchaNumber = Math.floor(10000 + Math.random() * 90000) + "";
    // Creating the CAPTCHA SVG
    let SVGText = TTS.getSVG(CaptchaNumber, {
        x: 2,
        y: 0,
        fontSize: 30,
        fontFamily: "JetBrainsMono-Regular",
        anchor: "top",
        attributes: {
            fill: "#000"
        }
    });

    // Making 3 lines
    for (let i = 0; i < 5; i++) {
        let x1 = Math.random() * 100;
        let y1 = Math.random() * 50;
        let x2 = Math.random() * 100;
        let y2 = Math.random() * 50;
        Noise += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="red" stroke-width="2"
                  stroke-linecap="round"/>`;
    }

    // Placing the SVG element
    let FinalSVG = `
        <svg height="50" width="100" xmlns="http://www.w3.org/2000/svg">
            ${SVGText}
            ${Noise}
        </svg>
    `;

    // Setting the CAPTCHA number in Redis
    await Redis.set("captcha", `${CaptchaNumber}`, "EX", 120);

    res.type("svg");
    res.send(FinalSVG);

    Noise = "";
});

App.post("/api/redis/check-exist", async (req,
                                          res) => {
    let ReceivedData = req.body;
    let ExtractedCode = ReceivedData.code;

    let SanitizedCode = (ExtractedCode || "").trim();

    let CheckInterval = setInterval(async () => {
        let ExistingCaptcha = await Redis.get("captcha");
        let IsExisting = await Redis.exists("captcha");

        let SanitizedCaptcha = (ExistingCaptcha || "").trim();

        if (IsExisting === 1) {
            if (SanitizedCode === SanitizedCaptcha) {
                console.log("Yay! The inserted security code matches the CAPTCHA in Redis :D");
                console.log("CAPTCHA is now deleted from Redis.");
                await Redis.del("captcha");
                clearInterval(CheckInterval);
            } else {
                console.log("Oops! The inserted code isn't equal to the CAPTCHA in Redis :(");
            }
        } else {
            console.log("The CAPTCHA is terminated in Redis. Click on the image or reload the page.");
            clearInterval(CheckInterval);
        }
    }, 1000);

    res.json({isFine: true});
});

App.listen(Port, () => {
    console.log(`Server is running on the URL http://${Host}:${Port}`);
});
