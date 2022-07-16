const express = require("express");
const app = express();
const path = require("path");

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/client.html"));
});

app.use(express.static(path.join(__dirname, "./")));
app.listen(8000);

const NodeMediaServer = require("node-media-server");

const config = {
  logType: 3, // 3 - Log everything (debug)
  rtmp: {
    port: 1935,
    chunk_size: 6000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30,
  },
  http: {
    port: 9999,
    allow_origin: "*",
  },
  relay: {
    ffmpeg: "/usr/local/bin/ffmpeg",
    tasks: [
      {
        app: "cctv",
        mode: "static",
        edge: "rtsp://user:pass@cameraip:port/some_path",
        name: "mycamera",
        rtsp_transport: "tcp", //['udp', 'tcp', 'udp_multicast', 'http']
      },
    ],
  },
};

var nms = new NodeMediaServer(config);
nms.run();
