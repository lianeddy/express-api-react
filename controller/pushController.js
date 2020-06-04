const { sendNotification, app_id } = require("../helper/pushNotification");

module.exports = {
  sendToAll: (req, res) => {
    sendNotification({
      app_id,
      contents: { en: "English Message" },
      included_segments: ["All"],
    });
    res.send("success");
  },
  sendToId: (req, res) => {
    sendNotification({
      app_id,
      contents: { en: `Specific Id: ${req.params.id}` },
      include_player_ids: [req.params.id],
      data: {
        halo: "halo",
        hello: "hello",
      },
      url: "https://www.google.com",
      //   big_picture:
      //     "https://asset-a.grid.id/crop/0x70:700x525/360x240/photo/2020/02/15/2285106843.jpg",
    });
    res.send("Success");
  },
};
