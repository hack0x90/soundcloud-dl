const getSoundCloudTrackLink = require('../');

async function getLink () {
  const link = await getSoundCloudTrackLink({
    scTrackUrl: 'https://soundcloud.com/rashidaliofficial/bhangra-loco',
    scClientId: process.env.SC_CLIENT_ID,
    proxy: process.env.SC_PROXY
  });
  console.log('------------ Link ------------');
  console.log(link);
}

getLink();