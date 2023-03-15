const express = require("express");
const request = require("request");
const app = express();
const cors = require("cors");
let corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};

app.use(cors(corsOptions));

const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IlVCYkNTbFJ1UnlHeUx2VGh5VlFtcVEiLCJleHAiOjE2NzkzMDI1NDMsImlhdCI6MTY3ODY5Nzc0NH0.OPo9BMIngfy3QqzVlp1I_lHy79OpA2Nwc8pHzIxjl-M";

const port = 4000;

app.get("/", (req, res) => {
    res.json({
        success: true,
    });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});

var options = {
    method: "GET",
    // A non-existing sample userId is used in the example below.
    url: "https://api.zoom.us/v2/videosdk/report/daily?year=2023&month=3",
    headers: {
        authorization: `Bearer ${token}`, // Do not publish or share your token publicly
    },
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log("호출성공1", body);
});
