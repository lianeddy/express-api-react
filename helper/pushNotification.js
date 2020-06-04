module.exports = {
  sendNotification: (data) => {
    let headers = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Basic MGExYjBmNDgtNjFjYy00YzM5LWJiNzUtOGUxMDUzYWY0MTFm",
    };
    let options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers,
    };
    const https = require("https");
    let req = https.request(options, function (res) {
      res.on("data", function (data) {
        console.log("Response:");
        console.log(JSON.parse(data));
      });
    });

    req.on("error", function (e) {
      console.log("ERROR:");
      console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
  },
  app_id: "017e7390-889a-447d-b287-0b477f14ce41",
};
