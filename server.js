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
const baseUrl = "https://api.zoom.us/v2";

app.get("/", (req, res) => {
    res.json({
        success: true,
    });
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});

/**
 * @path {GET} http://localhost:3000/api/users/user?user_id=1
 * @description Query Params 요청 데이터 값이 있고 반환 값이 있는 GET Method
 *
 *  Query Params 방식
 *  user 뒤에 user_id변수를 통해 값을 찾아 올수 있다.
 *  &를 통해 두번째 변수를 받아서 사용할 수 있다.(/user?user_id=1&name="유저1")
 *
 */
app.get(`/api/report/daily/:year/:month`, (req, res) => {
    //const user_id = req.query.user_id;

    //filter라는 함수는 자바스크립트에서 배열 함수이다. 필터링을 할때 많이 사용된다 필터링한 데이터를 새로운 배열로 반환한다.
    //const user = users.filter((data) => data.id == user_id);

    //res.json({ ok: false, user: user });

    var params = req.params;

    // app.get('/user/:name/:age', function (req, res) {
    //     var params = req.params;
    //     console.log(params);

    //     res.send("User Name : " + params.name + " / User Age : " + params.age);
    //  });

    const year = params.year;
    const month = params.month;

    var options = {
        method: "GET",
        // A non-existing sample userId is used in the example below.
        url: `${baseUrl}/videosdk/report/daily?year=${year}&month=${month}`,
        headers: {
            authorization: `Bearer ${token}`, // Do not publish or share your token publicly
        },
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log("호출성공1", body);
        res.send(body);
    });
});
