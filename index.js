#!/usr/bin/env node

const { spawn } = require('child_process');
const { existsSync } = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');
const {
  SC_URL_PATTERN,
  SC_URL_PATTERN_MSG,
  CLI_USAGE_ERROR_MSG,
  CLIENT_ID_ERROR_MSG,
  CLI_PATH_ERROR_MSG
} = require('./helpers');

let _isCli = false;
const IS_DEBUGGING = false;

const getWebPageSourceCode = (link, proxy) => {
  return new Promise((resolve, reject) => {
    const scUrl = link;
    let argsArr = [
      "-A",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15"
    ];
    if (proxy) {
      argsArr = argsArr.concat(["-x", proxy]);
    }

    const curl = spawn("curl", argsArr.concat(scUrl));

    let chunks = [];
    curl.stdout.on("data", data => { chunks.push(data); });
    curl.stderr.on("data", data => {
      if (_isCli) {
        console.log(`stderr: ${data}`);
      }
    });
    curl.on('error', (error) => {
      if (_isCli) {
        console.log(`error: ${error.message}`);
      }
      reject(error);
    });
    curl.on("close", () => {
      let body = Buffer.concat(chunks);
      resolve(body.toString());
    });
  });
};

const getSoundCloudTrackUrl = (url, proxy) => {
  return new Promise((resolve, reject) => {
    let argsArr = [];
    if (proxy) {
      argsArr.concat(["-x", proxy])
    }
    const curl = spawn("curl", argsArr.concat(["--location", "--request", "GET", url]));

    let chunks = [];
    curl.stdout.on("data", data => { chunks.push(data); });
    curl.stderr.on("data", data => {
      if (_isCli) {
        console.log(`stderr: ${data}`);
      }
    });
    curl.on('error', (error) => {
      if (_isCli) {
        console.log(`error: ${error.message}`);
      }
      reject(error);
    });
    curl.on("close", () => {
      let body = Buffer.concat(chunks);
      resolve(body.toString());
    });
  });
};

const saveTrack = (playlistUrl, link, savePath) => {
  return new Promise((resolve, reject) => {
    const tmp = link.split('/')
    const fileName = path.join(savePath, tmp[tmp.length - 1] + '.mp3');
    if (IS_DEBUGGING) {
      console.log(fileName);
    }
    const ffmpeg = spawn("ffmpeg", ["-i", playlistUrl, fileName]);
    ffmpeg.on('error', (error) => {
      console.log(`error: ${error.message}`);
      reject(error);
    });
    ffmpeg.on("close", () => {
      resolve(`${fileName} track saved!\n`);
    });
  });
};

const getTrackDownloadUrl = async (scTrackUrl, scClientId, proxy) => {
  return new Promise(async (resolve, reject) => {
    let jsonText = '';
    const html = await getWebPageSourceCode(scTrackUrl, proxy);
    const root = parse(html);
    root.querySelectorAll('script').forEach((el, idx) => {
      if (el.innerText.startsWith('window.__sc_hydration')) {
        jsonText = String.raw`${el.innerText}`;
      }
    });

    const startIndex = jsonText.indexOf('[');
    const endIndex = jsonText.lastIndexOf(']');
    jsonText = jsonText.substring(startIndex, endIndex + 1);

    // Source -> courtesy of Google search
    jsonText = jsonText.replace(/\\n/g, "\\n")
      .replace(/\\'/g, "\\'")
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, "\\&")
      .replace(/\\r/g, "\\r")
      .replace(/\\t/g, "\\t")
      .replace(/\\b/g, "\\b")
      .replace(/\\f/g, "\\f");

    const jsonData = JSON.parse(jsonText);

    // Construct link for SoundCloud track m3u8 playlist
    const url = jsonData[7].data.media.transcodings[0].url +
      "?client_id=" +
      scClientId +
      "&track_authorization=" +
      jsonData[7].data.track_authorization;

    const playlistUrl = await getSoundCloudTrackUrl(url, proxy).catch((err) => {
      resolve(err);
    });
    resolve(playlistUrl);
  });
};

async function main(options) {
  const { scTrackUrl, scClientId, savePath, proxy = null } = options;
  if (_isCli) {
    const playlistUrl = await getTrackDownloadUrl(scTrackUrl, scClientId);
    const track = await saveTrack(JSON.parse(playlistUrl).url, scTrackUrl, savePath);
    console.log(track);
  } else {
    return new Promise(async (resolve, reject) => {
      const playlistUrl = await getTrackDownloadUrl(scTrackUrl, scClientId, proxy).catch((err) => {
        reject(err);
      });
      resolve(playlistUrl);
    });
  }
}

// ---- 🚀 Start Here ----
if (require.main === module) {
  // ---- Running as CLI
  if (process.argv.length < 3) {
    console.log(CLI_USAGE_ERROR_MSG);
    process.exit();
  }

  if (!SC_URL_PATTERN.test(process.argv[2])) {
    console.log(SC_URL_PATTERN_MSG);
    process.exit();
  }

  if (!process.env.SC_CLIENT_ID) {
    console.log(CLIENT_ID_ERROR_MSG);
    process.exit();
  }

  const scClientId = process.env.SC_CLIENT_ID;
  const scTrackUrl = process.argv[2];
  const savePath = process.argv[3] || process.env.HOME;

  if (existsSync(savePath)) {
    _isCli = true;
    main({ scTrackUrl, scClientId, savePath });
  } else {
    console.log(CLI_PATH_ERROR_MSG);
    process.exit();
  }
}

module.exports = main;